"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
const footerData = {
  copyright: {
    year: 2024,
    authors: ["Vedant Chaware", "Siddhesh Shrirame"],
    text: "Any and all opinions listed here are our own and not representative of employers.",
  },
  social: [
    {
      platform: "Twitter",
      username: "the_demon_sid",
      url: "https://twitter.com/the_demon_sid",
    },
    {
      platform: "Twitter",
      username: "Vdcds",
      url: "https://twitter.com/Vedantthere",
    },
  ],
  sourceCode: {
    url: "https://github.com/thedemonsid/blog-website",
  },
} as const;

const Footer = () => {
  return (
    <footer className="relative font-bold bg-background text-xl font-wotfard">
      {/* Subtle top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col justify-start items-start space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <p className="text-muted-foreground text-sm">
              © {footerData.copyright.year}{" "}
              {footerData.copyright.authors.join(" & ")}
            </p>
            <p className="text-muted-foreground/60 text-xs">
              {footerData.copyright.text}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 md:text-right"
          >
            <div className="flex flex-wrap gap-4 md:justify-end">
              {footerData.social.map((social) => (
                <a
                  key={social.username}
                  href={social.url}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{social.username}</span>
                </a>
              ))}
            </div>

            <a
              href={footerData.sourceCode.url}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-sm md:justify-end"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
