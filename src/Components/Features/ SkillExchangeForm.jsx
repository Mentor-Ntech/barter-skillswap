import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from '../UI/Button';

export function SkillExchangeForm() {
  const [formData, setFormData] = useState({
    skillOffered: '',
    skillRequired: '',
    description: '',
    duration: '',
    terms: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Here you would interact with your smart contract
        // const contract = new ethers.Contract(contractAddress, abi, signer);
        // await contract.createExchange(formData);
        
        alert('Skill exchange proposal created successfully!');
        setFormData({
          skillOffered: '',
          skillRequired: '',
          description: '',
          duration: '',
          terms: ''
        });
      } else {
        alert('Please connect your wallet first!');
      }
    } catch (error) {
      console.error('Error creating exchange:', error);
      alert('Error creating exchange. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Skill Offered
        </label>
        <input
          type="text"
          name="skillOffered"
          value={formData.skillOffered}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Skill Required
        </label>
        <input
          type="text"
          name="skillRequired"
          value={formData.skillRequired}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Duration (in hours)
        </label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Terms and Conditions
        </label>
        <textarea
          name="terms"
          value={formData.terms}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700"
          required
        />
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full"
      >
        Create Skill Exchange
      </Button>
    </form>
  );
}

