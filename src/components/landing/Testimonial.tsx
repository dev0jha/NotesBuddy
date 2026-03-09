"use client";

import React from "react";
import { motion } from "motion/react";
import { StarIcon, QuotesIcon } from "@phosphor-icons/react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  delay?: number;
}

function TestimonialCard({
  name,
  role,
  image,
  content,
  rating,
  delay = 0,
}: TestimonialCardProps) {
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
          {/* Quote Icon */}
          <div className="mb-4">
            <QuotesIcon
              weight="fill"
              className="h-8 w-8 text-[rgba(255,255,255,0.3)]"
            />
          </div>

          {/* Rating */}
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                weight={index < rating ? "fill" : "regular"}
                className={`h-4 w-4 ${
                  index < rating
                    ? "text-amber-400"
                    : "text-[rgba(255,255,255,0.2)]"
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <p className="font-satoshi mb-6 leading-relaxed font-medium text-[rgba(255,255,255,0.8)]">
            &quot;{content}&quot;
          </p>

          {/* Author */}
          <div className="flex items-center gap-3">
            <Image
              src={image}
              alt={name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full border-2 border-[rgba(255,255,255,0.2)]"
            />
            <div>
              <h4 className="font-excon font-bold text-white">{name}</h4>
              <p className="text-sm font-medium text-[rgba(255,255,255,0.5)]">
                {role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const testimonials = [
  {
    name: "Dolly Singh",
    role: "B. Tech CSE (Medicaps University)",
    image: "/avatar/1.jpg",
    content:
      "Notes Buddy transformed my study routine. The concise notes and quick one-shots helped me ace my exams with much less stress.",
    rating: 5,
  },
  {
    name: "Samriddhi",
    role: "Engineering Student",
    image: "/avatar/2.jpg",
    content:
      "The interactive flashcards are game-changing. I've never retained information this well before. Highly recommend!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "IT (IPS University)",
    image: "/avatar/3.jpg",
    content:
      "Finally, a platform that understands how students actually study. The topper notes gave me insights I never had access to.",
    rating: 5,
  },
  {
    name: "Rajat",
    role: "B. Tech CSE (IPS University)",
    image: "/avatar/4.jpg",
    content:
      "The practice quizzes helped me identify my weak areas quickly. My grades improved significantly after using Notes Buddy.",
    rating: 5,
  },
  {
    name: "Aman",
    role: "B. Tech CSE (Medicaps University)",
    image: "/avatar/5.jpg",
    content:
      "Clean, organized, and effective. Notes Buddy made studying enjoyable instead of overwhelming. Best investment for my education.",
    rating: 5,
  },
  {
    name: "Nikhil",
    role: "B. Tech IT (Medicaps University)",
    image: "/avatar/6.jpg",
    content:
      "The AI study assistant is incredible. Instant answers to my questions saved me hours of research. This is the future of learning.",
    rating: 5,
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

export default function Testimonial() {
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
            className="font-excon mx-auto mb-6 max-w-4xl text-center text-4xl leading-tight font-black tracking-tighter text-white md:text-5xl lg:text-6xl"
            variants={titleVariants}
          >
            What Students Say
          </motion.h2>
          <motion.p
            className="font-satoshi mx-auto max-w-3xl text-center text-lg leading-relaxed tracking-tight text-[rgba(255,255,255,0.6)] md:text-xl"
            variants={titleVariants}
          >
            Join thousands of students who have transformed their learning
            experience with Notes Buddy
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
              content={testimonial.content}
              rating={testimonial.rating}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
