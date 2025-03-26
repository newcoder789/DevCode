// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "../src/index.scss";
// import { Code2, Shield, Users } from 'lucide-react';

// function Home({ identity, actor }) {
//     const navigate = useNavigate();

//     const [models, setModels] = useState([]);
//     const [selectedModel, setSelectedModel] = useState(null);
//     const [filterTags, setFilterTags] = useState("");
//     const [filterLanguage, setFilterLanguage] = useState("");
    
//     const features = [
//         {
//         title: 'Decentralized Governance',
//         description: 'Community-driven decision making for sustainable growth and innovation.',
//         icon: <Code2 className="w-8 h-8 text-indigo-600" />
//         },
//         {
//         title: 'Secure Transactions',
//         description: 'Enterprise-grade security ensuring safe and reliable operations.',
//         icon: <Shield className="w-8 h-8 text-indigo-600" />
//         },
//         {
//         title: 'Community Collaboration',
//         description: 'Connect with developers worldwide to build amazing projects.',
//         icon: <Users className="w-8 h-8 text-indigo-600" />
//         }
//     ];
//     const testimonials = [
//         {
//           name: 'Sarah Chen',
//           role: 'Senior Developer',
//           image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
//           quote: 'This platform has revolutionized how we collaborate on projects. The decentralized approach makes everything more transparent and efficient.'
//         },
//         {
//           name: 'Michael Rodriguez',
//           role: 'Tech Lead',
//           image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
//           quote: 'The security features and community support are outstanding. It\'s become an essential part of our development workflow.'
//         }
//       ];
    

//     const fetchModels = async () => {
//         if (!actor) {
//             console.log("Please log in to fetch models.");
//             return;
//         }
//         try {
//             const tagsArray = filterTags ? filterTags.split(",").map(tag => tag.trim()) : [];
//             const filter = { tags: tagsArray, language: filterLanguage };
//             const modelList = await actor.getModelsWithFilters(filter);
//             setModels(modelList);
//             const trials = {};
//             for (const model of modelList) {
//                 const remaining = await actor.getRemainingTrials(model.id);
//                 trials[model.id] = Number(remaining);
//             }
//             setRemainingTrials(trials);
//         } catch (err) {
//             console.log("An error occurred while fetching models.");
//             console.error("Fetch models error:", err);
//         }
//     };


//     return (
//         <>
//         {/* Hero Section */}
//         <div className="relative bg-white overflow-hidden">
//           <div className="max-w-7xl mx-auto">
//             <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 flex flex-col items-center text-center">
//               <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
//                 <div className="sm:text-center">
//                   <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
//                     <span className="block">Empowering Developers</span>
//                     <span className="block text-indigo-600">through Decentralized Collaboration</span>
//                   </h1>
//                   <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
//                     Join a thriving community of developers building the future of decentralized applications. 
//                     Collaborate, innovate, and grow together.
//                   </p>
//                   <div className="mt-5 sm:mt-8 flex justify-center">
//                     <div className="rounded-md shadow">
//                       <Link to="/modelpage" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
//                         Get Started
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </main>
//             </div>
//           </div>
//         </div>

  
//         {/* Features Section */}
//         <div className="py-12 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="lg:text-center">
//               <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
//               <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//                 Everything you need to succeed
//               </p>
//             </div>
  
//             <div className="mt-10">
//               <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
//                 {features.map((feature, index) => (
//                   <div key={index} className="pt-6">
//                     <div className="flow-root bg-white rounded-lg px-6 pb-8">
//                       <div className="-mt-6">
//                         <div className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
//                           {feature.icon}
//                         </div>
//                         <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
//                         <p className="mt-5 text-base text-gray-500">{feature.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
  
//         {/* Testimonials Section */}
//         <div className="py-12 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
//               What our users say
//             </h2>
//             <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//               {testimonials.map((testimonial, index) => (
//                 <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-sm">
//                   <div className="flex items-center mb-6">
//                     <img
//                       className="h-12 w-12 rounded-full"
//                       src={testimonial.image}
//                       alt={testimonial.name}
//                     />
//                     <div className="ml-4">
//                       <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
//                       <p className="text-gray-500">{testimonial.role}</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 italic">"{testimonial.quote}"</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//     </>
//     );
// }

// export default Home;




