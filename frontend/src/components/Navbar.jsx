import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiMenuAlt4, HiX } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import useSignerOrProvider from "../hooks/UseSignerOrProvider"


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {signer} = useSignerOrProvider();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() =>{
    if(signer){
        navigate("/dashboard")
    }
  },[signer,navigate])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/50 backdrop-blur-lg border-b border-teal-500/10" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-teal-300 to-blue-500 bg-clip-text text-transparent"
            >
              SkillSwap
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavLinks />
              <appkit-button/>
              {/* <button>hello</button> */}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-teal-300 hover:text-teal-200"
            >
              <HiMenuAlt4 className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-lg"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-3/4 bg-gray-900/95 backdrop-blur-xl border-l border-teal-500/10"
            >
              <div className="p-6">
                <div className="flex justify-end mb-8">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-teal-300 hover:text-teal-200"
                  >
                    <HiX className="h-6 w-6" />
                  </motion.button>
                </div>
                <div className="flex flex-col gap-6">
                  <NavLinks mobile />
                  <appkit-button />
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLinks({ mobile }) {
  const links = ["Features", "How It Works", "Community"]
  const baseClasses = "relative font-medium transition-colors"
  const mobileClasses = "text-lg text-teal-300 hover:text-teal-200"
  const desktopClasses = "text-gray-300 hover:text-teal-300"

  return links.map((link) => (
    <motion.a
      key={link}
      href={`#${link.toLowerCase().replace(" ", "-")}`}
      whileHover={mobile ? {} : { y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
    >
      {link}
    </motion.a>
  ))
}


