"use client";

import { motion, type Variants, useAnimationControls, useInView } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

// Hardware-accelerated smooth easing tuple
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

// Variants with strict Framer Motion types
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: EASE_SMOOTH,
        },
    },
};

interface InterestItem {
    title: string;
    icon: React.ReactNode;
}

const interests: InterestItem[] = [
    {
        title: "Series",
        icon: (
            <svg
                className="h-5 w-5 stroke-[1.6]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
                <polygon points="10 11 15 14.5 10 18 10 11" fill="currentColor" fillOpacity="0.18" />
            </svg>
        ),
    },
    {
        title: "Music",
        icon: (
            <svg
                className="h-5 w-5 stroke-[1.6]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
            </svg>
        ),
    },
    {
        title: "Travel",
        icon: (
            <svg
                className="h-5 w-5 stroke-[1.6]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
    },
    {
        title: "Football",
        icon: (
            <svg
                className="h-5 w-5 stroke-[1.6]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <polygon points="12 7 15 10 14 14 10 14 9 10" fill="currentColor" fillOpacity="0.2" />
                <path d="m12 7-3 3-2-1" />
                <path d="m15 10 3 1 1-2" />
                <path d="m14 14 2 3-1 2" />
                <path d="m10 14-2 3 1 2" />
                <path d="m9 10-3 1-1-2" />
            </svg>
        ),
    },
];

export default function BeyondCode() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(sectionRef, { amount: 0.25 });
    const controls = useAnimationControls();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.set("hidden");
        }
    }, [isInView, controls]);

    return (
        <section
            ref={sectionRef}
            className="relative flex h-svh w-full flex-col justify-between overflow-hidden bg-[#E9E4DC] px-5 py-6 text-[#1C1A17] select-none sm:px-10 sm:py-8 md:h-dvh md:px-14 md:py-10 lg:px-24"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#EFECE6]" />

                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              radial-gradient(1200px 520px at 20% -10%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%),
              radial-gradient(900px 420px at 85% 110%, rgba(217,210,198,0.45) 0%, rgba(217,210,198,0) 58%),
              radial-gradient(260px 180px at 88% 14%, rgba(120,72,28,0.16) 0%, rgba(120,72,28,0.08) 35%, rgba(120,72,28,0) 72%),
              radial-gradient(220px 150px at 12% 86%, rgba(98,55,20,0.14) 0%, rgba(98,55,20,0.06) 40%, rgba(98,55,20,0) 74%),
              radial-gradient(180px 120px at 96% 74%, rgba(70,38,14,0.10) 0%, rgba(70,38,14,0) 70%),
              radial-gradient(140% 90% at 50% 50%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.14) 100%)
            `,
                        backgroundRepeat: "no-repeat",
                    }}
                />

                <div
                    className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/></filter><rect width='60' height='60' filter='url(%23n)' opacity='0.3'/></svg>\")",
                        backgroundRepeat: "repeat",
                    }}
                />
            </div>

            {/* Decorative lines */}
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
                viewBox="0 0 1200 800"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M-50 150 C 250 80, 450 320, 750 200 S 1100 450, 1300 250"
                    fill="none"
                    stroke="#423E37"
                    strokeWidth="1.2"
                    strokeDasharray="10 14"
                    initial={{ pathOffset: 0 }}
                    animate={{ pathOffset: [0, 1] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M-100 550 C 200 450, 500 700, 850 520 S 1150 720, 1350 600"
                    fill="none"
                    stroke="#423E37"
                    strokeWidth="0.9"
                    strokeDasharray="6 10"
                    initial={{ pathOffset: 0 }}
                    animate={{ pathOffset: [1, 0] }}
                    transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(55,48,39,0.18)_100%)]" />

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="relative z-10 mx-auto flex h-full w-full max-w-260 flex-col justify-between"
            >
                {/* TOP */}
                <div className="flex flex-col">
                    <motion.div variants={itemVariants} className="flex flex-col gap-1 sm:gap-1.5">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7C766C] sm:text-[11px]">
                            05 — PERSONAL SIDE
                        </span>
                        <h2 className="jua-thick mt-3 text-[34px] leading-[1.05] tracking-tight text-[#1E1B18] sm:text-[44px] md:text-[52px]">
                            Beyond <span className="text-[#9e624a]">code.</span>
                        </h2>
                    </motion.div>

                    <div className="mt-4 flex flex-col justify-between gap-6 sm:mt-6 sm:flex-row sm:items-start">
                        <motion.div variants={itemVariants} className="max-w-85 space-y-3 sm:max-w-95">
                            <p className="jua-thick text-[12px] leading-[1.7] text-[#4A453E] sm:text-[13px] md:text-[14px]">
                                I’m passionate about technology, TV series, cinema, and great music.
                                I also enjoy football and discovering new places.
                            </p>
                            <p className="jua-thick text-[12px] leading-[1.7] text-[#4A453E] sm:text-[13px] md:text-[14px]">
                                I believe great ideas grow from a curious mind and a calm environment.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="relative flex items-center self-center sm:self-auto sm:pr-8"
                        >
                            <div className="relative h-60 w-60 sm:h-70 sm:w-70">
                                <Image
                                    src="/images/BeyondCode.webp"
                                    alt="Memories"
                                    fill
                                    quality={95}
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* MIDDLE */}
                <motion.div
                    variants={itemVariants}
                    className="my-3 flex w-full items-center justify-between border-y border-black/8 py-3 sm:my-4 sm:py-4"
                >
                    {interests.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-1 flex-col items-center justify-center gap-1.5 px-2 text-center transition-colors hover:text-black ${index !== interests.length - 1 ? "border-r border-black/8" : ""
                                }`}
                        >
                            <div className={index === 2 ? "text-[#9e624a]" : "text-[#3B362F]"}>{item.icon}</div>

                            <span
                                className={`text-[11px] font-medium tracking-tight sm:text-[12px] ${index === 2 ? "text-[#9e624a]" : "text-[#4A453E]"
                                    }`}
                                style={{
                                    fontFamily: '"Caveat", "Segoe Print", "Bradley Hand", cursive',
                                }}
                            >
                                {item.title}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* BOTTOM */}
                <motion.div
                    variants={itemVariants}
                    className="relative min-h-40 w-full overflow-hidden rounded-2xl bg-[#141A17] p-5 text-white shadow-xl sm:min-h-47.5 sm:p-7 md:p-8"
                >
                    <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
                        <Image
                            src="/images/journey-bg.webp"
                            alt="Mountain Atmosphere"
                            fill
                            priority
                            quality={90}
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0F1412] via-[#0F1412]/70 to-transparent" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="font-serif text-3xl font-bold leading-none text-[#C4CBC6]/70 sm:text-4xl">
                                “
                            </span>
                            <p
                                className="text-[17px] leading-tight tracking-tight text-[#F1F4F2] sm:text-[22px] md:text-[26px]"
                                style={{
                                    fontFamily: '"Caveat", "Segoe Print", "Bradley Hand", cursive',
                                }}
                            >
                                Not just a developer, <br />
                                <span className="text-[#E0E7E2]">but a lifelong learner.</span>
                            </p>
                        </div>

                        <div className="flex items-end justify-between border-t border-white/10 pt-3">
                            <span
                                className="text-[11px] font-normal tracking-wide text-[#A2ADA5] sm:text-[12px]"
                                style={{
                                    fontFamily: '"Caveat", "Segoe Print", "Bradley Hand", cursive',
                                }}
                            >
                                — Farzad Sohrabi
                            </span>

                            <div className="text-white/80">
                                <svg
                                    className="h-7 w-24 sm:h-8 sm:w-28"
                                    viewBox="0 0 140 40"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M10 28 C 25 10, 30 35, 45 15 S 65 30, 80 18" />
                                    <path d="M75 22 C 90 20, 105 26, 125 14" />
                                    <path d="M35 32 L 130 24" strokeWidth="1.2" opacity="0.6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
