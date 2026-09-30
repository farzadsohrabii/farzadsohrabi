"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 18,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: EASE_OUT,
        },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.08,
        },
    },
};

const interactiveEntrance = {
    hidden: {
        opacity: 0,
        x: 40,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: EASE_OUT,
        },
    },
};

const skills = [
    "full-stack development",
    "artificial intelligence",
    "e-commerce platforms",
    "clean code",
];

export default function About() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(sectionRef, {
        amount: 0.35,
    });

    const controls = useAnimation();
    const interactiveControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
            interactiveControls.start("hidden");
        }
    }, [isInView, controls, interactiveControls]);

    const renderSkills = () =>
        skills.map((skill, index) => (
            <span key={`${skill}-${index}`} className="inline-flex items-center gap-4">
                <span>{skill}</span>
                <span className="text-[#C0674A]/80 text-[14px]" aria-hidden="true">
                    ✳
                </span>
            </span>
        ));

    return (
        <section
            ref={sectionRef}
            className="
        relative flex h-dvh w-full flex-col justify-between overflow-hidden
        bg-[#EFECE6] px-6 py-6 text-[#1A1A1A] select-none
        md:px-10 md:py-8
        lg:px-14 lg:py-10
        xl:px-18 xl:py-12
      "
        >
            {/* Background paper texture & warm gradients - بهینه‌سازی شده بدون فشار به CPU */}
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

            {/* Header index badge */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={controls}
                className="relative z-10 flex items-center justify-between pt-1"
            >
                <span
                    className="
            text-[11px] font-semibold tracking-[0.2em] text-[#706E6B] uppercase
            md:text-[12px] md:tracking-[0.24em]
            lg:text-[13px]
          "
                >
                    01 — ABOUT
                </span>
                <span
                    className="
            font-mono text-[13px] font-semibold text-[#9E624A]
            md:text-[14px]
            lg:text-[15px]
          "
                >
                    &lt;/&gt;
                </span>
            </motion.div>

            {/* Main hero & bio content */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={controls}
                className="
          relative z-10 my-auto flex flex-col gap-4
          md:gap-6
          lg:gap-7
        "
            >
                <motion.h2
                    variants={fadeInUp}
                    className="
            jua-thick text-[#2E2B26] text-[29px] sm:text-[34px]
            leading-[1.18] tracking-tight
            md:text-[42px] md:leading-[1.08]
            lg:text-[54px] lg:leading-[1.05]
            xl:text-[60px]
          "
                >
                    Building ideas <br />
                    into{" "}
                    <motion.span
                        variants={interactiveEntrance}
                        initial="hidden"
                        animate={interactiveControls}
                        className="inline-block text-[#C0674A]"
                    >
                        digital
                    </motion.span>{" "}
                    <br />
                    experiences.
                </motion.h2>

                <div
                    className="
            grid grid-cols-12 items-center gap-3
            md:gap-6
            lg:gap-8
          "
                >
                    <motion.div
                        variants={fadeInUp}
                        className="
              col-span-7 space-y-2.5 pr-1
              md:col-span-7 md:space-y-3.5 md:pr-4
              lg:col-span-7 lg:pr-6
              xl:pr-10
            "
                    >
                        <p
                            className="
                text-[13.5px] sm:text-[14px] leading-[1.6] text-[#5B564D] jua-thick
                md:text-[15px] md:leading-[1.85]
                lg:text-[16px]
                xl:text-[17px]
              "
                        >
                            I&apos;m Farzad, a full-stack developer who builds modern
                            websites, e-commerce platforms, and intelligent digital
                            solutions.
                        </p>

                        <p
                            className="
                text-[13.5px] sm:text-[14px] leading-[1.6] jua-thick text-[#5B564D]
                md:text-[15px] md:leading-[1.85]
                lg:text-[16px]
                xl:text-[17px]
              "
                        >
                            I focus on speed, clean code, and bringing every design to life
                            with precision.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="
              relative col-span-5 flex justify-end
              md:col-span-5
            "
                    >
                        <div
                            className="
                relative h-45 w-32 rotate-2 overflow-hidden rounded-md border-[3px] border-white
                bg-[#1a1a1a] shadow-lg shadow-black/10 transition-transform duration-300 hover:rotate-0
                md:h-52 md:w-36 md:rotate-1
                lg:h-72 lg:w-52
              "
                        >
                            <Image
                                src="/images/AboutFarzadImage.webp"
                                alt="Farzad Silhouette"
                                fill
                                sizes="(max-width: 767px) 112px, (max-width: 1024px) 144px, 208px"
                                className="object-cover grayscale contrast-125 brightness-95"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                            <span
                                className="
                  absolute bottom-2 right-2 jua-thick text-[9.5px] italic tracking-wider text-white/70
                  md:text-[11px]
                  lg:text-[12px]
                "
                            >
                                Farzad S.
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* ۱. اسلایدر متحرک مهارت‌ها (کاملاً بهینه‌شده با لایه GPU و بدون لرزش) */}
                <motion.div
                    variants={fadeInUp}
                    onAnimationComplete={() => {
                        if (isInView) {
                            interactiveControls.start("visible");
                        }
                    }}
                    className="
            relative w-full overflow-hidden border-y border-[#DDD7CC]/80 py-1.5
            mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
          "
                >
                    <motion.div
                        className="flex w-max items-center gap-5 whitespace-nowrap text-[16px] md:text-[19px] text-[#78685B] will-change-transform"
                        style={{
                            fontFamily: '"Caveat", "Segoe Print", "Bradley Hand", cursive',
                            transform: "translateZ(0)",
                        }}
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 22,
                        }}
                    >
                        {renderSkills()}
                        {renderSkills()}
                    </motion.div>
                </motion.div>

                {/* ۲. راهنمای اسکرول دست‌نویس با انیمیشن پله‌ای یکپارچه، کامپوزیت‌شده و بدون لَگ */}
                <motion.div
                    variants={fadeInUp}
                    className="flex items-center justify-end gap-2 pr-1 pt-9 md:gap-3 md:pr-2"
                    aria-hidden="true"
                >
                    <span
                        className="text-[15px] tracking-wide text-[#9E624A] select-none md:text-[17px]"
                        style={{
                            fontFamily: '"Caveat", "Segoe Print", "Bradley Hand", cursive',
                        }}
                    >
                        explore my work
                    </span>

                    {/* فلش خط‌چین مرحله‌ای با حداقل پردازش و رندر نرم */}
                    <svg
                        className="h-9 w-5 text-[#9E624A] md:h-10 md:w-6 will-change-transform"
                        viewBox="0 0 20 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: "translateZ(0)" }}
                    >
                        {/* پاره‌خط ۱ */}
                        <motion.line
                            x1="10"
                            y1="2"
                            x2="10"
                            y2="8"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            animate={{ opacity: [0, 1, 1, 0] }}
                            transition={{
                                duration: 1.9,
                                repeat: Infinity,
                                times: [0, 0.18, 0.78, 1],
                                ease: "linear",
                            }}
                        />
                        {/* پاره‌خط ۲ */}
                        <motion.line
                            x1="10"
                            y1="13"
                            x2="10"
                            y2="19"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            animate={{ opacity: [0, 1, 1, 0] }}
                            transition={{
                                duration: 1.9,
                                repeat: Infinity,
                                times: [0.18, 0.36, 0.78, 1],
                                ease: "linear",
                            }}
                        />
                        {/* پاره‌خط ۳ */}
                        <motion.line
                            x1="10"
                            y1="24"
                            x2="10"
                            y2="30"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            animate={{ opacity: [0, 1, 1, 0] }}
                            transition={{
                                duration: 1.9,
                                repeat: Infinity,
                                times: [0.36, 0.54, 0.78, 1],
                                ease: "linear",
                            }}
                        />
                        {/* پیکان فلش با جهش نرم */}
                        <motion.path
                            d="M5 28L10 36L15 28"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            animate={{
                                opacity: [0, 1, 1, 0],
                                y: [-2, 1, 1, 0],
                            }}
                            transition={{
                                duration: 1.9,
                                repeat: Infinity,
                                times: [0.5, 0.68, 0.78, 1],
                                ease: "easeOut",
                            }}
                        />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Footer metadata */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={controls}
                className="
          relative z-10 grid grid-cols-2 gap-3 border-t border-[#D8D4CC] pt-3 pb-1
          md:gap-6 md:pt-4
          lg:pt-5
        "
            >
                <div>
                    <span
                        className="
              block text-[10.5px] text-[#787672]
              md:text-[12px]
              lg:text-[13px] jua-thick
            "
                    >
                        Based in
                    </span>
                    <span
                        className="
              mt-0.5 block text-[12px] font-medium text-[#1A1A1A]
              md:text-[14px]
              lg:text-[15px] jua-thick
            "
                    >
                        Iran / Available Worldwide
                    </span>
                </div>

                <div>
                    <span
                        className="
              block text-[10.5px] text-[#787672]
              md:text-[12px]
              lg:text-[13px] jua-thick
            "
                    >
                        Open for
                    </span>
                    <span
                        className="
              mt-0.5 block text-[12px] font-medium text-[#1A1A1A]
              md:text-[14px]
              lg:text-[15px] jua-thick
            "
                    >
                        Freelance & Full-time
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
