import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import ModelPage from "../pages/ModelPage";
import DatasetPage from "../pages/DatasetPage";
import Dashboard from "../pages/Dashboard";
import Community from "../pages/Community";
import Profile from "../pages/Profile";
import Footer from "../components/Footer";
import { useAuth } from "../src/StateManagement/useContext/useClient";
import Model from "../pages/model";
import Repo from "../pages/Repository";
import BountyCreation from "../pages/BountyCreation";
import GovernancePage from "../pages/Governence";
import FundingPage from "../pages/Funding";
import CommunityActivity from "../pages/CommunityActivity";

const App = () => {
    const [identity, setIdentity] = useState(null);


    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };
    
    const { isAuthenticated,  principal,actor } = useAuth();
    
    
    return (
          <Router>
                <Navbar />
                {/* <div className="min-h-screen bg-white flex flex-col"> */}
                    {/* <div style={{ padding: "20px" }}> */}
            <Routes>
                            <Route path="/" element={<Home  />} />
                            {/* <Route path="/model/:id" el > */}
                            <Route path="/datasets" element={<DatasetPage  />} />
                            <Route path="/dashboard" element={<Dashboard  />} />
                            <Route path="/modelpage" element={<ModelPage />} />
                            <Route path="/community" element={<Community  />} />
                            <Route path="/profile/:username" element={<Profile  />} />
                            <Route path="/model/:id" element={<Model  />} />
                            <Route path="/repo" element={<Repo  />} />
                            <Route path="/create-bounty" element={<BountyCreation  />} />
                            <Route path="/governence" element={<GovernancePage  />} />

                            <Route path="/CommunityActivity" element={< CommunityActivity />} />
                            
                {/* </div>
              </div> */}
                    </Routes>
                <Footer />
          </Router>
    );
};

export default App;

// import { useState, useEffect } from "react";
// import { Actor, HttpAgent } from "@dfinity/agent";
// import { idlFactory } from "declarations/ModelX_backend";
// import { AuthClient } from "@dfinity/auth-client";

// function App() {
//   const [authClient, setAuthClient] = useState(null);
//   const [actor, setActor] = useState(null);
//   const [principal, setPrincipal] = useState(null);
//   const [models, setModels] = useState([]);
//   const [selectedModel, setSelectedModel] = useState(null);
//   const [inputText, setInputText] = useState("");
//   const [result, setResult] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [balance, setBalance] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   // datasets
//   const [newDataset, setNewDataset] = useState({ name: "", description: "", url: "" });

//   const handleAddDataset = async () => {
//     if (!actor || !newDataset.name || !newDataset.description || !newDataset.url) return;
//     try {
//       const datasetId = await actor.addDataset(newDataset.name, newDataset.description, newDataset.url);
//       setNewDataset({ name: "", description: "", url: "" });
//       alert("Dataset added with ID: " + datasetId);
//     } catch (error) {
//       console.error("Error adding dataset:", error);
//     }
//   };
//   //transaction 
//   const [transactions, setTransactions] = useState([]);

//   const fetchTransactions = async (actorInstance) => {
//     if (!actorInstance) return;
//     try {
//       const txList = await actorInstance.getTransactions();
//       setTransactions(txList);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   }
//   // community 
//   useEffect(() => {
//     (async () => {
//       const client = await AuthClient.create();
//       setAuthClient(client);
//       if (await client.isAuthenticated()) {
//         await handleAuthenticated(client);
//       }
//     })();
//   }, []);

//   const handleAuthenticated = async (client) => {
//     try {
//       const identity = client.getIdentity();
//       const agent = new HttpAgent({ identity });
//       if (process.env.DFX_NETWORK !== "ic") {
//         try {
//           await agent.fetchRootKey();
//           console.log("Root key fetched successfully");
//         } catch (err) {
//           console.error("Failed to fetch root key:", err);
//           throw err;
//         }
//       }

//       const canisterId = process.env.VITE_CANISTER_ID || "bw4dl-smaaa-aaaaa-qaacq-cai";
//       console.log("Using canister ID:", canisterId);
//       const actorInstance = Actor.createActor(idlFactory, {
//         agent,
//         canisterId,
//       });
//       setActor(actorInstance);
//       console.log("Actor instance created:", actorInstance);
//       setIsAuthenticated(true);
//       setPrincipal(identity.getPrincipal());
//       fetchModels(actorInstance);
//       fetchBalance(actorInstance);
//       fetchTransactions(actorInstance);
//     } catch (error) {
//       console.error("Authentication failed with error:", error);
//     }
//   };

//   const login = async () => {
//     await authClient.login({
//       identityProvider:
//         process.env.DFX_NETWORK === "ic"
//           ? "https://identity.ic0.app"
//           : "http://avqkn-guaaa-aaaaa-qaaea-cai.localhost:4943",
//       onSuccess: () => handleAuthenticated(authClient),
//     });
//   };

