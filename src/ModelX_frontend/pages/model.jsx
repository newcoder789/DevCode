import React, { useState } from 'react';
import { Star, Check, ArrowRight, Download, Shield, Zap } from 'lucide-react';

const ModelDetail = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const model = {
    id: 1,
    title: "Advanced NLP Engine Pro",
    description: "Enterprise-grade natural language processing model with support for 50+ languages. Designed for high-performance applications requiring advanced text analysis, sentiment detection, and multilingual capabilities.",
    category: "Natural Language Processing",
    rating: 4.8,
    reviews: 128,
    monthlyPrice: 299,
    yearlyPrice: 2990,
    fullPrice: 9999,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    features: [
      "50+ languages support",
      "99.9% accuracy",
      "Real-time processing",
      "Custom model training",
      "API access",
      "24/7 support"
    ]
  };

  const plans = [
    {
      id: 'monthly',
      title: 'Monthly License',
      price: model.monthlyPrice,
      period: 'per month',
      features: [
        'Full API access',
        'Up to 1M requests/month',
        'Basic support',
        'Monthly updates'
      ]
    },
    {
      id: 'yearly',
      title: 'Annual License',
      price: model.yearlyPrice,
      period: 'per year',
      features: [
        'Everything in Monthly',
        'Up to 5M requests/month',
        'Priority support',
        'Custom integration help'
      ]
    },
    {
      id: 'full',
      title: 'Perpetual License',
      price: model.fullPrice,
      period: 'one-time',
      features: [
        'Everything in Annual',
        'Unlimited requests',
        'White-label rights',
        'Source code access'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Model Info */}
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden">
            <img
              src={model.image}
              alt={model.title}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-white">{model.title}</h1>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                {model.category}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white">{model.rating}</span>
              </div>
              <span className="text-gray-400">({model.reviews} reviews)</span>
            </div>

            <p className="text-gray-400">{model.description}</p>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">Key Features</h3>
              <ul className="grid grid-cols-2 gap-3">
                {model.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-300">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing Plans */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
          <div className="grid gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-gray-800'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <label className="flex items-start space-x-4 cursor-pointer">
                  <input
                    type="radio"
                    name="plan"
                    value={plan.id}
                    checked={selectedPlan === plan.id}
                    onChange={() => setSelectedPlan(plan.id)}
                    className="mt-1.5 h-4 w-4 text-blue-500 focus:ring-blue-400 focus:ring-opacity-20 bg-gray-900 border-gray-700"
                  />
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">${plan.price}</div>
                        <div className="text-sm text-gray-400">{plan.period}</div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-gray-300">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2">
            <span>Purchase Plan</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center space-x-8 py-4 border-t border-gray-700">
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="w-5 h-5" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Download className="w-5 h-5" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Zap className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;