// // const handlePayAndRun = async () => {
//         //     if (!actor || !selectedModel || !inputText) {
//         //     console.logMessage("Please select a model and enter input text.");
//         //     return;
//         //     }
//         //     try {
//         //     setIsLoading(true);
//         //     console.logMessage(null);
//         //     const key = await actor.payForModel(selectedModel.id);
//         //     if (key === "Model not found") {
//         //         console.logMessage("Model not found.");
//         //         return;
//         //     }
//         //     if (key === "Insufficient balance") {
//         //         console.logMessage("Insufficient LICP balance to pay for this model.");
//         //         return;
//         //     }
//         //     if (key.includes("Transfer failed")) {
//         //         console.logMessage(key);
//         //         return;
//         //     }
    
//         //     let aiResult;
//         //     if (selectedModel.id === 0) {
//         //         aiResult = await actor.reverseText(inputText, key);
//         //     } else {
//         //         aiResult = await actor.runOffchainModel(selectedModel.id, inputText, key);
//         //     }
    
//         //     if (aiResult === "Access denied") {
//         //         console.logMessage("Access denied. Payment may not have been processed correctly.");
//         //         return;
//         //     }
    
//         //     setResult(aiResult);
//         //     fetchBalance(actor);
//         //     } catch (error) {
//         //     console.error("Error running model:", error);
//         //     console.logMessage("An error occurred while processing your request.");
//         //     } finally {
//         //     setIsLoading(false);
//         //     }
//         // };


import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl  max-h-screen mx-auto px-4 sm:px-6 lg:px-8 pt-10 ">
        <div
          className="relative bg-slate-950 rounded-3xl h-[589px] flex items-center justify-start bg-cover bg-center"
          style={{ backgroundImage: "url('/Frame1.png')" , backgroundPositionX: "500px"}}
        >
          {/* Left Side: Text and Button */}
          <div className="pl-[91px]">
            <h1 className="text-white text-5xl font-bold font-['Poppins'] leading-[79.5px] max-w-[645px]">
              A Decentralized AI Marketplace. Empowering Developers & Buyers
            </h1>
            <p className="text-neutral-300 text-2xl font-normal font-['Poppins'] leading-9 max-w-96 mt-[90px]">
              Unlock AI Without Middlemen
            </p>
            <div className="mt-6">
              <Link
                to="/get-started"
                className="inline-block bg-white text-black text-base font-normal font-['Inter'] leading-none px-8 py-4 rounded-full hover:bg-gray-200 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Side: Wavy Light Effect Overlay */}
          <img
            className="absolute right-0 top-0 h-full w-auto"
            src="/wavy-light-effect.png"
            alt="Wavy Light Effect"
            style={{ mixBlendMode: "screen" }}
          />
        </div>
      </section>
      {/* Models, Community, Datasets Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
  <div className="grid grid-cols-3 gap-6">
    {/* Models Column */}
    <div>
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 mr-2 overflow-hidden">
          <div className="w-3.5 h-2 absolute opacity-25 bg-black" />
          <div className="w-2 h-3.5 absolute opacity-50 bg-black" />
          <div className="w-2 h-3.5 absolute bg-black" />
        </div>
        <h3 className="text-base font-normal font-['IBM_Plex_Mono'] leading-snug">Models</h3>
      </div>
      {[
        { name: "deepseek-ai/DeepSeek-V3-0324", developer: "John Doe" },
        { name: "manycore-research/", developer: "Manycore Research" },
        { name: "ds4sd/SmolDocling-256M-preview", developer: "DS4SD" },
        { name: "mistralai/Mistral-Small", developer: "Mistral AI" },
        { name: "sesame/csm-1b", developer: "John Doe" },
      ].map((model, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4 mb-4 relative min-h-[100px]"
        >
          <p className="text-base font-normal font-['IBM_Plex_Mono'] leading-snug">{model.name}</p>
          <div className="flex items-center mt-2 text-sm font-normal font-['Inter'] text-black">
            <span>Developer: {model.developer}</span>
          </div>
          <Link
            to="/buy-now"
            className="absolute right-4 top-4 bg-blue-400 text-white text-sm font-normal font-['Inter'] leading-none px-4 py-1 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black"
          >
            Buy Now
          </Link>
        </div>
      ))}
      <Link
        to="/models"
        className="block text-center text-base font-normal font-['Inter'] leading-normal mt-4"
      >
        Browse 1M+ models
      </Link>
    </div>

    {/* Community Column */}
    <div>
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 mr-2 overflow-hidden">
          <div className="w-3.5 h-2 absolute opacity-25 bg-black" />
          <div className="w-2 h-3.5 absolute opacity-50 bg-black" />
          <div className="w-2 h-3.5 absolute bg-black" />
        </div>
        <h3 className="text-base font-normal font-['IBM_Plex_Mono'] leading-snug">Community</h3>
      </div>
      {[
        "AI Nexus Hub",
        "Neural Forge",
        "The Model Lab",
        "SynthAI Community",
        "AI Dev Syndicate",
      ].map((community, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4 mb-4 relative min-h-[100px]"
        >
          <p className="text-base font-normal font-['IBM_Plex_Mono'] leading-snug">{community}</p>
          <div className="flex items-center mt-2 text-sm font-normal font-['Inter'] text-black">
            <span>Members: 10k+</span> {/* Placeholder to match other columns */}
          </div>
          <Link
            to="/join"
            className="absolute right-4 top-4 bg-blue-400 text-white text-sm font-normal font-['Inter'] leading-none px-4 py-1 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black"
          >
            Join
          </Link>
        </div>
      ))}
      <Link
        to="/communities"
        className="block text-center text-base font-normal font-['Inter'] leading-normal mt-4"
      >
        Browse 50k+ communities
      </Link>
    </div>

    {/* Datasets Column */}
    <div>
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 mr-2 overflow-hidden">
          <div className="w-3 h-1 bg-black bg-opacity-25" />
          <div className="w-3 h-2 opacity-50 bg-black" />
          <div className="w-3 h-2 opacity-50 bg-black" />
          <div className="w-3 h-[2.64px] bg-black" />
        </div>
        <h3 className="text-base font-normal font-['IBM_Plex_Mono'] leading-snug">Datasets</h3>
      </div>
      {[
        { name: "nvidia/Llama-Nemotron-Post", status: "Paid", color: "bg-blue-400" },
        { name: "glaiveai/reasoning-v1-20m", status: "Paid", color: "bg-blue-400" },
        { name: "nvidia/PhysicalAI-Rob-Embodi", status: "Free", color: "bg-emerald-400" },
        { name: "FreedomIntelligence/medical", status: "Free", color: "bg-emerald-400" },
        { name: "facebook/collaborative_agent_", status: "Free", color: "bg-emerald-400" },
      ].map((dataset, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4 mb-4 relative min-h-[100px]"
        >
          <p className="text-base font-normal font-['IBM_Plex_Mono'] leading-snug">{dataset.name}</p>
          <div className="flex items-center mt-2 text-sm font-normal font-['Inter'] text-black">
            <span>Updated</span>
            <span className="mx-2">•</span>
            <div className="w-4 h-4 overflow-hidden">
              <div className="w-3 h-3.5 bg-black" />
            </div>
            <span className="mx-2">•</span>
            <div className="w-4 h-4 overflow-hidden">
              <div className="w-3.5 h-3.5 bg-black" />
            </div>
          </div>
          <div
            className={`absolute right-4 top-4 ${dataset.color} text-white text-sm font-normal font-['Inter'] leading-none px-4 py-1 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black`}
          >
            {dataset.status}
          </div>
        </div>
      ))}
      <Link
        to="/datasets"
        className="block text-center text-base font-normal font-['Inter'] leading-normal mt-4"
      >
        Browse 250k+ datasets
      </Link>
    </div>
  </div>
