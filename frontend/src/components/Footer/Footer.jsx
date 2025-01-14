import React from 'react';

export default function Contact() {
  return (
    <div className="bg-[#5EBFB7] py-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-black">GET IN TOUCH</h2>
          <p className="text-black">Email: SkillSwapIndia@Gmail.com</p>
          <div className="flex gap-4">
            <a href="#" className="text-black hover:opacity-75">Facebook</a>
            <a href="#" className="text-black hover:opacity-75">Twitter</a>
            <a href="#" className="text-black hover:opacity-75">Instagram</a>
            <a href="#" className="text-black hover:opacity-75">YouTube</a>
          </div>
          <p className="text-sm text-black">© 2024 SkillSwap. All rights reserved.</p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-black mb-2">First Name </label>
              <input 
                type="text" 
                className="w-full p-2 border border-black bg-transparent"
                required 
              />
            </div>
            <div>
              <label className="block text-black mb-2">Last Name *</label>
              <input 
                type="text" 
                className="w-full p-2 border border-black bg-transparent"
                required 
              />
            </div>
          </div>
          <div>
            <label className="block text-black mb-2">Email *</label>
            <input 
              type="email" 
              className="w-full p-2 border border-black bg-transparent"
              required 
            />
          </div>
          <div>
            <label className="block text-black mb-2">Subject</label>
            <input 
              type="text" 
              className="w-full p-2 border border-black bg-transparent"
            />
          </div>
          <div>
            <label className="block text-black mb-2">Message</label>
            <textarea 
              className="w-full p-2 border border-black bg-transparent h-32"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

