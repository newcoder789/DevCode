import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, GitBranch, Users, Mail, Link as LinkIcon } from 'lucide-react';

function Profile() {
  const { username } = useParams();

  // Mock user data - in a real app, this would come from an API
  const user = {
    name: 'Sarah Chen',
    username: 'sarahchen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    bio: 'Senior ML Engineer | Contributing to open-source AI projects | Building the future of machine learning',
    location: 'San Francisco, CA',
    email: 'sarah@example.com',
    website: 'https://sarahchen.dev',
    joinDate: 'March 2024',
    followers: 1234,
    following: 567,
    contributions: 890
  };

  const models = [
    {
      id: 1,
      name: 'GPT-4 Classifier',
      description: 'High-performance text classification model with multi-language support.',
      stars: 1234,
      forks: 234
    },
    {
      id: 2,
      name: 'ImageTransformer V2',
      description: 'State-of-the-art image transformation model with advanced feature detection.',
      stars: 987,
      forks: 123
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <h1 className="mt-4 text-xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">@{user.username}</p>
              </div>

              <p className="mt-4 text-gray-600">{user.bio}</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{user.followers} followers · {user.following} following</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href={`mailto:${user.email}`} className="hover:text-indigo-600">
                    {user.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <LinkIcon className="h-5 w-5 mr-2" />
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                    {user.website}
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Follow
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center">
                  <Star className="h-8 w-8 text-yellow-400 mx-auto" />
                  <p className="mt-2 text-2xl font-bold text-gray-900">{user.contributions}</p>
                  <p className="text-gray-600">Contributions</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center">
                  <GitBranch className="h-8 w-8 text-indigo-600 mx-auto" />
                  <p className="mt-2 text-2xl font-bold text-gray-900">45</p>
                  <p className="text-gray-600">Models</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto" />
                  <p className="mt-2 text-2xl font-bold text-gray-900">12</p>
                  <p className="text-gray-600">Teams</p>
                </div>
              </div>
            </div>

            {/* Models */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Models</h2>
              <div className="space-y-6">
                {models.map((model) => (
                  <div key={model.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                      {model.name}
                    </h3>
                    <p className="mt-2 text-gray-600">{model.description}</p>
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {model.stars}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <GitBranch className="h-4 w-4 text-gray-400 mr-1" />
                        {model.forks}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;