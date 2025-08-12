import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const themeColor = "#4F46E5";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-6"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-lg font-bold" style={{ color: themeColor }}>
          PaperMind
        </div>

        <div className="flex gap-6 text-sm font-medium">
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:opacity-80"
            style={{ color: themeColor }}
          >
            Home
          </Link>
          <Link
            to="features"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:opacity-80"
            style={{ color: themeColor }}
          >
            Features
          </Link>
          <Link
            to="pricing"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:opacity-80"
            style={{ color: themeColor }}
          >
            Pricing
          </Link>
          <NavLink
            to="/contact"
            className="hover:opacity-80"
            style={{ color: themeColor }}
          >
            Contact
          </NavLink>
        </div>
        
        <p className="text-xs" style={{ color: themeColor }}>
          © {new Date().getFullYear()} AI Paper Summarizer. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
