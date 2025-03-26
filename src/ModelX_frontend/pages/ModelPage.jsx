import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Download, Filter, Search, Star } from "lucide-react";
import { useAuth } from "../../ModelX_frontend/src/StateManagement/useContext/useClient";

const ModelPage = () => {
    const { id } = useParams();
    const [model, setModel] = useState(null);
    const [remainingTrials, setRemainingTrials] = useState(0);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filterLanguage, setFilterLanguage] = useState("");
    
    const { isAuthenticated,  principal,actor } = useAuth();
    const fetchModels = async() =>
          {
              // const modelList = await actor.getModelsWithFilters({language: filterLanguage, tags:[inputText]});
              const modelList = await actor.getModels();
              console.log(modelList);
              setModel(modelList)
              if (!modelList || modelList.length === 0) {
                  console.warn("No models found.");
              } else {
                  console.log("Model List:", modelList);
              }
          }
  
  useEffect(() => {
    if (actor) {
        fetchModels({filterLanguage, inputText});
    }
  }, [actor]);


    const models = [
        {
            id: 1,
            name: "GPT-4 Classifier",
            description: "High-performance text classification model with multi-language support.",
            author: "Sarah Chen",
            stars: 1234,
            downloads: 45678,
            tags: ["NLP", "Classification", "Multi-language"],
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 2,
            name: "ImageTransformer V2",
            description: "State-of-the-art image transformation model with advanced feature detection.",
            author: "Michael Rodriguez",
            stars: 987,
            downloads: 34567,
            tags: ["Computer Vision", "Image Processing"],
            image: "https://images.unsplash.com/photo-1527430253228-e93688616381?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        },
        { id: 3, name: "Stable Diffusion", tags: ["AI", "Image"], language: "Python", price: 200 },
    ];



    
    // const handleTryForFree = async (modelId) => {
    //   if (!actor) {
    //       setError("Please log in to try the model.");
    //       return;
    //     }
    //     try {
    //       const result = await actor.tryModel(modelId);
    //       if ("Success" in result) {
    //           const key = result.Success;
    //           const runResult = await actor.runOffchainModel(modelId, "test input", key);
    //           console.log("Run result:", runResult);
    //           const remaining = await actor.getRemainingTrials(modelId);
    //           setRemainingTrials({ ...remainingTrials, [modelId]: Number(remaining) });
    //       } else if ("NoTrials" in result) {
    //           setError("No more free trials available for this model.");
    //       } else {
    //           setError("Access denied.");
    //       }
    //     } catch (err) {
    //       setError("An error occurred while trying the model.");
    //       console.error("Try for free error:", err);
    //     }
    //   };
      
      return (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Filter Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    type="text"
                    placeholder="Search models..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <button onClick={() => handleBuyTrial(model.id)} className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">

                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </button>
              </div>
            </div>
    
            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {model?model.map((model) => (
                <Link
                  key={model.id}
                  to={`/model/${model.id}`}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-6" onClick={() => handleTryForFree(model.id)}>

                    <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
                    <p className="mt-2 text-gray-600 text-sm">{model.description}</p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1">{model.stars}</span>
                      </div>
                      <div className="flex items-center ml-4">
                        <Download className="h-4 w-4 text-gray-400" />
                        <span className="ml-1">{model.downloads}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {model.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              )):models.map((model) => (
                <Link
                  key={model.id}
                  to={`/model/${model.id}`}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  /> 
                  <div className="p-6" onClick={() => handleTryForFree(model.id)}>

                    <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
                    <p className="mt-2 text-gray-600 text-sm">{model.description}</p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1">{model.stars}</span>
                      </div>
                      <div className="flex items-center ml-4">
                        <Download className="h-4 w-4 text-gray-400" />
                        <span className="ml-1">{model.downloads}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {model.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }
       
    









//     <div>
//     <h1>AI Model Marketplace</h1>
//     {error && <p style={{ color: "red" }}>{error}</p>}

//     {/* Filter Form */}
//     <h2>Filter Models</h2>
//     <div style={{ marginBottom: "20px" }}>
//         <label>
//             Tags (comma-separated):
//             <input
//                 type="text"
//                 value={filterTags}
//                 onChange={(e) => setFilterTags(e.target.value)}
//                 placeholder="e.g., machine learning, nlp"
//                 style={{ marginLeft: "10px", marginRight: "20px" }}
//             />
//         </label>
//         <label>
//             Language:
//             <input
//                 type="text"
//                 value={filterLanguage}
//                 onChange={(e) => setFilterLanguage(e.target.value)}
//                 placeholder="e.g., Python"
//                 style={{ marginLeft: "10px" }}
//             />
//         </label>
//     </div>

//     <h2>Available Models</h2>
//     {models.length === 0 && !error ? (
//         <p>No models available or please log in to view models.</p>
//     ) : (
//         models.map((model) => (
//             <div key={model.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
//                 <p>{model.name} - {Number(model.price) / 100000000} LICP</p>
//                 {remainingTrials[model.id] > 0 ? (
//                     <>
//                         <p>Remaining Free Trials: {remainingTrials[model.id]}</p>
//                         <button onClick={() => handleTryForFree(model.id)}>Try for Free</button>
//                     </>
//                 ) : (
//                     <>
//                         <p>No more free trials available for this user.</p>
//                         <button onClick={() => handleBuyTrial(model.id)}>Buy Trial</button>
//                     </>
//                 )}
//                 <p>{model.tag?model.tag:"NO tags available"}</p>
//                 <button onClick={() => navigate(`/model/${model.id}`)}>View Details</button>
//             </div>
//         ))
//     )}

//     {/* Purchase Modal */}
//     {showModal && (
//         <div style={{ position: "fixed", top: "20%", left: "20%", background: "white", padding: "20px", border: "1px solid #ccc", zIndex: 1000 }}>
//             <h3>Purchase Options for Model {selectedModelId}</h3>
//             <p>1 Week Access - 0.01 LICP</p>
//             <button onClick={() => handlePurchase("1 Week Access")}>Buy</button>
//             <p>1 Month Access - 0.03 LICP</p>
//             <button onClick={() => handlePurchase("1 Month Access")}>Buy</button>
//             <p>Enterprise License (Full Access with Usage License) - 0.10 LICP</p>
//             <button onClick={() => handlePurchase("Enterprise License")}>Buy</button>
//             <button onClick={() => setShowModal(false)}>Close</button>
//         </div>
//     )}
// </div>



export default ModelPage;
