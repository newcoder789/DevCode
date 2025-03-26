import React from 'react';
import { MessageSquare, Users, Sparkles, ArrowRight } from 'lucide-react';

function Community() {
  const discussions = [
    {
      id: 1,
      title: 'Best practices for fine-tuning large language models',
      author: 'Sarah Chen',
      replies: 23,
      views: 1234,
      category: 'Technical Discussion'
    },
    {
      id: 2,
      title: 'Introducing our new community guidelines',
      author: 'Community Team',
      replies: 45,
      views: 2345,
      category: 'Announcements'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Open Source NLP Toolkit',
      description: 'Building a comprehensive toolkit for natural language processing tasks.',
      contributors: 12,
      category: 'In Progress'
    },
    {
      id: 2,
      title: 'Computer Vision Framework',
      description: 'Developing a modern framework for computer vision applications.',
      contributors: 8,
      category: 'Looking for Contributors'
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
          <p className="mt-4 text-xl text-gray-600">Connect, collaborate, and grow with fellow developers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">10,000+</p>
                <p className="text-gray-600">Active Members</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">5,000+</p>
                <p className="text-gray-600">Discussion Threads</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-gray-600">Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Discussions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Discussions</h2>
            <button className="flex items-center text-indigo-600 hover:text-indigo-700">
              View all
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm divide-y">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                      {discussion.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Started by {discussion.author} · {discussion.replies} replies · {discussion.views} views
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {discussion.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
            <button className="flex items-center text-indigo-600 hover:text-indigo-700">
              View all
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                    <p className="mt-2 text-gray-600">{project.description}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {project.contributors} contributors
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;