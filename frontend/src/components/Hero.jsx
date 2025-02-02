import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Glowing orb backgrounds */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-500 mb-4">
              Skill Exchange
            </span>
            <br />
            <span className="inline-block text-white">Reimagined</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            The future of skill bartering powered by blockchain technology. Exchange expertise, earn NFT badges, and
            build your reputation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl font-semibold text-black overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-blue-400 transition-transform duration-300 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                Start Swapping
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl font-semibold text-teal-300 border border-teal-500/20 backdrop-blur-sm hover:bg-teal-500/10 transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Floating NFT Badges */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
          <motion.div
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-32 h-32 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 p-1"
          >
            <div className="w-full h-full rounded-xl bg-black/50 backdrop-blur-xl p-4 flex items-center justify-center">
              <span className="text-4xl">🎨</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-1/3 right-10">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            className="w-32 h-32 rounded-xl bg-gradient-to-br from-blue-400 to-teal-500 p-1"
          >
            <div className="w-full h-full rounded-xl bg-black/50 backdrop-blur-xl p-4 flex items-center justify-center">
              <span className="text-4xl">💻</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