//   const logout = async () => {
//     await authClient.logout();
//     setIsAuthenticated(false);
//     setPrincipal(null);
//     setModels([]);
//     setActor(null);
//     setSelectedModel(null);
//     setResult(null);
//     setBalance(null);
//     setErrorMessage(null);
//   };

//   const fetchModels = async (actorInstance, filters = {}) => {
//     if (!actorInstance) return;
//     try {
//       const modelList = await actorInstance.getModelsWithFilters(filters);
//       setModels(modelList);
//     } catch (error) {
//       console.error("Error fetching models:", error);
//     }
//   };


//   const fetchBalance = async (actorInstance) => {
//     if (!actorInstance || !principal) return;
//     try {
//       const balanceResult = await actorInstance.accountBalance();
//       setBalance(Number(balanceResult.e8s) / 100_000_000);
//       console.log("Fetched balance:", balanceResult.e8s);
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//       setBalance(0);
//     }
//   };

//   const handlePayAndRun = async () => {
//     if (!actor || !selectedModel || !inputText) {
//       setErrorMessage("Please select a model and enter input text.");
//       return;
//     }
//     try {
//       setIsLoading(true);
//       setErrorMessage(null);
//       console.log("Caller principal:", principal?.toText());
//       const key = await actor.payForModel(selectedModel.id);
//       console.log("Access key:", key);

//       if (key === "Model not found") {
//         setErrorMessage("Model not found.");
//         return;
//       }
//       if (key === "Insufficient balance") {
//         setErrorMessage("Insufficient LICP balance to pay for this model.");
//         return;
//       }
//       if (key.includes("Transfer failed")) {
//         setErrorMessage(key);
//         return;
//       }

//       let aiResult;
//       if (selectedModel.id === 0) {
//         aiResult = await actor.reverseText(inputText, key);
//       } else {
//         aiResult = await actor.runOffchainModel(selectedModel.id, inputText, key);
//       }

//       if (aiResult === "Access denied") {
//         setErrorMessage("Access denied. Payment may not have been processed correctly.");
//         return;
//       }

//       setResult(aiResult);
//       fetchBalance(actor);
//     } catch (error) {
//       console.error("Error running model:", error);
//       setErrorMessage("An error occurred while processing your request.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="max-w-2xl mx-auto p-4 font-sans">
//       <img src="/logo2.svg" alt="DFINITY logo" className="block mx-auto mb-4" />
//       {!isAuthenticated ? (
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Welcome to AI Marketplace</h2>
//           <button
//             onClick={login}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Login with Internet Identity
//           </button>
//         </div>
//       ) : (
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">AI Model Marketplace</h2>
//             <button
//               onClick={logout}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//           <p className="mb-4">Logged in as: {principal?.toText()}</p>
//           {balance !== null && (
//             <div className="flex items-center mb-4">
//               <p>Your LICP Balance: {balance.toFixed(2)} LICP</p>
//               <button
//                 onClick={() => fetchBalance(actor)}
//                 className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 ml-2"
//               >
//                 Refresh Balance
//               </button>
//             </div>
//           )}
//           {errorMessage && (
//             <p className="mb-4 text-red-500">{errorMessage}</p>
//           )}
//           <section className="mb-6">
//             <h3 className="text-xl font-semibold mb-2">Available Models</h3>
//             {models.length === 0 ? (
//               <p>No models available yet.</p>
//             ) : (
//               <ul className="space-y-2">
//                 {models.map((model) => (
//                   <li
//                     key={model.id}
//                     className="flex justify-between items-center p-2 bg-gray-100 rounded"
//                   >
//                     <span>
//                       {model.name} - {(Number(model.price) / 100_000_000).toFixed(2)} LICP
//                     </span>
//                     <button
//                       onClick={() => setSelectedModel(model)}
//                       className="bg-green-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                     >
//                       Select
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </section>
//           {selectedModel && (
//             <section className="mb-6">
//               <h3 className="text-xl font-semibold mb-2">
//                 Run {selectedModel.name}
//               </h3>
//               <input
//                 type="text"
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//                 placeholder="Enter text to process"
//                 className="w-full p-2 border rounded mb-2"
//               />
//               <button
//                 onClick={handlePayAndRun}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Processing..." : "Pay & Run"}
//               </button>
//             </section>
//           )}
//           {result && (
//             <section>
//               <h3 className="text-xl font-semibold mb-2">Result</h3>
//               <p className="p-2 bg-gray-100 rounded">{result}</p>
//             </section>
//           )}
//           <section className="mb-6">
//             <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
//             <ul className="space-y-2">
//               {transactions.map((tx, index) => (
//                 <li key={index} className="p-2 bg-gray-100 rounded">
//                   <p>Model ID: {tx?.0:"N.A."}</p>
//                   <p>Amount: {(tx?.2 / 100_000_000:"N.A.").toFixed(2)} LICP</p>
//                   <p>Timestamp: {new Date(Number(tx?.1:"N.A.")).toLocaleString()}</p>
//                 </li>
//               ))}
//             </ul>
//           </section>
          
//         </div>
//       )}
//     </main>
//   );
// }

// export default App;