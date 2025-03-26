  import Text "mo:base/Text";
  import Nat "mo:base/Nat";
  import Array "mo:base/Array";
  import Time "mo:base/Time";
  import Debug "mo:base/Debug";
  import Principal "mo:base/Principal";
  import HashMap "mo:base/HashMap";
  import Iter "mo:base/Iter";
  import Nat32 "mo:base/Nat32";
  import Blob "mo:base/Blob";
  import Option "mo:base/Option";
  import Result"mo:base/Result";
  import Hash "mo:base/Hash";



  actor Community {
    func customHash(n: Nat): Nat32 {
      return Nat32.fromNat(n % 4294967296); // Simple modulus-based hashing
    };
    let keyEqual = Nat.equal;
    let keyHash = customHash;

    // POST AND PROFILE 
    type Post = {
      id: Nat;
      author: Principal;
      content: Text;
      timestamp: Int;
    };
    

    type Profile = {
      username: Text;
      bio: Text;
      avatar: Text;
      email: Text;
      github: Text;
      posts: [Nat]; 
      communities: [Nat];
    };
    // Custom Nat hash function
    func natHash(n: Nat) : Nat32 {
        // Convert Nat to Nat32 using bitwise operations for better distribution
        return Nat32.fromNat(n % 4294967296);  // Ensuring the value stays within Nat32 range
    };
    func blobToText(b: Blob): Text {
        switch (Text.decodeUtf8(b)) {
            case (?t) t; // Successfully converted
            case null "Invalid UTF-8"; // Fallback in case of error
        }
    };



    stable var posts: [Post] = [];
    stable var nextId: Nat = 0;
    stable var profiles: [(Principal, Profile)] = [];

    public shared(msg) func createPost(content: Text) : async Nat {
      if (content == "") { return 0 };
      
      let post = {
        id = nextId;
        author = msg.caller;
        content = content;
        timestamp = Time.now();
      };
      
      posts := Array.append(posts, [post]);
      nextId += 1;

      // Update user profile to include this post ID
      let currentProfile = Array.find(profiles, func((p: Principal, _: Profile)): Bool { p == msg.caller });
      switch (currentProfile) {
        case (null) {
          // No profile exists, do nothing or handle differently if required
        };
        case (?(_, profile)) {
          let updatedProfile: Profile = {
            username = profile.username;
            bio = profile.bio;
            avatar = profile.avatar;
            email = profile.email;
            github = profile.github;
            posts = Array.append(profile.posts, [post.id]); // Immutable append
            communities = profile.communities;
          };
          profiles := Array.filter(profiles, func((p: Principal, _: Profile)): Bool { p != msg.caller });
          profiles := Array.append(profiles, [(msg.caller, updatedProfile)]);
        };
      };

      Debug.print("New post created: " # debug_show(post));
      return post.id;
    };

    public query func getPosts() : async [Post] {
      return posts;
    };

    public shared(msg) func updateProfile(username: Text, bio: Text, avatar: Text, email: Text, github: Text, communities: [Nat]) : async Bool {
      let principal = msg.caller;
      let profile: Profile = {
        username;
        bio;
        avatar;
        email;
        github;
        posts = switch (Array.find(profiles, func((p: Principal, _: Profile)): Bool { p == principal })) {
          case (null) { [] };
          case (?(_, existing)) { existing.posts };
        };
        communities;
      };

      let updated = Array.find(profiles, func((p: Principal, _: Profile)): Bool { p == principal });
      profiles := Array.filter(profiles, func((p: Principal, _: Profile)): Bool { p != principal });
      profiles := Array.append(profiles, [(principal, profile)]);
      
      return true;
    };

    public query func getProfile(user: Principal) : async ?Profile {
      switch (Array.find(profiles, func((p: Principal, _: Profile)): Bool { p == user })) {
        case (null) { null };
        case (?(_, profile)) { ?profile };
      };
    };
    public shared(msg)  func whoAmi(): async ?Profile{
      return switch (Array.find(profiles, func((p: Principal, _: Profile)): Bool {
        p == msg.caller
        })) {
          case (null) { null };
          case (?(_, profile)) { ?profile };
          };
    };
        




      // Communtiy Related Functions and idk variables     
      public type Role = {
          #Leader;
          #Member;
      };  
      
      public type Community = {
        id: Nat;
        name: Text;
        description: Text;
        creator: Principal;
        members: [(Principal, Role)];
        membershipFee: ?Nat;
        proposals: [(Nat, Proposal)];
      };

      stable var nextCommunityId: Nat = 0;
      let communities = HashMap.HashMap<Nat, Community>(0, Nat.equal, natHash);
      stable var nextProposalId: Nat = 0;
      let campaigns = HashMap.HashMap<Nat, Campaign>(0, Nat.equal, natHash);
      
    // Structure of a proposal
    public type Proposal = {
      id: Nat;
      title: Text;
      description: Text;
      proposer: Principal;
      votes: [(Principal, Bool)];
      executed: Bool;
    };


    public type Campaign = {
      id: Nat;
      proposalId: Nat;
      creator: Principal;
      fundsRaised: Nat;
      targetAmount: Nat;
      deadline: Int;
    };

      public shared(msg) func createCommunity(name: Text, description: Text, membershipFee: ?Nat) : async Nat {
          let id = nextCommunityId;
          nextCommunityId += 1;

          let community: Community = {
              id = id;
              name = name;
              description = description;
              creator = msg.caller;
              members = [(msg.caller, #Leader)]; 
              membershipFee = membershipFee;
              proposals= []
          };
          
          communities.put(id, community);
          return id;
      };


      public shared(msg) func joinCommunity(communityId: Nat, payment: ?Nat) : async Text {
          switch (communities.get(communityId)) {
              case (?community) {
                  switch (community.membershipFee) {
                      case (?fee) {
                          if (payment == null or payment != ?fee) {
                              return "Incorrect membership fee.";
                          }
                      };
                      case null {}; // Free community
                  };
                  
                  let updatedCommunity = {
                      community with
                      members = Array.append(community.members, [(msg.caller, #Member)]);
                  };
                  
                  communities.put(communityId, updatedCommunity);
                  return "Successfully joined the community!";
              };
              case null { return "Community not found!"; };
          };
      };

      public query func getCommunity(communityId: Nat) : async ?Community {
          return communities.get(communityId);
          };

      public query func getAllCommunities() : async [(Nat, Text, Text, Nat)] {
          return Iter.toArray<(Nat, Text, Text, Nat)>(Iter.map<(Nat, Community), (Nat, Text, Text, Nat)>(
              communities.entries(),  // Convert hashmap to iterable
              func(x: (Nat, Community)) : (Nat, Text, Text, Nat) {
                  let (id, c) = x; // Explicitly destructuring tuple
                  (id, c.name, c.description, Option.get(c.membershipFee, 0))
              }
          ));
      };


    // Helper function to check if a user is a leader of a community
    func isLeader(community: Community, user: Principal): Bool {
        for ((memberPrincipal, role) in Iter.fromArray(community.members)) { 
          if (memberPrincipal == user and role == #Leader) {
            return true;
          }
        };
        return false; // Return false only after checking all members
      };


    // Function to create a proposal (only accessible by community leaders)
    public shared(msg) func createProposal(communityId: Nat, title: Text, description: Text): async Result.Result<Bool, Text> {
      switch (communities.get(communityId)) {
        case (?community) {
          if (isLeader(community, msg.caller)) {
            let proposal: Proposal = {
              id = nextProposalId;
              title = title;
              description = description;
              proposer = msg.caller;
              votes = [];
              executed = false;
            };
            nextProposalId += 1;

            let updatedCommunity = {
              community with
              proposals = Array.append(community.proposals, [(proposal.id, proposal)]);
            };

            communities.put(communityId, updatedCommunity);
            return #ok(true);
          } else {
            return #err("Only community leaders can create proposals.");
          }
        };
        case null {
          return #err("Community not found.");
        };
      };
    };

    // Function for community members to vote on a proposal
    public shared(msg) func voteOnProposal(communityId: Nat, proposalId: Nat, approve: Bool): async Result.Result<Bool, Text> {
      switch (communities.get(communityId)) {
        case (?community) {
          var proposalOpt: ?Proposal = null;
          var updatedProposals: [(Nat, Proposal)] = [];

          for ((id, proposal) in Iter.fromArray(community.proposals)) {
            if (id == proposalId) {
              proposalOpt := ?proposal;
            } else {
              updatedProposals := Array.append(updatedProposals, [(id, proposal)]);
            }
          };

          switch (proposalOpt) {
            case (?proposal) {
              // Check if the caller has already voted
              for ((voter, _) in Iter.fromArray(proposal.votes)) {
                if (voter == msg.caller) {
                  return #err("You have already voted on this proposal.");
                }
              };

              let updatedVotes = Array.append(proposal.votes, [(msg.caller, approve)]);
              let updatedProposal = { proposal with votes = updatedVotes };
              updatedProposals := Array.append(updatedProposals, [(proposalId, updatedProposal)]);

              let updatedCommunity = { community with proposals = updatedProposals };
              communities.put(communityId, updatedCommunity);

              return #ok(true);
            };
            case null {
              return #err("Proposal not found.");
            };
          };
        };
        case null {
          return #err("Community not found.");
        };
      };
    };

    // Function to execute an approved proposal (only accessible by community leaders)
    public shared(msg) func executeProposal(communityId: Nat, proposalId: Nat): async Result.Result<Bool, Text> {
      switch (communities.get(communityId)) {
        case (?community) {
          if (isLeader(community, msg.caller)) {
            var proposalOpt: ?Proposal = null;
            var updatedProposals: [(Nat, Proposal)] = [];

            for ((id, proposal) in Iter.fromArray(community.proposals)) {
              if (id == proposalId) {
                proposalOpt := ?proposal;
              } else {
                updatedProposals := Array.append(updatedProposals, [(id, proposal)]);
              }
            };

            switch (proposalOpt) {
              case (?proposal) {
                if (proposal.executed) {
                  return #err("Proposal has already been executed.");
                };

                // Simple majority approval check
                let totalVotes = proposal.votes.size();
                let approveVotes = Array.foldLeft< (Principal, Bool), Nat >(
                  proposal.votes,
                  0,
                  func(acc: Nat, tuple: (Principal, Bool)): Nat {
                    let (_, vote) = tuple;
                    if (vote) { acc + 1 } else { acc }
                  }
                );


                if (approveVotes > totalVotes / 2) {
                  // Mark the proposal as executed
                  let executedProposal = { proposal with executed = true };
                  updatedProposals := Array.append(updatedProposals, [(proposalId, executedProposal)]);

                  let updatedCommunity = { community with proposals = updatedProposals };
                  communities.put(communityId, updatedCommunity);

                  return #ok(true);
                } else {
                  return #err("Proposal did not receive majority approval.");
                }
              };
              case null {
                return #err("Proposal not found.");
              };
            };
          } else {
            return #err("Only community leaders can execute proposals.");
          }
        };
        case null {
          return #err("Community not found.");
        };
      };
    };

  

  }