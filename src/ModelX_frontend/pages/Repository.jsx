import React from 'react';

const Repo = () => {
  // Mock data for Marketplace
  const projects = [
    { name: 'DeepSeek-V3', category: 'NLP', developer: 'deepseek-ai', description: 'Advanced NLP model for text generation.', funding: '75%', isOpenSource: true },
    { name: 'Llama-Nemotron', category: 'Vision', developer: 'nvidia', description: 'Vision model for object detection.', funding: '50%', isOpenSource: false },
    { name: 'Reasoning-V1', category: 'Robotics', developer: 'glaiveai', description: 'AI for robotic reasoning.', funding: '90%', isOpenSource: true },
  ];

  // Mock data for Community
  const discussions = [
    { user: 'Alex', message: 'Just submitted my NLP model for review!' },
    { user: 'Sam', message: 'Looking for collaborators on a vision project.' },
  ];

  const leaderboard = [
    { name: 'deepseek-ai', contributions: 120 },
    { name: 'nvidia', contributions: 95 },
    { name: 'glaiveai', contributions: 80 },
  ];

  // Mock data for Funding
  const fundingProjects = [
    { name: 'Vision AI', funding: '60%' },
    { name: 'Robotics AI', funding: '85%' },
  ];

  const transactions = [
    { type: 'Funding', project: 'NLP Model', amount: '5 ETH' },
    { type: 'Purchase', project: 'Vision AI', amount: '2 ETH' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] min-h-screen text-gray-200">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md py-4 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-orbitron text-[#00d4ff] tracking-wide">Decentralized AI</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <input
              type="text"
              placeholder="Search models"
              className="p-2 rounded-lg bg-[#1b263b] text-gray-300 border border-[#00d4ff]/30 focus:outline-none focus:border-[#00d4ff]"
            />
            <a href="#marketplace" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Models</a>
            <a href="#governance" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Datasets</a>
            <a href="#docs" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Docs</a>
            <a href="#pricing" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Pricing</a>
            <button className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Log In</button>
            <button className="bg-[#00d4ff] text-black px-4 py-2 rounded-full font-inter font-medium hover:bg-[#00b4d8] transition duration-300 shadow-[0_0_10px_rgba(0,212,255,0.5)]">
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-[url('https://placehold.co/1200x800')] bg-cover bg-center relative pt-16">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-orbitron text-[#00d4ff] mb-4 leading-tight">
            Build, Monetize, and Govern AI—Without Middlemen
          </h1>
          <p className="text-lg md:text-xl font-inter text-gray-300 mb-8">
            A decentralized hub for AI projects, bounties, and governance powered by smart contracts.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#marketplace"
              className="bg-[#00d4ff] text-black px-6 py-3 rounded-full font-inter font-medium hover:bg-[#00b4d8] transition duration-300 shadow-[0_0_15px_rgba(0,212,255,0.5)]"
            >
              Explore AI Projects
            </a>
            <a
              href="#community"
              className="border border-[#00d4ff] text-[#00d4ff] px-6 py-3 rounded-full font-inter font-medium hover:bg-[#00d4ff]/20 transition duration-300"
            >
              Join the Community
            </a>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron text-[#00d4ff] text-center mb-10">Featured AI Projects</h2>
          <div className="flex justify-between mb-8">
            <input
              type="text"
              placeholder="Search by AI type (e.g., NLP, Vision)"
              className="w-1/3 p-3 rounded-lg bg-[#1b263b] text-gray-300 border border-[#00d4ff]/30 focus:outline-none focus:border-[#00d4ff]"
            />
            <div className="flex space-x-4">
              <select className="p-3 rounded-lg bg-[#1b263b] text-gray-300 border border-[#00d4ff]/30">
                <option>Category</option>
                <option>NLP</option>
                <option>Vision</option>
                <option>Robotics</option>
              </select>
              <select className="p-3 rounded-lg bg-[#1b263b] text-gray-300 border border-[#00d4ff]/30">
                <option>Sort: Trending</option>
                <option>Most Funded</option>
                <option>Recently Added</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-[#1b263b] p-6 rounded-lg border border-[#00d4ff]/30 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition duration-300"
              >
                <h3 className="text-xl font-orbitron text-[#00d4ff] mb-2">{project.name}</h3>
                <p className="text-sm text-gray-400 mb-2">Category: {project.category}</p>
                <p className="text-sm text-gray-400 mb-2">Developer: {project.developer}</p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-400">Funding: {project.funding}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-[#00d4ff] h-2 rounded-full"
                      style={{ width: project.funding }}
                    ></div>
                  </div>
                </div>
                {project.isOpenSource && (
                  <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mb-4">Open-Source</span>
                )}
                {!project.isOpenSource && (
                  <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded-full mb-4">Licensed</span>
                )}
                <a
                  href="#"
                  className="block text-center bg-[#00d4ff] text-black px-4 py-2 rounded-full font-inter font-medium hover:bg-[#00b4d8] transition duration-300"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section id="governance" className="py-20 bg-[#0d1b2a]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron text-[#00d4ff] text-center mb-10">Decentralized AI Governance</h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            Governance decisions (project funding, updates, and rule changes) are made via community votes using smart contracts.
          </p>
          <div className="flex justify-center mb-8">
            <div className="bg-[#1b263b] p-6 rounded-lg border border-[#00d4ff]/30 w-full max-w-md">
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Active Proposal: Funding for NLP Model</h3>
              <p className="text-gray-300 mb-4">Current Votes: 65% Yes</p>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-[#00d4ff] h-4 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <a
              href="#"
              className="bg-[#00d4ff] text-black px-6 py-3 rounded-full font-inter font-medium hover:bg-[#00b4d8] transition duration-300 shadow-[0_0_15px_rgba(0,212,255,0.5)]"
            >
              Participate in AI Governance
            </a>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron text-[#00d4ff] text-center mb-10">Join the AI Developer Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1b263b] p-6 rounded-lg border border-[#00d4ff]/30">
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Live Community Discussions</h3>
              {discussions.map((discussion, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-300">
                    <span className="text-[#00d4ff]">{discussion.user}:</span> {discussion.message}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-[#1b263b] p-6 rounded-lg border border-[#00d4ff]/30">
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Top Contributors</h3>
              {leaderboard.map((contributor, index) => (
                <div key={index} className="flex justify-between text-gray-300 mb-2">
                  <span>{contributor.name}</span>
                  <span>{contributor.contributions} Contributions</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="#"
              className="bg-[#00d4ff] text-black px-6 py-3 rounded-full font-inter font-medium hover:bg-[#00b4d8] transition duration-300 shadow-[0_0_15px_rgba(0,212,255,0.5)]"
            >
              Start Collaborating
            </a>
          </div>
        </div>
      </section>

      {/* Funding Section */}
      <section id="funding" className="py-20 bg-[#0d1b2a]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron text-[#00d4ff] text-center mb-10">Funding & Transparency</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1b263b] p-6 rounded-lg border border-[#00d4ff]/30">
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Current Crowdfunding Projects</h3>
              {fundingProjects.map((project, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-300 mb-2">{project.name}: {project.funding}</p>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-[#00d4ff] h-4 rounded-full"
                      style={{ width: project.funding }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#1b263b] p-6 rounded-lg border border-[#00d4ff]/30">
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Recent Transactions</h3>
              {transactions.map((transaction, index) => (
                <div key={index} className="text-gray-300 mb-2">
                  <p>
                    {transaction.type} - {transaction.project}: {transaction.amount}
                  </p>
                </div>
              ))}
              <div className="mt-4">
                <h4 className="text-sm font-orbitron text-[#00d4ff] mb-2">Smart Contract Preview</h4>
                <pre className="text-sm text-gray-300 bg-black/50 p-4 rounded-lg">
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licensing Section */}
      <section id="licensing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron text-[#00d4ff] text-center mb-10">Open Source & Fair AI Licensing</h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            Choose how you want to share your AI models: open-source, commercial, or hybrid.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1b263b] p-6 rounded-lg border border-[#00d4ff]/30 text-center">
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Open-Source AI</h3>
              <p className="text-gray-300 mb-4">Free for all to use and modify.</p>
            </div>
            <div className="bg-[#1b263b] p-6 rounded-lg border border-[#00d4ff]/30 text-center">
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Commercial AI</h3>
              <p className="text-gray-300 mb-4">Monetize your AI models.</p>
            </div>
            <div className="bg-[#1b263b] p-6 rounded-lg border border-[#00d4ff]/30 text-center">
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Hybrid AI</h3>
              <p className="text-gray-300 mb-4">Limited free access with paid premium features.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="#"
              className="bg-[#00d4ff] text-black px-6 py-3 rounded-full font-inter font-medium hover:bg-[#00b4d8] transition duration-300 shadow-[0_0_15px_rgba(0,212,255,0.5)]"
            >
              Browse Open AI Models
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1b2a] py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#marketplace" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Marketplace</a></li>
                <li><a href="#governance" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Governance</a></li>
                <li><a href="#bounties" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Bounties</a></li>
                <li><a href="#community" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Community</a></li>
                <li><a href="#docs" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Docs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Social Media</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Twitter</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Discord</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">GitHub</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#00d4ff] transition duration-300">Smart Contract Audits</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-orbitron text-[#00d4ff] mb-4">Stats</h3>
              <p className="text-gray-300">Active Developers: 1,234</p>
              <p className="text-gray-300">API Calls: 56,789</p>
              <p className="text-gray-300">Funding Transactions: 987</p>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-8">
            © 2025 Decentralized AI Marketplace. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Repo;