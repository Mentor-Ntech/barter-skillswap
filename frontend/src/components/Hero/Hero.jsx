import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1509803874385-db7c23652552?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdWR8ZW58MHx8MHx8fDA%3D')`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 space-y-6">
        <h2 className="text-sm uppercase tracking-wider text-white">
          WELCOME TO SKILLSWAP
        </h2>
        <h1 className="text-8xl font-bold text-white tracking-tight">
          SKILL-SWAP
        </h1>
        <p className="text-2xl text-white">Empower Yourself with SkillSwap</p>

        <Link to="/service">
          <button className="mt-8 px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors">
            Start Learning
          </button>
        </Link>
      </div>
    </div>
  );
}
