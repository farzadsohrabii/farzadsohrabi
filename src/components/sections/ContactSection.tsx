"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView, type Variants } from "framer-motion";
import Image from "next/image";

// لیست اطلاعات تماس با ترتیب و پروتکل‌های صحیح
const CONTACT_ITEMS = [
  {
    id: "email",
    label: "Email",
    href: "mailto:sohrabiprogrammer@gmail.com",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: "phone",
    label: "Phone",
    href: "tel:+989909992466",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/farzad_sohrabi",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
  {
    id: "location",
    label: "Mahabad, Iran / Remote",
    href: "#",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

// انیمیشن‌های ترتیبی
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { amount: 0.45 });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <section
      ref={containerRef}
      data-snap
      className="relative flex h-screen w-full max-h-screen select-none flex-col justify-between overflow-hidden px-6 py-8 text-white font-sans md:px-14 md:py-10"
    >
      {/* تصویر پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <Image
          src="/images/ContactBg.webp"
          alt="Farzad Sohrabi - Contact Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* لایه‌های گرادینت */}
        <div className="absolute inset-0 bg-linear-to-r from-[#070b0e]/90 via-[#070b0e]/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-[#070b0e]/70 via-transparent to-[#070b0e]/90" />
      </div>

      {/* هدر: شماره سکشن */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full z-10"
      >
        <span className="font-mono text-[11px] font-medium tracking-[0.28em] text-white/70 uppercase">
          06 — CONTACT
        </span>
      </motion.header>

      {/* محتوا و اطلاعات تماس */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="my-auto flex w-full max-w-lg flex-col justify-center gap-4 py-2 z-10"
      >
        <motion.h2
          variants={itemFadeUpVariants}
          className="bjcree-semibold text-3xl leading-[1.18] text-white/95 sm:text-4xl"
        >
          Let’s build <br />
          something <br />
          great together.
        </motion.h2>

        <motion.p
          variants={itemFadeUpVariants}
          className="max-w-sm text-xs leading-relaxed text-white/70 sm:text-[13px]"
        >
          I’m always open to new opportunities, collaborations and interesting projects. Feel free to get in touch!
        </motion.p>

        {/* لیست آیتم‌های تماس */}
        <motion.div variants={itemFadeUpVariants} className="flex flex-col gap-2.5 pt-1">
          {CONTACT_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-3 text-xs text-white/80 transition-colors duration-200 hover:text-white"
              >
                <div className="flex h-5 w-5 items-center justify-center text-white/70 transition-transform group-hover:scale-110 group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="font-mono text-[12px] tracking-wide text-white/85 group-hover:text-white">
                  {item.label}
                </span>
              </a>
            );
          })}
        </motion.div>

        {/* دکمه ارسال پیامک به شماره همراه */}
        <motion.div
          variants={itemFadeUpVariants}
          className="relative mt-2 flex items-center justify-between pt-1"
        >
          <a
            href="sms:+989909992466"
            className="group flex h-11 items-center justify-between gap-3 rounded-full bg-white px-5 text-[13px] font-medium text-black shadow-[0_4px_24px_rgba(255,255,255,0.18)] transition-all duration-300 hover:bg-neutral-100 hover:shadow-[0_6px_30px_rgba(255,255,255,0.28)] active:scale-[0.98]"
          >
            <span>Send a Message</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-black/15 transition-transform duration-300 group-hover:translate-x-0.5">
              ➔
            </span>
          </a>

          <div className="pointer-events-none absolute right-0 -bottom-2 text-right font-serif italic text-white/45 sm:static">
            <p className="text-[11px] leading-snug sm:text-xs">
              Good ideas <br />
              start with <br />a message.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* فوتر */}
      <footer className="flex w-full flex-col gap-2 z-10">
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
          sohrabi.dev
        </span>
        <div className="relative h-0.5 w-full max-w-30 overflow-hidden rounded-full bg-white/15">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full origin-left bg-white/80"
          />
        </div>
      </footer>
    </section>
  );
}