</section>

      {/* The Home of Machine Learning Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-['Inter'] leading-9">The Home of Machine Learning</h2>
          <p className="mt-4 text-lg font-normal font-['Inter'] leading-7">
            Create, discover and collaborate on ML better.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">
          {/* Collaboration Platform */}
          <div className="bg-white rounded-xl border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6">
            <h3 className="text-xl font-semibold font-['Inter'] leading-7">The collaboration platform</h3>
            <p className="mt-2 text-base font-normal font-['Inter'] leading-normal">
              Host and collaborate on unlimited public models, datasets and applications.
            </p>
            <img
              className=" h-72 mt-4 border-t border-black overflow-hidden w-full"
              src="/collaboration.png"
              alt="CollaborationPlatform"
            />
          </div>

          {/* Move Faster */}
          <div className="bg-white rounded-xl border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6">
            <h3 className="text-xl font-semibold font-['Inter'] leading-7">Move faster</h3>
            <p className="mt-2 text-base font-normal font-['Inter'] leading-normal">
              With the HF Open source stack.
            </p>
            <img
              className=" h-72 mt-4 border-t border-black w-full"
              src="/movefaster.png"
              alt="Move Faster"
            />
          </div>

          {/* Explore All Modalities */}
          <div className="bg-white rounded-xl border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6">
            <h3 className="text-xl font-semibold font-['Inter'] leading-7">Explore all modalities</h3>
            <p className="mt-2 text-base font-normal font-['Inter'] leading-normal">
              Text, image, video, audio or even 3D.
            </p>
            <img
              className="w-full h-6 mt-4 border-t border-black"
              src="https://placehold.co/307x25"
              alt="Modalities"
            />
          </div>

          {/* Build Your Portfolio */}
          <div className="bg-white rounded-xl border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 relative">
            <h3 className="text-xl font-semibold font-['Inter'] leading-7">Build your portfolio</h3>
            <p className="mt-2 text-base font-normal font-['Inter'] leading-normal">
              Share your work with the world and build your ML profile.
            </p>
            <Link
              to="/signup"
              className="absolute top-6 right-6 bg-black text-white px-4 py-1 rounded-full text-base font-normal font-['Inter']"
            >
              Sign Up
            </Link>
            <img
              className="w-full h-72 mt-4 border-t border-black"
              src="/spaces.png"
              alt="Portfolio"
            />
          </div>
        </div>
      </section>

      {/* Community Server’s Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 h-screen">
        <h2 className="text-center text-3xl font-bold font-['Inter'] leading-9 mb-6">Community Server’s</h2>
        <img
          className="w-full h-[500px] mt-4"
          src="/server.png"
          alt="Community Servers"
        />
      </section>

      {/* Decentralization Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <h2 className="text-center text-3xl font-bold font-['Inter'] leading-9">Decentralization Features</h2>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {/* ICP Login & Authentication */}
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400 rounded-[50px] h-80 w-full" />
            <div className="relative p-6">
              <h3 className="text-3xl font-bold font-['Inter'] leading-9 text-center">
                ICP Login & Authentication
              </h3>
              <img
                className="w-52 h-48 mt-4 mx-auto rounded-[35px]"
                src="https://placehold.co/214x191"
                alt="ICP Login"
              />
            </div>
          </div>

          {/* On-chain Ratings & Reviews */}
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400 rounded-[50px] h-80 w-full" />
            <div className="relative p-6">
              <h3 className="text-3xl font-bold font-['Inter'] leading-9 text-center">
                On-chain Ratings & Reviews
              </h3>
              <img
                className="w-52 h-48 mt-4 mx-auto rounded-[35px]"
                src="https://placehold.co/213x191"
                alt="On-chain Ratings"
              />
            </div>
          </div>

          {/* Smart Contract Verification */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-400 rounded-[50px] h-80 w-full" />
            <div className="relative p-6">
              <h3 className="text-3xl font-bold font-['Inter'] leading-9 text-center">
                Smart Contract Verification
              </h3>
              <img
                className="w-52 h-48 mt-4 mx-auto rounded-[35px]"
                src="https://placehold.co/204x191"
                alt="Smart Contract Verification"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Open Source Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-['Inter'] leading-9">Our Open Source</h2>
          <p className="mt-4 text-lg font-normal font-['Inter'] leading-7">
            We are building the foundation of ML tooling with the community.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 mt-10">
          {[
            {
              count: "141,892",
              description: "State-of-the-art ML for PyTorch, TensorFlow, JAX",
            },
            {
              count: "28,229",
              description: "State-of-the-art Diffusion models in PyTorch",
            },
            {
              count: "3,180",
              description: "Safe way to store/distribute neural network weights",
            },
            {
              count: "2,457",
              description: "Python client to interact with the Hugging Face Hub",
            },
            {
              count: "9,521",
              description: "Fast tokenizers optimized for research & production",
            },
            {
              count: "12,786",
              description: "Train transformers LMs with reinforcement learning",
            },
            {
              count: "13,273",
              description: "State-of-the-art ML running directly in your browser",
            },
            {
              count: "15,684",
              description: "Smol library to build great agents in Python",
            },
            {
              count: "17,876",
              description: "Parameter-efficient finetuning for large language models",
            },
            {
              count: "19,869",
              description: "Access & share datasets for any ML tasks",
            },
            {
              count: "9,923",
              description: "Serve language models with TGI optimized toolkit",
            },
            {
              count: "8,529",
              description: "Train PyTorch models with multi-GPU, TPU, mixed precision",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-black shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.10)] p-6"
            >
              <div className="w-2 h-2 rounded-full bg-gray-400 mb-2"></div>
              <div className="w-3 h-3 overflow-hidden mb-2">
                <div className="w-3 h-3 bg-black" />
              </div>
              <p className="text-lg font-normal font-['Inter'] leading-7">{item.count}</p>
              <p className="mt-4 text-base font-normal font-['Inter'] leading-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;