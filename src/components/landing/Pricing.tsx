"use client";

import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { TIER_CONFIG, getAllTierConfigs } from "@/dal/premium/types";
import { PremiumTier } from "@prisma/client";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import Image from "next/image";

const originalPrice = [
  {
    tier: "TIER_1",
    price: 199,
  },
  {
    tier: "TIER_2",
    price: 299,
  },
  {
    tier: "TIER_3",
    price: 399,
  },
];

function PricingCard({
  tier,
  highlight,
}: {
  tier: PremiumTier;
  highlight?: boolean;
}) {
  const config = TIER_CONFIG[tier];
  const discounted = config.price;
  const label = config.title;
  const tag = config.title;
  const features = config.features;

  return (
    <motion.div
      className={`relative flex flex-col rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] p-8 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.05)] ${
        highlight ? "z-10 scale-105 border-[rgba(255,255,255,0.2)]" : ""
      }`}
    >
      {/* Tag */}
      <div className="absolute top-6 right-6 rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] px-3 py-1 text-xs font-bold text-white">
        {tag}
      </div>
      {/* Price */}
      <div className="mb-2 flex items-end gap-2">
        <span className="font-excon text-4xl font-black text-white">
          ₹{discounted}/-
        </span>
      </div>
      <div className="mb-2 text-sm text-[rgba(255,255,255,0.5)]">
        Original Price:{" "}
        <span className="line-through">
          ₹{originalPrice.find((p) => p.tier === tier)?.price}/-
        </span>
      </div>
      {/* Title & Desc */}
      <div className="mb-2 text-lg font-bold text-white">{label}</div>
      <div className="mb-2 text-sm text-[rgba(255,255,255,0.6)]">
        {config.description}
      </div>
      <div className="mb-4 text-xs text-[rgba(255,255,255,0.5)]">
        Valid for{" "}
        <span className="font-bold text-white">{config.duration} Days</span> for{" "}
        <span className="font-bold text-white">1 Semester</span> from the day
        you purchase.
      </div>
      {/* Features */}
      <ul className="mb-6 flex flex-col gap-2">
        {config.features.map((feature, idx) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.7)]"
          >
            {features[idx] ? (
              <CheckCircleIcon
                className="h-5 w-5 text-emerald-400"
                weight="duotone"
              />
            ) : (
              <XCircleIcon
                className="h-5 w-5 text-[rgba(255,255,255,0.3)]"
                weight="duotone"
              />
            )}
            <span className={features[idx] ? "" : "line-through opacity-60"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Link className="mt-auto w-full" href={`/premium?tier=${tier}`}>
        <Button
          className="w-full rounded-lg border border-[rgba(255,255,255,0.2)] bg-white px-6 py-2 font-bold text-black transition-all duration-200 hover:bg-[rgba(255,255,255,0.9)]"
          data-umami-event={`landing-pricing-card-buy-${tier.toLowerCase()}`}
        >
          Buy Now
        </Button>
      </Link>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-20 lg:py-32">
      {/* Top border line */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
      <div className="relative z-10 container mx-auto">
        <Image
          src="/doodles/idea.svg"
          alt="Hero"
          width={50}
          height={50}
          className="absolute -top-16 left-0 size-16 opacity-60 md:-top-20 md:size-28"
        />
        <Image
          src="/doodles/exmark.svg"
          alt="Hero"
          width={50}
          height={50}
          className="absolute -top-14 right-0 size-16 opacity-60 md:-top-16 md:size-28"
        />
        <div className="mb-16 text-center md:mb-20">
          <h2 className="font-excon mx-auto mb-6 max-w-4xl text-center text-4xl leading-tight font-black tracking-tighter text-white md:text-5xl lg:text-6xl">
            Why Study the Hard Way?
          </h2>
          <p className="font-satoshi mx-auto max-w-3xl text-center text-lg leading-relaxed tracking-tight text-[rgba(255,255,255,0.6)] md:text-xl">
            Unlock the perfect guide to your preparation journey.
          </p>
        </div>
        <div className="mx-4 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {getAllTierConfigs().map((tier) => (
            <PricingCard
              key={tier.tier}
              tier={tier.tier}
              highlight={tier.tier === "TIER_2"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
