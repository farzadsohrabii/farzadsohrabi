"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface SectionMeta {
    id: string;
    name: string;
    number: string;
    icon: (props: { className?: string }) => React.ReactNode;
}

const SECTIONS: SectionMeta[] = [
    {
        id: "hero",
        name: "Home",
        number: "01",
        icon: ({ className }) => (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5Z" />
            </svg>
        ),
    },
    {
        id: "about",
        name: "About",
        number: "02",
        icon: ({ className }) => (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a8.5 8.5 0 0 1 13 0" />
            </svg>
        ),
    },
    {
        id: "projects",
        name: "Projects",
        number: "03",
        icon: ({ className }) => (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <rect width="18" height="14" x="3" y="5" rx="2" />
                <path d="M3 10h18" />
                <path d="M7 15h3" />
            </svg>
        ),
    },
    {
        id: "skills",
        name: "Skills",
        number: "04",
        icon: ({ className }) => (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        id: "journey",
        name: "Experience",
        number: "05",
        icon: ({ className }) => (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <rect width="18" height="13" x="3" y="7" rx="2" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M3 12h18" />
            </svg>
        ),
    },
    {
        id: "beyond-code",
        name: "Beyond Code",
        number: "06",
        icon: ({ className }) => (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
    },
        {
        id: "ContactSection",
        name: "Contact",
        number: "07",
        icon: ({ className }) => (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
];

const EASE_WARP = [0.16, 1, 0.3, 1] as const;

export default function FloatingNavigator() {
    const [isOpen, setIsOpen] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isWarping, setIsWarping] = useState(false);
    const [isNudging, setIsNudging] = useState(false);

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const defaultX = window.innerWidth - 80;
            const defaultY = window.innerHeight / 2;

            setPos({
                x: defaultX,
                y: defaultY,
            });

            const closeTimer = setTimeout(() => {
                setIsOpen(false);
            }, 1000);

            const nudgeTimer = setTimeout(() => {
                setIsNudging(true);
            }, 1600);

            const endNudgeTimer = setTimeout(() => {
                setIsNudging(false);
            }, 2900);

            return () => {
                clearTimeout(closeTimer);
                clearTimeout(nudgeTimer);
                clearTimeout(endNudgeTimer);
            };
        }
    }, []);

    useEffect(() => {
        const updateActiveSection = () => {
            const sections = Array.from(
                document.querySelectorAll<HTMLElement>("[data-snap]")
            );

            if (!sections.length) return;

            const viewportCenter = window.innerHeight / 2;
            let closestIdx = 0;
            let minDistance = Infinity;

            sections.forEach((sec, idx) => {
                const rect = sec.getBoundingClientRect();
                const secCenter = rect.top + rect.height / 2;
                const dist = Math.abs(secCenter - viewportCenter);

                if (dist < minDistance) {
                    minDistance = dist;
                    closestIdx = idx;
                }
            });

            setActiveIndex(closestIdx);
        };

        window.addEventListener("scroll", updateActiveSection, {
            passive: true,
        });

        const interval = setInterval(updateActiveSection, 200);

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            clearInterval(interval);
        };
    }, []);

    const scrollToSection = (index: number) => {
        setIsOpen(false);

        if (index === activeIndex) return;

        setIsWarping(true);

        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-snap]")
        );

        const scroller =
            document.querySelector<HTMLElement>("[data-scroll-container]") ||
            document.body;

        scroller.style.transition =
            "filter 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s ease";

        scroller.style.filter = "blur(14px) brightness(1.3) contrast(1.1)";
        scroller.style.transform = "scale(0.96) translateZ(0)";

        setTimeout(() => {
            if (sections[index]) {
                sections[index].scrollIntoView({
                    behavior: "auto",
                    block: "start",
                });
            }
        }, 280);

        setTimeout(() => {
            scroller.style.filter = "none";
            scroller.style.transform = "none";
            setIsWarping(false);
        }, 620);
    };

    const handleDragStart = () => {
        isDraggingRef.current = true;
        setIsNudging(false);
    };

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (Math.hypot(info.offset.x, info.offset.y) < 6) {
            isDraggingRef.current = false;
        } else {
            setPos((prev) => ({
                x: Math.min(
                    Math.max(40, prev.x + info.offset.x),
                    window.innerWidth - 40
                ),
                y: Math.min(
                    Math.max(50, prev.y + info.offset.y),
                    window.innerHeight - 50
                ),
            }));

            setTimeout(() => {
                isDraggingRef.current = false;
            }, 80);
        }
    };

    const handleToggle = () => {
        if (!isDraggingRef.current) {
            setIsNudging(false);
            setIsOpen((prev) => !prev);
        }
    };

    const centerTarget = {
        x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
        y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    };

    return (
        <>
            {/* =========================================================
          WARP TRANSITION
      ========================================================= */}
            <AnimatePresence>
                {isWarping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="pointer-events-none fixed inset-0 z-9999 overflow-hidden bg-[#120d08]/70 backdrop-blur-md"
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "radial-gradient(circle at center, rgba(238,202,151,.24) 0%, rgba(18,13,8,.96) 72%)",
                            }}
                        />

                        <motion.div
                            initial={{
                                scale: 0.1,
                                opacity: 1,
                            }}
                            animate={{
                                scale: 2.8,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                            }}
                            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6c18e]/25 blur-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* =========================================================
          NAVIGATION ROOT
      ========================================================= */}
            <div className="pointer-events-none fixed inset-0 z-50 select-none overflow-hidden">
                {/* =======================================================
            OPEN STATE BACKDROP
        ======================================================= */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            onClick={() => setIsOpen(false)}
                            className="pointer-events-auto absolute inset-0"
                            style={{
                                background:
                                    "radial-gradient(circle at center, rgba(32,24,17,.18) 0%, rgba(8,6,4,.76) 70%)",
                                backdropFilter: "blur(5px)",
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* =======================================================
            DRAG CONTAINER
        ======================================================= */}
                <motion.div
                    drag={!isOpen}
                    dragMomentum={false}
                    dragElastic={0.06}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    animate={{
                        x: isOpen ? centerTarget.x : pos.x,
                        y: isOpen ? centerTarget.y : pos.y,
                    }}
                    transition={{
                        duration: 0.55,
                        ease: EASE_WARP,
                    }}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        transform: "translate(-50%, -50%)",
                    }}
                    className="pointer-events-auto -translate-x-1/2 -translate-y-1/2 touch-none"
                >
                    {/* =====================================================
              NUDGE / INTRO
          ===================================================== */}
                    <motion.div
                        animate={
                            isNudging
                                ? {
                                    x: [0, -14, 12, -8, 6, -3, 0],
                                    y: [0, -10, 8, -6, 4, -2, 0],
                                    scale: [1, 1.08, 0.97, 1.05, 0.98, 1],
                                    rotate: [0, -5, 5, -4, 3, 0],
                                }
                                : {
                                    x: 0,
                                    y: 0,
                                    scale: 1,
                                    rotate: 0,
                                }
                        }
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                        }}
                        className="relative flex flex-col items-center justify-center"
                    >
                        {/* ===================================================
                SMALL PAPER FLOATING BUTTON
            =================================================== */}
                        <motion.button
                            type="button"
                            onClick={handleToggle}
                            whileHover={{
                                scale: 1.045,
                                rotate: -1.5,
                            }}
                            whileTap={{
                                scale: 0.94,
                            }}
                            className="group relative z-30 flex h-13 w-13 cursor-pointer items-center justify-center rounded-full active:cursor-grabbing"
                            style={{
                                /*
                                 * کاغذ نیمه شفاف و بسیار سبک
                                 */
                                background:
                                    "radial-gradient(circle at 35% 25%, rgba(238,225,204,.62), rgba(190,170,143,.42) 72%, rgba(158,139,115,.32))",

                                /*
                                 * فقط یک خط ظریف؛ بدون حس فلزی
                                 */
                                border:
                                    "1px solid rgba(242,226,201,.48)",

                                /*
                                 * سایه بسیار نرم
                                 */
                                boxShadow:
                                    "0 7px 20px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.24)",

                                /*
                                 * کمی حالت کاغذی
                                 */
                                backdropFilter: "blur(5px)",
                            }}
                        >
                            {/* =================================================
                  PAPER EDGE #1
              ================================================= */}
                            <span
                                className="pointer-events-none absolute -inset-0.75 rounded-full"
                                style={{
                                    border:
                                        "1px dashed rgba(238,221,194,.34)",
                                    transform: "rotate(-5deg)",
                                }}
                            />

                            {/* =================================================
                  PAPER EDGE #2
              ================================================= */}
                            <span
                                className="pointer-events-none absolute -inset-1.25 rounded-full"
                                style={{
                                    border:
                                        "1px solid rgba(245,229,204,.13)",
                                    transform: "rotate(6deg)",
                                }}
                            />

                            {/* =================================================
                  VERY SUBTLE PAPER MARKS
              ================================================= */}
                            <span
                                className="pointer-events-none absolute -right-1.25 top-4.75 h-px w-2.25"
                                style={{
                                    background:
                                        "linear-gradient(90deg, rgba(241,224,197,.38), transparent)",
                                    transform: "rotate(-14deg)",
                                }}
                            />

                            <span
                                className="pointer-events-none absolute -left-1 bottom-3.5 h-px w-2"
                                style={{
                                    background:
                                        "linear-gradient(90deg, transparent, rgba(241,224,197,.32))",
                                    transform: "rotate(10deg)",
                                }}
                            />

                            {/* =================================================
                  ICON
              ================================================= */}
                            <span className="relative flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    {isOpen ? (
                                        <motion.span
                                            key="close-icon"
                                            initial={{
                                                rotate: -70,
                                                opacity: 0,
                                                scale: 0.75,
                                            }}
                                            animate={{
                                                rotate: 0,
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            exit={{
                                                rotate: 70,
                                                opacity: 0,
                                                scale: 0.75,
                                            }}
                                            className="relative block text-[20px] font-light leading-none text-[#5c4b3a]/80"
                                            style={{
                                                fontFamily:
                                                    '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                                                textShadow:
                                                    "0 1px 3px rgba(255,240,216,.25)",
                                            }}
                                        >
                                            ×
                                        </motion.span>
                                    ) : (
                                        <motion.div
                                            key="burger-icon"
                                            initial={{
                                                scale: 0.75,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                scale: 1,
                                                opacity: 1,
                                            }}
                                            exit={{
                                                scale: 0.75,
                                                opacity: 0,
                                            }}
                                            className="flex flex-col items-center justify-center gap-1.25"
                                        >
                                            <span
                                                className="h-[1.5px] w-4.75 rounded-full bg-[#5c4b3a]/75"
                                                style={{
                                                    transform: "rotate(-1deg)",
                                                }}
                                            />

                                            <span
                                                className="h-[1.5px] w-4.75 rounded-full bg-[#5c4b3a]/75"
                                                style={{
                                                    transform: "rotate(1.5deg)",
                                                }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </span>
                        </motion.button>

                        {/* ===================================================
                OPEN MENU
            =================================================== */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        height: 0,
                                        y: -10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        height: "auto",
                                        y: 14,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        height: 0,
                                        y: -10,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: EASE_WARP,
                                    }}
                                    className="relative z-20 flex flex-col items-center"
                                >
                                    {/* =================================================
                      SKETCHED VERTICAL LINE
                  ================================================= */}
                                    <div
                                        className="absolute -top-3.75 -bottom-5.5 w-px"
                                        style={{
                                            background:
                                                "linear-gradient(to bottom, rgba(231,211,181,.75), rgba(231,211,181,.27) 50%, rgba(231,211,181,.72))",
                                            transform: "rotate(.35deg)",
                                        }}
                                    >
                                        <span
                                            className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                                            style={{
                                                background: "#ead8b9",
                                                boxShadow:
                                                    "0 0 8px rgba(234,216,185,.35)",
                                            }}
                                        />

                                        <span
                                            className="absolute -bottom-1.25 left-1/2 h-1.75 w-1.75 -translate-x-1/2 rounded-full"
                                            style={{
                                                background: "#ead8b9",
                                                boxShadow:
                                                    "0 0 10px rgba(234,216,185,.35)",
                                            }}
                                        />
                                    </div>

                                    {/* =================================================
                      PAPER MENU ITEMS
                  ================================================= */}
                                    <div className="relative z-10 flex flex-col gap-2 pt-4 pb-7">
                                        {SECTIONS.map((sec, idx) => {
                                            const isActive = activeIndex === idx;
                                            const IconComponent = sec.icon;

                                            const rotations = [
                                                "-1.2deg",
                                                "0.8deg",
                                                "-0.6deg",
                                                "1deg",
                                                "-0.8deg",
                                                "0.65deg",
                                            ];

                                            const widths = [
                                                "190px",
                                                "184px",
                                                "192px",
                                                "186px",
                                                "190px",
                                                "198px",
                                            ];

                                            return (
                                                <motion.button
                                                    key={sec.id}
                                                    type="button"
                                                    initial={{
                                                        opacity: 0,
                                                        y: -12,
                                                        scale: 0.92,
                                                        rotate: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: isActive ? 1.035 : 1,
                                                        rotate: rotations[idx],
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -10,
                                                        scale: 0.92,
                                                    }}
                                                    transition={{
                                                        duration: 0.28,
                                                        delay: idx * 0.055,
                                                        ease: EASE_WARP,
                                                    }}
                                                    onClick={() => scrollToSection(idx)}
                                                    className="group relative flex cursor-pointer items-center justify-between px-3.75 py-2.5 text-left"
                                                    style={{
                                                        width: widths[idx],
                                                        minHeight: "46px",

                                                        clipPath:
                                                            "polygon(2% 7%, 11% 2%, 23% 4%, 35% 1%, 50% 3%, 64% 1%, 78% 4%, 90% 2%, 98% 8%, 97% 25%, 99% 42%, 97% 58%, 99% 77%, 96% 94%, 84% 97%, 69% 95%, 54% 98%, 39% 95%, 23% 98%, 9% 95%, 2% 89%, 4% 72%, 1% 55%, 3% 38%, 1% 22%)",

                                                        background: isActive
                                                            ? "linear-gradient(112deg, rgba(244,232,211,.98), rgba(222,198,163,.96))"
                                                            : "linear-gradient(112deg, rgba(226,211,188,.93), rgba(197,174,142,.9))",

                                                        boxShadow: isActive
                                                            ? "0 10px 22px rgba(0,0,0,.28), 0 0 18px rgba(224,190,139,.18)"
                                                            : "0 7px 16px rgba(0,0,0,.24)",

                                                        color: "#2b2017",
                                                    }}
                                                >
                                                    {/* PAPER TEXTURE */}
                                                    <span
                                                        className="pointer-events-none absolute inset-0 opacity-40"
                                                        style={{
                                                            backgroundImage: `
                                radial-gradient(circle at 12% 25%, rgba(70,45,27,.12) 0 0.7px, transparent 1px),
                                radial-gradient(circle at 70% 68%, rgba(70,45,27,.1) 0 0.7px, transparent 1px),
                                radial-gradient(circle at 40% 85%, rgba(70,45,27,.08) 0 0.6px, transparent 1px)
                              `,
                                                            backgroundSize:
                                                                "19px 17px, 23px 21px, 31px 27px",
                                                            mixBlendMode: "multiply",
                                                        }}
                                                    />

                                                    {/* HAND-DRAWN BORDER */}
                                                    <span
                                                        className="pointer-events-none absolute inset-0.75"
                                                        style={{
                                                            border: isActive
                                                                ? "1px solid rgba(77,53,34,.38)"
                                                                : "1px solid rgba(77,53,34,.24)",
                                                            clipPath:
                                                                "polygon(3% 5%, 18% 2%, 36% 4%, 53% 2%, 72% 4%, 96% 6%, 98% 26%, 96% 48%, 98% 72%, 95% 95%, 76% 97%, 57% 95%, 40% 98%, 19% 95%, 3% 93%, 4% 72%, 2% 49%, 4% 26%)",
                                                            transform: "rotate(.35deg)",
                                                        }}
                                                    />

                                                    {/* CONTENT */}
                                                    <div className="relative z-10 flex min-w-0 items-center gap-2.5">
                                                        <div
                                                            className={`flex h-6.75 w-6.75 shrink-0 items-center justify-center rounded-full ${isActive
                                                                    ? "bg-[#3b2a1d]/8"
                                                                    : "bg-[#3b2a1d]/5.5"
                                                                }`}
                                                            style={{
                                                                transform: "rotate(-1deg)",
                                                            }}
                                                        >
                                                            <IconComponent
                                                                className={`h-4 w-4 ${isActive
                                                                        ? "text-[#2b1d13]"
                                                                        : "text-[#4a3827]"
                                                                    }`}
                                                            />
                                                        </div>

                                                        <div className="flex min-w-0 flex-col">
                                                            <span
                                                                className={`leading-none ${isActive
                                                                        ? "text-[15px] font-semibold"
                                                                        : "text-[14px] font-medium"
                                                                    }`}
                                                                style={{
                                                                    fontFamily:
                                                                        '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                                                                    letterSpacing: "-0.015em",
                                                                }}
                                                            >
                                                                {sec.name}
                                                            </span>

                                                            <span
                                                                className="mt-0.75 text-[8px] uppercase tracking-[0.22em] opacity-45"
                                                                style={{
                                                                    fontFamily:
                                                                        '"Segoe Print", "Bradley Hand", cursive',
                                                                }}
                                                            >
                                                                {sec.number}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* RIGHT DOT */}
                                                    <div className="relative z-10 flex items-center justify-center">
                                                        <div
                                                            className="relative h-3 w-3 rounded-full"
                                                            style={{
                                                                border: isActive
                                                                    ? "1.5px solid #2c2117"
                                                                    : "1px solid rgba(69,51,36,.72)",
                                                                background: isActive
                                                                    ? "#2c2117"
                                                                    : "transparent",
                                                                boxShadow: isActive
                                                                    ? "0 0 0 3px rgba(44,33,23,.07)"
                                                                    : "none",
                                                            }}
                                                        >
                                                            {isActive && (
                                                                <span
                                                                    className="absolute -inset-0.75 rounded-full"
                                                                    style={{
                                                                        border:
                                                                            "1px dashed rgba(44,33,23,.28)",
                                                                        transform: "rotate(18deg)",
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* HOVER PEN STROKE */}
                                                    <motion.span
                                                        initial={{
                                                            scaleX: 0,
                                                            opacity: 0,
                                                        }}
                                                        whileHover={{
                                                            scaleX: 1,
                                                            opacity: 1,
                                                        }}
                                                        transition={{
                                                            duration: 0.25,
                                                        }}
                                                        className="pointer-events-none absolute bottom-1.75 left-11.75 right-9 h-px origin-left"
                                                        style={{
                                                            background:
                                                                "linear-gradient(90deg, rgba(50,36,24,.7), rgba(50,36,24,.15))",
                                                            transform: "rotate(-1deg)",
                                                        }}
                                                    />
                                                </motion.button>
                                            );
                                        })}
                                    </div>

                                    {/* LITTLE SKETCH NOTE */}
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        animate={{
                                            opacity: 0.6,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: 0.45,
                                            duration: 0.3,
                                        }}
                                        className="relative z-10 -mt-2 flex items-center gap-2"
                                        style={{
                                            fontFamily:
                                                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                                            color: "#dfcdb0",
                                        }}
                                    >
                                        <span
                                            className="h-px w-5 opacity-50"
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, transparent, #dfcdb0)",
                                                transform: "rotate(-3deg)",
                                            }}
                                        />

                                        <span className="text-[9px] tracking-[0.12em]">
                                            scroll / click
                                        </span>

                                        <span
                                            className="h-px w-5 opacity-50"
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, #dfcdb0, transparent)",
                                                transform: "rotate(3deg)",
                                            }}
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}