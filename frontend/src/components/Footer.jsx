import { motion } from "framer-motion"
import { FaDiscord, FaGithub, FaMedium, FaTwitter } from "react-icons/fa"

export default function Footer() {
  const socialLinks = [
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaDiscord, href: "#", label: "Discord" },
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaMedium, href: "#", label: "Medium" },
  ]

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "How it Works", "Pricing", "FAQ"],
    },
    {
      title: "Resources",
      links: ["Documentation", "API Reference", "Platform Status", "Partners"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Contact"],
    },
  ]

  return (
    <footer className="relative mt-32 border-t border-teal-500/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                SkillSwap
              </div>
              <p className="text-gray-400 max-w-xs">
                Decentralized skill exchange platform powered by blockchain technology.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ y: -2 }}
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon className="h-6 w-6" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="col-span-1"
            >
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.1 }}
                  >
                    <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-teal-500/10 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-center"
          >
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm">
                Terms of Service
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

