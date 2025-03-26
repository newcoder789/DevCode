import React, { useState } from "react";
import { Upload, Eye, Rocket } from "lucide-react";

const BountyCreation = () => {
  const [errorMessages, setErrorMessages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    reward: "",
    tokenType: "ICP",
    deadline: "",
    enableVoting: false,
    smartContract: false,
  });

  const categories = [
    "Natural Language Processing",
    "Computer Vision",
    "Blockchain AI",
    "Machine Learning",
    "Robotics",
    "Data Analytics",
  ];

  const skillOptions = [
    "Python",
    "TensorFlow",
    "PyTorch",
    "ICP",
    "Motoko",
    "React",
    "Node.js",
    "Computer Vision",
    "NLP",
  ];

  const handleSkillSelect = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = () => {
    const errors = [];
    if (!formData.title) errors.push("Title is required.");
    if (!formData.description) errors.push("Description is required.");
    if (!formData.category) errors.push("Category is required.");
    if (!formData.reward) errors.push("Reward is required.");
    if (!formData.deadline) errors.push("Deadline is required.");

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    console.log("Form submitted:", formData);
    setErrorMessages([]);
  };

  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-['Inter'] leading-9">
            Create AI Bounty
          </h1>
          <p className="text-gray-600 text-lg font-normal font-['Inter'] leading-7">
            Define your AI project requirements and set up bounty rewards
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-8 space-y-6 mt-10">
          {/* Error Messages */}
          {errorMessages.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <ul className="list-disc list-inside">
                {errorMessages.map((error, index) => (
                  <li key={index} className="font-['Inter']">{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-black font-medium font-['Inter']">
              Bounty Title
            </label>
            <input
              type="text"
              placeholder="e.g., AI Model for Speech Recognition"
              className="w-full px-4 py-2 bg-white rounded-lg border border-black focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20 transition-all duration-200 font-['Inter']"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-black font-medium font-['Inter']">
              Description
            </label>
            <textarea
              placeholder="Detailed requirements and specifications..."
              rows={6}
              className="w-full px-4 py-2 bg-white rounded-lg border border-black focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20 transition-all duration-200 font-['Inter']"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Category and Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-black font-medium font-['Inter']">
                Category
              </label>
              <select
                className="w-full px-4 py-2 bg-white rounded-lg border border-black focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20 transition-all duration-200 font-['Inter']"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-black font-medium font-['Inter']">
                Required Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillSelect(skill)}
                    className={`px-3 py-1 rounded-full text-sm font-['Inter'] transition-all duration-200 ${
                      formData.skills.includes(skill)
                        ? "bg-blue-400 text-white"
                        : "bg-gray-200 text-black hover:bg-gray-300"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reward and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-black font-medium font-['Inter']">
                Bounty Reward
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Amount"
                  className="flex-1 px-4 py-2 bg-white rounded-lg border border-black focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20 transition-all duration-200 font-['Inter']"
                  value={formData.reward}
                  onChange={(e) =>
                    setFormData({ ...formData, reward: e.target.value })
                  }
                />
                <select
                  className="w-24 px-2 py-2 bg-white rounded-lg border border-black focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20 transition-all duration-200 font-['Inter']"
                  value={formData.tokenType}
                  onChange={(e) =>
                    setFormData({ ...formData, tokenType: e.target.value })
                  }
                >
                  <option>ICP</option>
                  <option>BTC</option>
                  <option>ETH</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-black font-medium font-['Inter']">
                Submission Deadline
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-white rounded-lg border border-black focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20 transition-all duration-200 font-['Inter']"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-black font-medium font-['Inter']">
              Attachments
            </label>
            <div className="border-2 border-dashed border-black rounded-3xl p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-600" />
              <p className="mt-2 text-gray-600 font-['Inter']">
                Drag and drop files here, or click to select files
              </p>
              <p className="text-sm text-gray-500 font-['Inter']">
                Support for datasets, documentation, and other relevant files
              </p>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-black text-blue-400 focus:ring-blue-400 focus:ring-opacity-20"
                checked={formData.enableVoting}
                onChange={(e) =>
                  setFormData({ ...formData, enableVoting: e.target.checked })
                }
              />
              <span className="text-black font-['Inter']">
                Enable Community Voting
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-black text-blue-400 focus:ring-blue-400 focus:ring-opacity-20"
                checked={formData.smartContract}
                onChange={(e) =>
                  setFormData({ ...formData, smartContract: e.target.checked })
                }
              />
              <span className="text-black font-['Inter']">
                Fund via Smart Contract
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-black">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full border border-black text-black hover:bg-gray-200 transition-all duration-200 flex items-center space-x-2 font-['Inter']"
            >
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-all duration-200 flex items-center space-x-2 font-['Inter']"
            >
              <Rocket className="w-5 h-5" />
              <span>Publish Bounty</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BountyCreation;