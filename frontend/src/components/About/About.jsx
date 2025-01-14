import React from 'react';

export default function About() {
  return (
    <div className="py-20 px-8 grid grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
      <div className="space-y-6">
        <h2 className="text-5xl font-bold tracking-tight">DISCOVER SKILLSWAP</h2>
        <p className="text-gray-600 leading-relaxed">
          SkillSwap is a revolutionary platform that facilitates the exchange of knowledge 
          and skills without the financial burden. Whether it's coding, digital marketing, 
          or yoga, SkillSwap offers a collaborative space to share expertise and learn 
          from others, making education accessible and enjoyable for all.
        </p>
      </div>
      <div className="flex justify-center">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOZklpqvlEW0a3JwYKVJ6NGImtINbm-V5cow&s" 
          alt="SkillSwap Concept" 
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
}