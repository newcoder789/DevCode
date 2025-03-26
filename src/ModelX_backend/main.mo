import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash"; 
import Nat32 "mo:base/Nat32";
import Iter "mo:base/Iter";

actor {
  type Dataset = {
    id: Nat;
    name: Text;
    description: Text;
    owner: Principal;
    url: Text;
  };

  type Model = {
      id: Nat;
      name: Text;
      price: Nat;
      owner: Principal;
      tags: [Text];
      language: Text;
      datasetId: Nat;
      input: Text;           
      sampleOutput: Text;
      image: Text;    
  };

  type TrialInfo = {
    user: Principal;
    modelId: Nat;
    remainingTrials: Nat;
  };

  stable var models: [Model] = [];
  stable var accessKeys: [(Text, Principal)] = [];
  stable var transactions: [(Nat, Nat, Nat)] = [];
  stable var datasets: [Dataset] = [];
  stable var nextDatasetId: Nat = 0;
  // Store trial info as a stable array
  stable var trialEntries: [(Principal, Nat, Nat)] = []; // (user, modelId, remainingTrials)
  var trials: HashMap.HashMap<Principal, HashMap.HashMap<Nat, Nat>> = HashMap.HashMap<Principal, HashMap.HashMap<Nat,Nat>>(10, Principal.equal, Principal.hash);

  // Custom hash function for Nat
  func customNatHash(n: Nat): Hash.Hash {
      // Example: Using a simple modulus operation for hashing
      // Ensure the hash fits within the Hash.Hash type (typically Nat32)
      // Adjust the hashing logic as needed for your application's requirements
    return Nat32.fromNat(n);
  };


  // Initialize trials from stable storage
  system func preupgrade() {
    // Flatten the nested HashMap into a list of (Principal, Nat, Nat)
    let entries: [(Principal, Nat, Nat)] = Array.flatten(
      Array.map<(Principal, HashMap.HashMap<Nat, Nat>), [(Principal, Nat, Nat)]>(
        Iter.toArray(trials.entries()),
        func ((user, modelMap)) {
          Array.map<(Nat, Nat), (Principal, Nat, Nat)>(
            Iter.toArray(modelMap.entries()),
            func ((modelId, remainingTrials)) {
              (user, modelId, remainingTrials)
            }
          )
        }
      )
    );
    trialEntries := entries;
  };

  system func postupgrade() {
    trials := HashMap.HashMap(10, Principal.equal, Principal.hash);
    for ((user, modelId, remainingTrials) in trialEntries.vals()) {
      let userTrials = switch (trials.get(user)) {
        case (null) { HashMap.HashMap<Nat, Nat>(10, Nat.equal, customNatHash) };
        case (?map) { map };
      };
      userTrials.put(modelId, remainingTrials);
      trials.put(user, userTrials);
    };
    trialEntries := [];
  };

  private func contains(arr: [Text], elem: Text, eq: (Text, Text) -> Bool) : Bool {
    for (item in arr.vals()) {
      if (eq(item, elem)) {
        return true;
      };
    };
    false
  };
public shared(msg) func addModel(
    name: Text,
    price: Nat,
    tags: [Text],
    language: Text,
    datasetId: Nat,
    input: Text,
    sampleOutput: Text,
    image: Text
) : async Text {
      let model : Model = {
          id = models.size();
          name = name;
          price = price;
          owner = msg.caller;
          tags = tags; 
          language = language; 
          datasetId = datasetId; 
          sampleOutput= sampleOutput;
          input=  input ;
          image = image;
      };
      
      models := Array.append<Model>(models, [model]); // Explicitly define Model type
      Debug.print("Model added: " # debug_show(model));
      return "Model added!";
  };


    public query func getModels() : async [Model] {
      return models;
    };


  public query func getModelsWithFilters(filters: { tags: [Text]; language: Text }) : async [Model] {
    Debug.print("Filtering models with: " # debug_show(filters));
    let filtered = Array.filter(models, func(m: Model) : Bool {
      let tagMatch = if (filters.tags.size() == 0) {
        true
      } else {
        let matchingTags = Array.filter(filters.tags, func(tag: Text) : Bool {
          contains(m.tags, tag, Text.equal)
        });
        matchingTags.size() == filters.tags.size()
      };
      let langMatch = m.language == filters.language or filters.language == "";
      tagMatch and langMatch
    });
    return filtered;
  };

  // Function to check remaining free trials for a user and model
  public shared(msg) func getRemainingTrials(modelId: Nat) : async Nat {
    let user = msg.caller;
    let userTrials = switch (trials.get(user)) {
      case (null) { HashMap.HashMap<Nat, Nat>(10, Nat.equal, customNatHash) };
      case (?map) { map };
    };
    let remainingTrials = switch (userTrials.get(modelId)) {
      case (null) {
        // Initialize with 3 free trials for new users
        userTrials.put(modelId, 3);
        trials.put(user, userTrials);
        3
      };
      case (?trials) { trials };
    };
    Debug.print("Remaining trials for user " # Principal.toText(user) # " on model " # Nat.toText(modelId) # ": " # Nat.toText(remainingTrials));
    return remainingTrials;
  };

  // Function to use a free trial or check access
  public shared(msg) func tryModel(modelId: Nat) : async { #Success: Text; #NoTrials; #AccessDenied } {
    let user = msg.caller;
    let model = Array.find(models, func(m: Model) : Bool { m.id == modelId });
    switch (model) {
      case (null) {
        Debug.print("Model not found for ID: " # Nat.toText(modelId));
        return #AccessDenied;
      };
      case (?m) {
        // Check if user has an access key (for paid access)
        let key = "KEY-" # Nat.toText(modelId) # "-" # Principal.toText(user);
        let hasKey = Array.find(accessKeys, func(k: (Text, Principal)) : Bool {
          k.0 == key and k.1 == user
        });

        if (hasKey != null) {
          // Debug.print("User has paid access for model " # Nat.toText(modelId));
          return #Success(key);
        };

        // Check remaining free trials
        let userTrials = switch (trials.get(user)) {
          case (null) { HashMap.HashMap<Nat, Nat>(10, Nat.equal, customNatHash) };
          case (?map) { map };
        };
        let remainingTrials = switch (userTrials.get(modelId)) {
          case (null) { 3 }; // Default to 3 free trials
          case (?trials) { trials };
        };

        if (remainingTrials > 0) {
          // Use a free trial
          userTrials.put(modelId, remainingTrials - 1);
          trials.put(user, userTrials);
          Debug.print("Free trial used. Remaining trials: " # Nat.toText(remainingTrials - 1));
          return #Success("FREE-" # Nat.toText(modelId) # "-" # Principal.toText(user));
        } else {
          Debug.print("No free trials remaining for user " # Principal.toText(user) # " on model " # Nat.toText(modelId));
          return #NoTrials;
        };
      };
    };
  };

  public query func getTransactions() : async [(Nat, Nat, Nat)] {
    return transactions;
  };

  public shared(msg) func verifyAccess(key: Text) : async Bool {
    Debug.print("Verifying key: " # key);
    Debug.print("Caller: " # Principal.toText(msg.caller));
    Debug.print("Stored keys: " # debug_show(accessKeys));
    let found = Array.find(accessKeys, func(k: (Text, Principal)) : Bool {
      let matches = k.0 == key and k.1 == msg.caller;
      Debug.print("Key match: " # k.0 # " == " # key # " -> " # debug_show(k.0 == key));
      Debug.print("Principal match: " # Principal.toText(k.1) # " == " # Principal.toText(msg.caller) # " -> " # debug_show(k.1 == msg.caller));
      matches
    });
    let result = switch (found) { case (null) false; case (?_) true };
    Debug.print("Access result: " # debug_show(result));
    return result;
  };

  public shared(_msg) func reverseText(input: Text, key: Text) : async Text {
    let hasAccess = await verifyAccess(key);
    if (not hasAccess) {
      Debug.print("Access denied for input: " # input);
      return "Access denied";
    };
    let chars = Text.toArray(input);
    let reversed = Array.reverse(chars);
    let result = Text.fromArray(reversed);
    Debug.print("Text reversed: " # input # " -> " # result);
    return result;
  };

  public shared(_msg) func runOffchainModel(modelId: Nat, _input: Text, key: Text) : async Text {
    let hasAccess = await verifyAccess(key);
    if (not hasAccess) {
      Debug.print("Access denied for offchain model: " # Nat.toText(modelId));
      return "Access denied";
    };
    let model = Array.find(models, func(m: Model) : Bool { m.id == modelId });
    switch (model) {
      case (null) {
        Debug.print("Model not found for offchain run: " # Nat.toText(modelId));
        return "Model not found";
      };
      case (?m) {
        let result = "Sentiment: Positive (simulated)";
        Debug.print("Offchain result for " # m.name # ": " # result);
        return result;
      };
    };
  };

  public shared(msg) func addDataset(name: Text, description: Text, url: Text) : async Nat {
    let dataset = {
      id = nextDatasetId;
      name = name;
      description = description;
      owner = msg.caller;
      url = url;
    };
    datasets := Array.append(datasets, [dataset]);
    nextDatasetId += 1;
    return dataset.id;
  };

  public query func getDatasets() : async [Dataset] {
    return datasets;
  };
}