import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Sample data for the activity feed
const activityFeed = [
  {
    type: "discussion",
    user: { name: "Alice Smith", avatar: "https://placehold.co/40x40" },
    timestamp: "2h ago",
    content: "Just posted a new discussion on AI ethics. What are your thoughts?",
    metrics: { likes: 45, comments: 12, votes: 0 },
  },
  {
    type: "project",
    user: { name: "Bob Johnson", avatar: "https://placehold.co/40x40" },
    timestamp: "5h ago",
    content: "Updated my project: NeuralNet v2.0 now supports real-time inference!",
    metrics: { likes: 78, comments: 23, votes: 0 },
  },
  {
    type: "governance",
    user: { name: "Charlie Brown", avatar: "https://placehold.co/40x40" },
    timestamp: "1d ago",
    content: "Proposed a new governance decision: Increase funding for AI research.",
    metrics: { likes: 32, comments: 8, votes: 15 },
  },
];

// Sample data for trending topics
const trendingTopics = [
  "AI Ethics",
  "Neural Networks",
  "Decentralized AI",
  "Machine Learning",
  "Governance",
];

// Sample data for active discussions
const activeDiscussions = [
  { title: "Future of AI in Healthcare", comments: 120, likes: 300 },
  { title: "Best Practices for Model Training", comments: 95, likes: 250 },
  { title: "Decentralized AI: Pros and Cons", comments: 80, likes: 200 },
];

// Sample data for newly proposed projects
const newProjects = [
  { title: "AI-Powered Chatbot", proposer: "David Lee", votes: 10 },
  { title: "Image Recognition Model", proposer: "Emma Watson", votes: 8 },
  { title: "Voice Synthesis AI", proposer: "Frank Miller", votes: 5 },
];

const CommunityActivity = () => {
  return (
    <main className="bg-slate-950 min-h-screen text-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <h1 className="text-5xl font-bold font-['Poppins'] leading-tight mb-10">
          Community Activity
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column: Activity Feed */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold font-['Inter'] leading-9 mb-6">
              Activity Feed
            </h2>
            <div className="space-y-6">
              {activityFeed.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white text-black rounded-lg border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 relative"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-base font-normal font-['Inter'] leading-snug">
                        {activity.user.name}
                      </p>
                      <p className="text-sm text-gray-500 font-['Inter']">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                  <p className="text-base font-normal font-['Inter'] leading-normal mb-4">
                    {activity.content}
                  </p>
                  <div className="flex items-center space-x-4 text-sm font-normal font-['Inter'] text-gray-600">
                    <span>👍 {activity.metrics.likes}</span>
                    <span>💬 {activity.metrics.comments}</span>
                    {activity.type === "governance" && (
                      <span>🗳️ {activity.metrics.votes}</span>
                    )}
                  </div>
                  {activity.type === "governance" && (
                    <Link
                      to="/vote"
                      className="absolute right-4 top-4 bg-blue-400 text-white text-sm font-normal font-['Inter'] leading-none px-4 py-1 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black hover:bg-blue-500 transition-colors"
                    >
                      Vote
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar: Trending Topics, Active Discussions, New Projects */}
          <div className="space-y-8">
            {/* Trending Topics */}
            <div>
              <h2 className="text-2xl font-bold font-['Inter'] leading-9 mb-6">
                Trending Topics
              </h2>
              <div className="flex space-x-3 overflow-x-auto pb-4">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-blue-400 text-white text-sm font-normal font-['Inter'] leading-none px-4 py-2 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black hover:bg-blue-500 transition-colors whitespace-nowrap"
                  >
                    {topic}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Active Discussions */}
            <div>
              <h2 className="text-2xl font-bold font-['Inter'] leading-9 mb-6">
                Active Discussions
              </h2>
              <div className="space-y-4">
                {activeDiscussions.map((discussion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white text-black rounded-lg border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4"
                  >
                    <p className="text-base font-normal font-['IBM_Plex_Mono'] leading-snug">
                      {discussion.title}
                    </p>
                    <div className="flex items-center mt-2 text-sm font-normal font-['Inter'] text-gray-600">
                      <span>💬 {discussion.comments}</span>
                      <span className="mx-2">•</span>
                      <span>👍 {discussion.likes}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newly Proposed Projects */}
            <div>
              <h2 className="text-2xl font-bold font-['Inter'] leading-9 mb-6">
                Newly Proposed Projects
              </h2>
              <div className="space-y-4">
                {newProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white text-black rounded-lg border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4 relative"
                  >
                    <p className="text-base font-normal font-['IBM_Plex_Mono'] leading-snug">
                      {project.title}
                    </p>
                    <div className="flex items-center mt-2 text-sm font-normal font-['Inter'] text-gray-600">
                      <span>Proposer: {project.proposer}</span>
                      <span className="mx-2">•</span>
                      <span>🗳️ {project.votes}</span>
                    </div>
                    <Link
                      to="/vote"
                      className="absolute right-4 top-4 bg-emerald-400 text-white text-sm font-normal font-['Inter'] leading-none px-4 py-1 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black hover:bg-emerald-500 transition-colors"
                    >
                      Vote
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CommunityActivity;