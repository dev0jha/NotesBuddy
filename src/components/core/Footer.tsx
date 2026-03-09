import React from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";

const footerItems = [
  {
    label: "Contact Us",
    href: "/contact",
  },
  {
    label: "Shipping & Delivery",
    href: "/shipping",
  },
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Cancellation & Refund Policy",
    href: "/refund",
  },
  {
    label: "Terms of Conditions",
    href: "/terms",
  },
];

export default function Footer() {
  return (
    <footer className="mt-10 mb-5 flex w-full flex-col items-center justify-center gap-6">
      {/* Top border line */}
      <div className="h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
      <div className="container mx-4 flex max-w-4xl flex-row flex-wrap items-center justify-center gap-4 md:mx-2">
        {footerItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-3 py-1 text-sm font-medium text-[rgba(255,255,255,0.7)] transition-colors hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)]"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="text-sm text-[rgba(255,255,255,0.5)]">
        © 2025 Notes Buddy. All rights reserved.
      </div>
      <div className="font-excon relative text-5xl font-black tracking-tighter text-nowrap text-white opacity-10 lg:text-9xl">
        <Image
          src="/doodles/superman.svg"
          width={200}
          height={50}
          alt="Notes Buddy"
          className="absolute -top-12 -right-14 size-16 opacity-60 md:-top-16 md:-right-22 md:size-28"
        />
        Notes Buddy
      </div>
      <div className="group flex items-center gap-2">
        <Image
          className="hidden size-12 rounded-2xl border border-[rgba(255,255,255,0.2)] group-hover:border-[rgba(255,255,255,0.4)] md:block"
          src="/logo2.png"
          width={48}
          height={48}
          alt="dev0jha"
        />
        <p className="text-[rgba(255,255,255,0.4)] transition-all duration-300 ease-in-out group-hover:text-[rgba(255,255,255,0.8)]">
          <Link target="_blank" href="https://devfolio.tech">
            Build with ❤️{" "}
            <span className="transition-all duration-300 ease-in-out group-hover:underline">
              dev0jha
            </span>
          </Link>
        </p>
      </div>
    </footer>
  );
}
