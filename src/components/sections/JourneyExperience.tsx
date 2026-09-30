"use client";

import {
  motion,
  type Variants,
  useAnimationControls,
  useInView,
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const EASE_SMOOTH = [0.25, 1, 0.5, 1] as const;

// کنترل کلی سکشن و ترتیب اجرای گروه‌های اصلی
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      duration: 0.18,
      ease: EASE_SMOOTH,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.12,
      delayChildren: 0.04,
      ease: EASE_SMOOTH,
    },
  },
};

// گروه‌هایی که فرزندانشان باید نوبتی ظاهر شوند
const staggerGroupVariants: Variants = {
  hidden: {
    opacity: 1,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.035,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.09,
      delayChildren: 0.02,
    },
  },
};

// ورود نرم آیتم‌ها با جابه‌جایی و تغییر مقیاس بسیار کم
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.985,
    transition: {
      duration: 0.2,
      ease: EASE_SMOOTH,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.48,
      ease: EASE_SMOOTH,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.65,
      ease: EASE_SMOOTH,
    },
  },
};

const dotVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: 0.06,
      ease: EASE_SMOOTH,
    },
  },
};

interface MetricItem {
  value: string;
  label: string;
  sub: string;
}

const metrics: MetricItem[] = [
  {
    value: "3+",
    label: "Years of Experience",
    sub: "Dev + Personal Projects",
  },
  {
    value: "10+",
    label: "Projects Completed",
    sub: "(Real & Demo)",
  },
  {
    value: "10+",
    label: "Technologies",
    sub: "(And still learning)",
  },
  {
    value: "100%",
    label: "Passion",
    sub: "(For what I do)",
  },
];

interface TimelineItem {
  period: string;
  title: string;
  description: string;
  active?: boolean;
}

const timeline: TimelineItem[] = [
    {
    period: "2025 — present",
    title: "Freelance Developer & Startup Founder",
    description: "Tana Centre — Digital Products & AI Solutions",
    active: true,
  },
    {
    period: "2024 — 2025",
    title: "Freelance Developer",
    description: "Web, UI/UX, AI Projects",
  },
  {
    period: "2023 — 2024",
    title: "Frontend Developer",
    description: "React, Next.js, Tailwind",
  },
  {
    period: "2019 — 2023",
    title: "Self Learning",
    description: "Start of the journey",
  },
];

export default function JourneyExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.22 });
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start(isInView ? "visible" : "hidden");
  }, [controls, isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative h-svh w-full overflow-hidden select-none text-white md:h-dvh"
    >
      {/* پس‌زمینه ثابت؛ بدون انیمیشن سنگین */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/journey-bg.webp"
          alt="Journey Background"
          fill
          priority
          quality={75}
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-b from-[#121715]/80 via-[#0e1411]/65 to-[#0b100e]/92" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 py-7 sm:px-10 sm:py-10 md:px-14 md:py-14 lg:px-24 lg:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto flex h-full w-full max-w-295 flex-col justify-between"
        >
          {/* بخش عنوان و آمار */}
          <motion.div
            variants={staggerGroupVariants}
            className="flex flex-col"
          >
            <motion.div
              variants={staggerGroupVariants}
              className="flex flex-col gap-1 sm:gap-2"
            >
              <motion.span
                variants={itemVariants}
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C4CBC6] sm:text-[11px] md:text-[13px]"
              >
                04 — EXPERIENCE & NUMBERS
              </motion.span>

              <motion.div
                variants={staggerGroupVariants}
                className="mt-1 flex flex-col justify-between gap-2 sm:flex-row sm:items-end sm:gap-4"
              >
                <motion.h2
                  variants={itemVariants}
                  className="font-serif text-[26px] leading-[1.12] tracking-tight text-[#F2F5F3] sm:text-[38px] md:text-[50px]"
                >
                  A quick look
                  <br />
                  at my journey.
                </motion.h2>

                <motion.div
                  variants={itemVariants}
                  className="max-w-50 -rotate-2 self-start text-left sm:self-auto sm:-rotate-3"
                >
                  <p className="font-serif text-[11px] italic leading-snug tracking-wide text-[#E0E7E2]/85 sm:text-[13px] md:text-[14px]">
                    Small steps build big results over time...
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* آمارها با انیمیشن نوبتی */}
            <motion.div
              variants={staggerGroupVariants}
              className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:mt-8 sm:max-w-155 sm:gap-x-10 sm:gap-y-6 md:mt-10 md:gap-x-14 md:gap-y-8"
            >
              {metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  variants={itemVariants}
                  className="flex flex-col"
                >
                  <span className="font-serif text-[26px] leading-tight tracking-tight text-white sm:text-[36px] md:text-[44px]">
                    {metric.value}
                  </span>

                  <span className="mt-0.5 text-[11px] font-medium tracking-tight text-[#E5ECE7] sm:text-[12px] md:text-[13px]">
                    {metric.label}
                  </span>

                  <span className="text-[9px] text-[#9BA59E] sm:text-[10px] md:text-[11px]">
                    {metric.sub}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* تایم‌لاین با خط و آیتم‌های نوبتی */}
          <motion.div
            variants={staggerGroupVariants}
            className="pb-1 pt-4 sm:pt-6"
          >
            <div className="relative flex flex-col space-y-4 pl-5 sm:space-y-6 sm:pl-6">
              <motion.div
                variants={lineVariants}
                className="absolute bottom-1 left-0.75 top-2 w-px origin-top bg-white/25 sm:left-1"
              />

              {timeline.map((item) => (
                <motion.div
                  key={`${item.period}-${item.title}`}
                  variants={itemVariants}
                  className="relative flex flex-col"
                >
                  <motion.div
                    variants={dotVariants}
                    className={`absolute left-[-23.5px] top-1.5 h-2 w-2 rounded-full border border-white/60 sm:left-[-24.5px] sm:h-2.5 sm:w-2.5 ${
                      item.active
                        ? "border-white bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                        : "bg-[#18211C]/80"
                    }`}
                  />

                  <span className="text-[9px] font-semibold uppercase tracking-wider text-[#A2ADA5] sm:text-[11px] md:text-[12px]">
                    {item.period}
                  </span>

                  <h3 className="mt-0.5 text-[13px] font-semibold tracking-tight text-[#F7FAF8] sm:text-[15px] md:text-[16px]">
                    {item.title}
                  </h3>

                  <p className="text-[10px] text-[#A6B2AA] sm:text-[11px] md:text-[12px]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
