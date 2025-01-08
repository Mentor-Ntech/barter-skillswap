import React from 'react';
import { Layout } from './components/Layout/Layout';
import { Button } from './components/UI/Button';
import { NFTBadgeCard } from './components/Features/NFTBadgeCard';
// import { FeatureCard } from './components/Features/FeatureCard';
import {FeatureCard} from './components/Features/FeatureCard'
import { SkillExchangeForm } from './components/Features/SkillExchangeForm';

function App() {
    const features = [
        {
          icon: "🔄",
          title: "Skill Exchange",
          description: "Exchange skills directly through smart contracts",
          skills: []
        },
        {
          icon: "🛡️",
          title: "Secure Transactions",
          description: "Blockchain-powered security for all exchanges",
          skills: []
        },
        {
          icon: "🏆",
          title: "NFT Badges",
          description: "Earn verifiable proof of your skills",
          skills: []
        },
        {
          icon: "👥",
          title: "DAO Governance",
          description: "Community-driven platform decisions",
          skills: []
        },
        {
          icon: "💰",
          title: "Token Integration",
          description: "Optional token-based payments",
          skills: []
        },
        {
          icon: "📈",
          title: "Reputation System",
          description: "Build your professional portfolio",
          skills: []
        }
      ];
  const nftBadges = [
    {
      title: "Web Development Master",
      description: "Completed 10 successful web development exchanges",
      skills: ["React", "JavaScript", "Web3"],
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Design Expert",
      description: "Recognized for exceptional UI/UX design skills",
      skills: ["UI Design", "UX Research", "Figma"],
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Blockchain Innovator",
      description: "Contributing to Web3 projects and DApps",
      skills: ["Solidity", "Web3.js", "Smart Contracts"],
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            The Future of
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              {" "}Skill Exchange{" "}
            </span>
            is Here
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Exchange skills and services directly on the blockchain. Build your reputation with
            NFT badges and join a thriving decentralized community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Launch App
            </Button>
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Exchange Section */}
      <section id="exchange" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Create a Skill Exchange</h2>
          <SkillExchangeForm />
        </div>
      </section>

      {/* NFT Badges Section */}
      <section id="badges" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Earn NFT Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nftBadges.map((badge, index) => (
              <NFTBadgeCard key={index} {...badge} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default App;