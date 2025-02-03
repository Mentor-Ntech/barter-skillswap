import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Star, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Exchange Skills, Grow Together
            </h1>
            <p className="text-xl mb-8">
              A decentralized platform for sharing skills and knowledge. Earn reputation,
              collect badges, and build your professional network.
            </p>
            <Link
              to="/marketplace"
              className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Skills
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Users className="w-12 h-12 text-blue-600" />}
              title="Skill Exchange"
              description="Connect with skilled professionals and exchange valuable knowledge"
            />
            <FeatureCard
              icon={<Star className="w-12 h-12 text-blue-600" />}
              title="Reputation System"
              description="Build trust through our blockchain-based reputation system"
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-blue-600" />}
              title="Secure Transactions"
              description="Smart contract-powered secure skill exchange and dispute resolution"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="List Your Skills"
              description="Create a listing showcasing your expertise"
            />
            <StepCard
              number="2"
              title="Connect"
              description="Find skilled professionals or interested learners"
            />
            <StepCard
              number="3"
              title="Exchange"
              description="Agree on terms and exchange skills securely"
            />
            <StepCard
              number="4"
              title="Earn Reputation"
              description="Build reputation and collect achievement badges"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-6">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
      {number}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;