import { motion } from "framer-motion"
import { FaWallet, FaUserCircle, FaHandshake, FaMedal } from "react-icons/fa"

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaWallet className="h-8 w-8" />,
      title: "Connect Wallet",
      description: "Link your Web3 wallet to start your journey",
      delay: 0.2,
    },
    {
      icon: <FaUserCircle className="h-8 w-8" />,
      title: "Create Profile",
      description: "List your skills and what you're looking to learn",
      delay: 0.3,
    },
    {
      icon: <FaHandshake className="h-8 w-8" />,
      title: "Match & Exchange",
      description: "Find compatible users and create smart contracts",
      delay: 0.4,
    },
    {
      icon: <FaMedal className="h-8 w-8" />,
      title: "Earn Badges",
      description: "Complete exchanges to earn NFT badges",
      delay: 0.5,
    },
  ]

  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Get started with SkillSwap in four simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay }}
              whileHover={{ translateY: -8 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-blue-500/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />

              <div className="relative h-full p-8 rounded-2xl border border-teal-500/10 backdrop-blur-xl bg-black/30">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                <div className="absolute top-6 right-8 text-5xl font-bold text-teal-400/10">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

