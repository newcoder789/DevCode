import React from "react";
import { Shield, Activity } from "lucide-react";

const GovernancePage = () => {
  const proposals = [
    {
      id: 1,
      title: "Update Voting Weight Algorithm",
      description: "Proposal to modify how voting power is calculated based on token holdings",
      status: "Active",
      votes: { for: 75, against: 25 },
      endDate: "2024-03-20",
    },
    {
      id: 2,
      title: "Increase Minimum Stake Requirement",
      description: "Increase minimum stake required for submitting proposals",
      status: "Pending",
      votes: { for: 60, against: 40 },
      endDate: "2024-03-25",
    },
  ];

  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-['Inter'] leading-9">
            Governance Dashboard
          </h1>
          <p className="text-gray-600 text-lg font-normal font-['Inter'] leading-7">
            Shape the future of our platform through decentralized governance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white rounded-3xl border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold font-['Inter'] leading-7">
                Governance Overview
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 font-normal font-['Inter']">
                  Total Proposals
                </span>
                <span className="text-black font-semibold font-['Inter']">
                  24
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-normal font-['Inter']">
                  Active Proposals
                </span>
                <span className="text-black font-semibold font-['Inter']">
                  3
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-normal font-['Inter']">
                  Participation Rate
                </span>
                <span className="text-black font-semibold font-['Inter']">
                  78%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold font-['Inter'] leading-7">
                Your Stats
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 font-normal font-['Inter']">
                  Voting Power
                </span>
                <span className="text-black font-semibold font-['Inter']">
                  1,234 VP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-normal font-['Inter']">
                  Proposals Created
                </span>
                <span className="text-black font-semibold font-['Inter']">
                  2
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-normal font-['Inter']">
                  Votes Cast
                </span>
                <span className="text-black font-semibold font-['Inter']">
                  15
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <h2 className="text-3xl font-bold font-['Inter'] leading-9">
            Active Proposals
          </h2>
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white rounded-3xl border border-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold font-['Inter'] leading-7">
                    {proposal.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-['Inter'] ${
                      proposal.status === "Active"
                        ? "bg-emerald-400 text-white"
                        : "bg-amber-400 text-white"
                    }`}
                  >
                    {proposal.status}
                  </span>
                </div>
                <p className="text-gray-600 font-normal font-['Inter'] leading-normal">
                  {proposal.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600 font-['Inter']">
                  <span>For: {proposal.votes.for}%</span>
                  <span>Against: {proposal.votes.against}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${proposal.votes.for}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-black">
                <span className="text-sm text-gray-600 font-['Inter']">
                  Ends: {proposal.endDate}
                </span>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-emerald-400 text-white rounded-full font-['Inter'] hover:bg-emerald-500 transition-colors duration-200">
                    Vote For
                  </button>
                  <button className="px-4 py-2 bg-red-400 text-white rounded-full font-['Inter'] hover:bg-red-500 transition-colors duration-200">
                    Vote Against
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default GovernancePage;