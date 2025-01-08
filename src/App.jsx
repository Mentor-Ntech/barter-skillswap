// import { Route, Routes } from "react-router-dom";
// import Layout from "./Component/Layout/Layout";
// import HomeDash from "./Component/Dashboard/HomeDash";
// import Hero from "./Component/Hero/Hero";

// function App() {
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <Layout>
//             <Hero />
//           </Layout>
//         }
//       />

//         <Route path="/homedash" element={<HomeDash />} />
//     </Routes>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WalletButton } from "./components/wallet-button"
import { NFTBadgeCard } from "./components/nft-badge-card"
import { FeatureCard } from "./components/feature-card"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          setActiveSection(section.id)
        }
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: "🔄",
      title: "Skill Exchange",
      description: "Exchange skills and services directly without monetary transactions through our decentralized platform."
    },
    {
      icon: "🛡️",
      title: "Smart Contracts",
      description: "Secure and transparent agreements automatically enforced through blockchain technology."
    },
    {
      icon: "🏆",
      title: "NFT Badges",
      description: "Earn and showcase verifiable proof-of-completion badges as NFTs for your accomplished exchanges."
    },
    {
      icon: "👥",
      title: "DAO Governance",
      description: "Community-driven dispute resolution and platform governance through our DAO."
    },
    {
      icon: "💰",
      title: "Token Integration",
      description: "Optional token-based payments for hybrid transactions and community rewards."
    },
    {
      icon: "📈",
      title: "Reputation System",
      description: "Build and showcase your professional portfolio with a blockchain-based reputation system."
    }
  ]

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
  ]

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                SkillSwap
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                className={`px-4 py-2 rounded-md ${
                  activeSection === "home" ? "text-purple-600" : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => scrollToSection("home")}
              >
                Home
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeSection === "features" ? "text-purple-600" : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => scrollToSection("features")}
              >
                Features
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeSection === "how-it-works" ? "text-purple-600" : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => scrollToSection("how-it-works")}
              >
                How It Works
              </button>
              <WalletButton />
            </div>

            <div className="md:hidden">
              <button
                className="p-2 rounded-md text-gray-600 dark:text-gray-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800"
            >
              <div className="px-4 py-2 space-y-2">
                <button
                  className="w-full text-left px-4 py-2 rounded-md text-gray-600 dark:text-gray-400"
                  onClick={() => scrollToSection("home")}
                >
                  Home
                </button>
                <button
                  className="w-full text-left px-4 py-2 rounded-md text-gray-600 dark:text-gray-400"
                  onClick={() => scrollToSection("features")}
                >
                  Features
                </button>
                <button
                  className="w-full text-left px-4 py-2 rounded-md text-gray-600 dark:text-gray-400"
                  onClick={() => scrollToSection("how-it-works")}
                >
                  How It Works
                </button>
                <div className="py-2">
                  <WalletButton />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
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
              <button className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold">
                Launch App →
              </button>
              <button
                className="px-6 py-3 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold"
                onClick={() => scrollToSection("how-it-works")}
              >
                Learn More ↓
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to exchange skills and build your reputation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* NFT Badges Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Earn NFT Badges</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Showcase your achievements and build your reputation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nftBadges.map((badge, index) => (
              <NFTBadgeCard key={index} {...badge} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Exchanging Skills?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join our community of skilled professionals and start exchanging valuable skills today.
            </p>
            <button className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold">
              Get Started Now →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                SkillSwap
              </span>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                The decentralized platform for skill exchange and professional growth.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    How it Works
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    Features
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    NFT Badges
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    Discord
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    Twitter
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    Blog
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


