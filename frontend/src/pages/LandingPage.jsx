import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import HowItWorks from "../components/HowItWorks"
import ParticleBackground from "../components/ParticleBackground"
import Footer from "../components/Footer"

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
          <ParticleBackground />
          <Navbar />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Hero />
            <Features />
            <HowItWorks />
            <Footer />
          </motion.div>
        </div>
      )
}

export default LandingPage