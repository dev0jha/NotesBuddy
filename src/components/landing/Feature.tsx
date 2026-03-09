"use client";

import {
  BookOpenIcon,
  LightningIcon,
  BrainIcon,
  ClockIcon,
  MedalIcon,
  ChatCenteredDotsIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import React from "react";
import Image from "next/image";

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
          <p className="font-satoshi leading-relaxed text-[rgba(255,255,255,0.6)]">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const features = [
  {
    icon: <BookOpenIcon weight="duotone" className="h-6 w-6" />,
    title: "Comprehensive Notes",
    description:
      "Concise, well-structured notes that simplify complex concepts for better understanding.",
  },
  {
    icon: <LightningIcon weight="duotone" className="h-6 w-6" />,
    title: "Quick One-Shots",
    description:
      "Rapid review materials for last-minute preparation and key concept reinforcement.",
  },
  {
    icon: <BrainIcon weight="duotone" className="h-6 w-6" />,
    title: "Interactive Flashcards",
    description:
      "Effective memory tools to master terminology and key concepts through active recall.",
  },
  {
    icon: <ClockIcon weight="duotone" className="h-6 w-6" />,
    title: "Practice Quizzes",
    description:
      "Self-assessment tools to test your knowledge and identify areas for improvement.",
  },
  {
    icon: <MedalIcon weight="duotone" className="h-6 w-6" />,
    title: "Topper Notes",
    description:
      "Access handwritten notes from top-performing students to understand winning strategies.",
  },
  {
    icon: <ChatCenteredDotsIcon weight="duotone" className="h-6 w-6" />,
    title: "AI Study Assistant",
    description:
      "Get instant answers to your questions with our intelligent AI chatbot (coming soon).",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Features() {
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
          <h2 className="font-excon relative mx-auto mb-6 max-w-4xl text-center text-4xl leading-tight font-black tracking-tighter text-white md:text-5xl lg:text-6xl">
            Features of Notes Buddy
            <Image
              width={50}
              height={50}
              src="/doodles/quiz.svg"
              alt="Notes Buddy"
              className="absolute -top-16 left-0 size-16 opacity-60 md:-top-20 md:size-28"
            />
          </h2>
          <p className="font-satoshi mx-auto max-w-3xl text-center text-lg leading-relaxed tracking-tight text-[rgba(255,255,255,0.6)] md:text-xl">
            Everything you need to excel in your studies, all in one place
          </p>
        </motion.div>
        <motion.div
          className="mx-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
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
