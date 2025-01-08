"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, Code2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background text-foreground px-4 py-20 font-wotfard">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-16"
      >
        {/* Header */}
        <header className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 text-sm"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/30 backdrop-blur-sm border border-border">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="font-mono text-muted-foreground">
                <span className="text-primary">~/</span>about-us
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-muted via-inherit to-primary bg-clip-text text-primary/90 dark:text-secondary-foreground"
          >
            About Us
          </motion.h1>
        </header>

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-invert max-w-4xl"
        >
          <div className="text-lg text-primary dark:text-secondary-foreground/60 leading-relaxed tracking-wide space-y-6 ">
            <p>
              We are childhood friends from a town in Maharashtra. It&apos;s
              been since almost childhood that we love to explore the subject in
              our hands. Life took turns and sways, and after finishing our
              secondary and higher secondary educations, we landed in the same
              subject for our degrees, CSE!
            </p>
            <p>
              Now we began to explore the subject and soon realized that
              there&apos;s seriously a major missing in people passionately
              expressing what they learn. This blog wasn&apos;t in plan even
              after that. But one day, I was watching a{" "}
              <a
                href="https://www.twitch.tv/theprimeagen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 inline-flex items-center"
              >
                Prime <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>{" "}
              video where he was reacting to some problems with HTML or
              something.
            </p>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-8 prose prose-invert max-w-4xl"
        >
          <Card className="bg-background border-border/50">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-3xl font-bold text-primary/90 dark:text-secondary-foreground">
                <Code2 className="w-6 h-6" />
                What we Aim to bring
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-primary/90 dark:text-secondary-foreground/60 leading-relaxed tracking-wide">
                {[
                  "Fun nitty-gritty of stuff",
                  "Understandable language",
                  "Concise guides to interesting projects",
                  "Weekend project ideas",
                  "Tools to make your PC's look and feel better",
                  "Things to make your code cleaner",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-background border-border/50">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-2 text-2xl font-bold text-primary/90 dark:text-secondary-foreground">
                <Terminal className="w-6 h-6" />
                Recommendations
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary dark:text-secondary-foreground/60">
                    Intersting CS Content Creators
                  </h3>
                  <div className="flex gap-4 flex-wrap text-primary dark:text-secondary-foreground/60">
                    {[
                      ["Josh Comeau", "https://www.joshwcomeau.com/"],
                      ["Theo : t3.gg", "https://www.youtube.com/@t3dotgg"],
                      ["Primeagen", "https://www.twitch.tv/theprimeagen"],
                      [
                        "Arpit Bhayani",
                        "https://www.youtube.com/@AsliEngineering",
                      ],

                      ["Wesley", "https://www.youtube.com/@ByteGrad"],
                    ].map(([name, url], i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-primary/60"
                      >
                        {name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-primary dark:text-secondary-foreground/60">
                    Our Setup
                  </h3>
                  <div className="grid gap-3 text-primary dark:text-secondary-foreground/60">
                    <p>Editor: VS Code</p>
                    <p>
                      Terminal: Warp Terminal (Vdcds), Alacritty (the_demon_sid)
                    </p>
                    <p>
                      Theme: Catppuccin, Andromeda,{" "}
                      <span className="text-foreground">Github Theme</span>(the_demon_sid),{" "}
                      <a
                        href="https://chai-desktop.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary dark:text-secondary-foreground hover:text-muted inline-flex items-center"
                      >
                        Chai theme <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Our Machines</h3>
                  <div className="space-y-2">
                    <a
                      href="https://www.asus.com/Laptops/For-Gaming/TUF-Gaming/ASUS-TUF-Gaming-F15-2022/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-primary hover:text-muted-foreground inline-flex items-center"
                    >
                      Asus TUF F15 (the_demon_sid){" "}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <a
                      href="https://www.asus.com/Laptops/For-Home/Vivobook/Vivobook-K14-OLED-K3402Z/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-primary hover:text-muted-foreground inline-flex items-center"
                    >
                      Asus Vivobook K14 OLED (Vdcds){" "}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </main>
  );
}
