"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  useAnimation,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// کانتینر اصلی برای مدیریت ورود و خروج آبشاری (یکی‌یکی)
const staggerContainer: Variants = {
  hidden: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: 1, // خروج یکی‌یکی به ترتیب از بالا به پایین
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1, // ورود یکی‌یکی
    },
  },
};

// انیمیشن نرم تک‌تک المان‌ها
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    transition: {
      duration: 0.45,
      ease: EASE_OUT,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_OUT,
    },
  },
};

// انیمیشن ورود و خروج هدر بالا و لیبل کناری
const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.4,
      ease: EASE_OUT,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);

  // دقیقاً مثل کامپوننت About با آستانه 0.35 برای تشخیص دقیق ورود و خروج
  const isInView = useInView(rootRef, { amount: 0.35 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  // انیمیشن نقطه‌ی نشانگر اسکرول
  const scrollDotAnim = useMemo(
    () =>
      reduceMotion
        ? { y: 0, opacity: 0.85, scale: 1 }
        : {
            y: [0, 14, 0],
            opacity: [0.95, 0.35, 0.95],
            scale: [1, 0.92, 1],
          },
    [reduceMotion],
  );

  return (
    <section
      ref={rootRef}
      className="relative flex h-dvh w-full flex-col justify-between overflow-hidden bg-[#0a0c10] px-6 py-6 text-white select-none md:px-10 md:py-8 lg:px-14 lg:py-10"
    >
      {/* Background image (static) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/FarzadSohrabi.webp"
          alt="Farzad Sohrabi"
          fill
          priority
          sizes="(max-width: 767px) 100vw"
          className="object-cover object-center brightness-[0.75] contrast-[1.05] md:hidden"
        />
        <Image
          src="/images/FarzadSohrabiDesktop1.webp"
          alt="Farzad Sohrabi"
          fill
          priority
          sizes="(min-width: 768px) 100vw"
          className="hidden object-cover object-center brightness-[0.72] contrast-[1.06] md:block lg:block"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0c10] via-black/25 to-black/40" />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Side label */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate={controls}
        className="absolute -right-30 top-40 flex h-4 w-70 rotate-90 flex-row items-center justify-center gap-1 md:hidden"
      >
        <div className="h-0.5 w-25 bg-linear-to-r from-transparent to-white/30" />
        <p className="jua-regular text-[11px] text-white/50">TanaCentre</p>
        <div className="h-0.5 w-25 bg-linear-to-r from-white/30 to-transparent" />
      </motion.div>

      {/* Header */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 flex items-center justify-between"
      >
        <div>
          <span className="jua-Bold block text-[15px] tracking-[0.25em] text-white md:text-[14px]">
            FARZAD
          </span>
          <span className="jua-regular -mt-1.5 block text-[12px] tracking-[0.25em] text-white/50 md:text-[12px]">
            SOHRABI
          </span>
        </div>
      </motion.header>

      {/* Main content - انیمیشن آبشاری ورود و خروج تک‌تک آیتم‌ها */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
        className="relative z-10 flex flex-col items-start gap-4 pb-30 md:gap-7 md:pb-20 lg:pb-66"
      >
        {/* Available Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md md:px-4 md:py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="encode-sans-semi-expanded-medium text-[11px] tracking-wide text-emerald-300 md:text-[12px]">
            Available for new projects
          </span>
        </motion.div>

        {/* Name / Heading */}
        <motion.div variants={itemVariants} className="space-y-1 md:space-y-2">
          <p className="encode-sans-semi-expanded-medium text-[14px] tracking-wide text-white/60 md:text-[16px]">
            Hello, I am
          </p>
          <h1 className="bjcree-semibold text-[42px] font-normal leading-[1.05] tracking-tight text-white md:text-[58px] lg:text-[68px]">
            Farzad <br />
            <span className="bjcree-semibold">Sohrabi</span>
          </h1>
        </motion.div>

        {/* Roles & Description */}
        <motion.div variants={itemVariants} className="space-y-2 md:space-y-3">
          <h2 className="encode-sans-semi-expanded-medium text-[15px] uppercase tracking-[0.18em] text-white/90 md:text-[17px]">
            Full-Stack Developer &amp; AI Specialist
          </h2>
          <p className="encode-sans-semi-expanded-medium max-w-[320px] text-[13px] text-white/70 md:max-w-130 md:text-[15px] md:leading-relaxed">
            Building fast, clean, and precise websites, e-commerce platforms,
            and intelligent bots with WordPress and modern technologies.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-4 left-3 z-20 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-6"
        >
          <div className="pointer-events-none absolute -inset-x-6 -inset-y-2 -z-10 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex h-11 w-7 items-start justify-center rounded-full border border-white/30 bg-white/8 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md">
            <div className="pointer-events-none absolute inset-x-1 top-1 h-[35%] rounded-full bg-linear-to-b from-white/25 to-transparent" />

            <motion.span
              initial={false}
              animate={scrollDotAnim}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 1.6, repeat: Infinity, ease: EASE_OUT }
              }
              className="mt-2 h-1.5 w-1.5 rounded-full bg-white/95 shadow-[0_0_10px_rgba(255,255,255,0.9)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
