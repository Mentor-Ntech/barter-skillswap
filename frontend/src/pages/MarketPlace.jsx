import React, { useState } from 'react';
import { Search, Sliders } from 'lucide-react';
import SkillCard from '../../components/marketplace/SkillCard';
import SkillSearch from '../../components/marketplace/SkillSearch';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 'all',
  });

  // Mock data - replace with actual data from smart contract
  const mockListings = [
    {
      id: 1,
      skillName: 'Web Development',
      provider: '0x1234...5678',
      description: 'Full stack web development with React and Node.js',
      price: '0.5 ETH',
      rating: 4.5,
      reviews: 15,
    },
    // Add more mock listings...
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Skill Marketplace</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          List Your Skill
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <SkillSearch 
              searchTerm={searchTerm} 
              onSearch={setSearchTerm} 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Sliders className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex gap-2">
          <FilterTag 
            label="All Categories" 
            active={filters.category === 'all'} 
            onClick={() => setFilters({ ...filters, category: 'all' })} 
          />
          <FilterTag 
            label="Development" 
            active={filters.category === 'development'} 
            onClick={() => setFilters({ ...filters, category: 'development' })} 
          />
          <FilterTag 
            label="Design" 
            active={filters.category === 'design'} 
            onClick={() => setFilters({ ...filters, category: 'design' })} 
          />
          {/* Add more filter tags */}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing) => (
          <SkillCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            1
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            3
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

const FilterTag = ({ label, active, onClick }) => (
  <button
    className={`px-4 py-2 rounded-full text-sm ${
      active
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Marketplace;