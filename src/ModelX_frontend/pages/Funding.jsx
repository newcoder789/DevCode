import React from "react";
import { Users, TrendingUp } from "lucide-react";

const FundingPage = () => {
  const projects = [
    {
      id: 1,
      title: "Medical Imaging AI",
      description: "Advanced AI system for medical image analysis and diagnosis",
      target: 50000,
      raised: 35000,
      contributors: 128,
      daysLeft: 15,
    },
    {
      id: 2,
      title: "Climate Prediction Model",
      description: "AI-powered climate change prediction and analysis system",
      target: 75000,
      raised: 25000,
      contributors: 89,
      daysLeft: 21,
    },
  ];

  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-['Inter'] leading-9">
            Fund AI Innovation
          </h1>
          <p className="text-gray-600 text-lg font-normal font-['Inter'] leading-7">
            Support groundbreaking AI projects and shape the future of technology
          </p>
        </div>

        <div className="grid gap-6 mt-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 space-y-4"
            >
              <div className="space-y-3">
                <h2 className="text-xl font-semibold font-['Inter'] leading-7">
                  {project.title}
                </h2>
                <p className="text-gray-600 font-normal font-['Inter'] leading-normal">
                  {project.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm font-['Inter']">
                  <span className="text-gray-600">
                    Raised: <span className="text-blue-400">{project.raised.toLocaleString()} ICP</span>
                  </span>
                  <span className="text-gray-600">
                    Target: <span className="text-blue-400">{project.target.toLocaleString()} ICP</span>
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(project.raised / project.target) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-4 text-sm text-gray-600 font-['Inter']">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span>{project.contributors}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <span>{project.daysLeft} days left</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-400 text-white rounded-full font-['Inter'] hover:bg-blue-500 transition-colors duration-200">
                  Fund Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FundingPage;