import { motion } from "framer-motion"
import { FaExchangeAlt, FaShieldAlt, FaMedal, FaUsers } from "react-icons/fa"

export default function Features() {
  const features = [
    {
      icon: <FaExchangeAlt className="h-8 w-8" />,
      title: "Smart Contracts",
      description: "Secure and automated skill exchanges with blockchain verification",
      delay: 0.2,
    },
    {
      icon: <FaMedal className="h-8 w-8" />,
      title: "NFT Badges",
      description: "Earn verifiable achievement tokens for completed exchanges",
      delay: 0.3,
    },
    {
      icon: <FaShieldAlt className="h-8 w-8" />,
      title: "DAO Governance",
      description: "Community-driven decisions and dispute resolution",
      delay: 0.4,
    },
    {
      icon: <FaUsers className="h-8 w-8" />,
      title: "Skill Matching",
      description: "AI-powered talent connection and recommendations",
      delay: 0.5,
    },
  ]

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
            Platform Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to start exchanging skills on the blockchain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
              whileHover={{ translateY: -8 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-blue-500/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />

              <div className="relative h-full p-8 rounded-2xl border border-teal-500/10 backdrop-blur-xl bg-black/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

