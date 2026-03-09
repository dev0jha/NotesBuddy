"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircleIcon,
  BrainIcon,
  LightningIcon,
} from "@phosphor-icons/react";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

function AnimatedTextCycle({
  words,
  interval = 3000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  const containerVariants = {
    hidden: {
      y: -20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentIndex}
          className={`inline-block font-light ${className}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      className="group relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] p-8 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.05)]">
        <div className="relative z-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-white">
            {icon}
          </div>

          <h3 className="font-excon mb-3 text-xl font-semibold text-white">
            {title}
          </h3>

          <p className="font-satoshi mt-4 text-lg leading-relaxed text-[rgba(255,255,255,0.6)]">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const features = [
    {
      icon: (
        <CheckCircleIcon weight="duotone" className="text-primary h-6 w-6" />
      ),
      title: "Clarity Over Complexity",
      description:
        "Simplifies concepts for deeper and better understanding. We break down complex topics into digestible chunks.",
    },
    {
      icon: <BrainIcon weight="duotone" className="text-primary h-6 w-6" />,
      title: "Answers at Your Fingertips",
      description:
        "Our AI answers your questions instantly, helping you learn faster. Get immediate support whenever you need clarification.",
    },
    {
      icon: <LightningIcon weight="duotone" className="text-primary h-6 w-6" />,
      title: "Fast and Efficient Learning",
      description:
        "Accelerates learning with quick, focused resources. Study smarter with optimized content and streamlined processes.",
    },
  ];

  const animatedWords = ["smarter", "faster", "better", "easier"];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0" />
      {/* Top border line */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

      <div className="relative z-10 container mx-auto">
        <motion.div
          className="mb-16 text-center md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="mx-auto mb-6 max-w-4xl text-center text-4xl leading-tight tracking-tighter md:text-5xl lg:text-6xl"
            variants={titleVariants}
          >
            <span className="font-excon font-black text-white">Learn </span>
            <span className="font-ranade relative">
              <AnimatedTextCycle
                words={animatedWords}
                interval={3000}
                className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent"
              />
            </span>
            <span className="font-excon font-black text-white">
              {" "}
              with Notes Buddy
            </span>
          </motion.h2>

          <motion.p
            className="font-satoshi mx-auto max-w-3xl text-center text-lg leading-relaxed tracking-tight text-[rgba(255,255,255,0.6)] md:text-xl"
            variants={titleVariants}
          >
            Transform your learning experience with our innovative platform
            designed for modern students. Preparing for exams is challenging
            enough - let us simplify the process.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
