"use client";

import {
    AnimatePresence,
    motion,
    useAnimation,
    useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

interface ProjectItem {
    id: string;
    title: string;
    subtitle: string;
    tags: string[];
    link: string;
    theme: "dark" | "sand" | "black";
    cardBgSrc: string;
}

const projects: ProjectItem[] = [
    {
        id: "tanacentre",
        title: "TanaCentre",
        subtitle: "E-Commerce Platform",
        tags: ["Next.js", "WordPress", "WooCommerce"],
        link: "https://www.tanakora.online",
        theme: "sand",
        cardBgSrc: "/images/tanacentre-bg.webp",
    },
    {
        id: "KeivaniFragrance",
        title: "Keivani Fragrance",
        subtitle: "Luxury & Branding Website",
        tags: ["Next.js", "Node.js", "TailwindCSS"],
        link: "https://www.keivanifragrance.com",
        theme: "dark",
        cardBgSrc: "/images/Keivani-bg.webp",
    },
    {
        id: "tanacentre-seller",
        title: "TanaCentre Sellers",
        subtitle: "Vendor Management & Multi-vendor Dashboard",
        tags: ["Next.js", "React", "REST API", "Tailwind CSS"],
        link: "https://www.tanaseller.ir",
        theme: "sand",
        cardBgSrc: "/images/tanaseller-bg.webp",
    },
];

/**
 * پروژه‌های این لیست در پنجره‌ی View all نمایش داده می‌شوند.
 * پروژه‌های featured صفحه هم به‌صورت خودکار در ابتدای این لیست هستند.
 */
const allProjects: ProjectItem[] = [
    ...projects,

    // ⬇️ ADD MORE PROJECTS HERE
    // پروژه‌های جدیدی که اینجا اضافه شوند فقط در پاپ‌آپ View all دیده می‌شوند.
    //
    // {
    //     id: "my-new-project",
    //     title: "My New Project",
    //     subtitle: "Project description",
    //     tags: ["Next.js", "TypeScript"],
    //     link: "https://example.com",
    //     theme: "sand",
    //     cardBgSrc: "/images/my-new-project-bg.webp",
    // },
];

interface ProjectCardProps {
    project: ProjectItem;
    isModalCard?: boolean;
}

function ProjectCard({ project, isModalCard = false }: ProjectCardProps) {
    const isSand = project.theme === "sand";

    const titleColor = isSand ? "text-[#1A1A1A]" : "text-white";
    const subtitleColor = isSand ? "text-[#5C5850]" : "text-white/75";
    const tagColor = isSand ? "text-[#6B665E]" : "text-white/60";

    const cardHeight = isModalCard
        ? "h-40 sm:h-48 lg:h-56"
        : "h-35 md:h-57.5 lg:h-67.5 xl:h-72.5";

    return (
        <motion.article
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className={`group relative w-full ${cardHeight} overflow-hidden rounded-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)] md:rounded-3xl`}
        >
            {/* Card Background */}
            <div className="absolute inset-0">
                <Image
                    src={project.cardBgSrc}
                    alt={`${project.title} preview`}
                    fill
                    quality={90}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />

                <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                        isSand
                            ? "bg-[#EFECE6]/35 group-hover:opacity-20"
                            : "bg-black/40 group-hover:opacity-30"
                    }`}
                />

                <div
                    className={`absolute inset-0 ${
                        isSand
                            ? "bg-linear-to-r from-[#EFECE6]/90 via-[#EFECE6]/40 to-transparent"
                            : "bg-linear-to-r from-black/80 via-black/35 to-transparent"
                    }`}
                />
            </div>

            {/* Card Content */}
            <div className="relative z-10 flex h-full items-center justify-between p-4 md:p-7 lg:p-8">
                <motion.div
                    variants={fadeInUp}
                    className="flex h-full max-w-[65%] flex-col justify-between"
                >
                    <div>
                        <h3
                            className={`text-[18px] leading-tight font-bold tracking-tight sm:text-[20px] md:text-[26px] lg:text-[30px] ${titleColor}`}
                        >
                            {project.title}
                        </h3>

                        <p
                            className={`mt-1 text-[11px] leading-relaxed font-medium sm:text-[12px] md:text-[14px] lg:text-[15px] ${subtitleColor}`}
                        >
                            {project.subtitle}
                        </p>
                    </div>

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-wrap items-center gap-1.5 pt-2 md:gap-2"
                    >
                        {project.tags.map((tag, index) => (
                            <span
                                key={`${project.id}-${tag}`}
                                className={`text-[9px] font-medium sm:text-[10px] md:text-[12px] lg:text-[13px] ${tagColor}`}
                            >
                                {tag}
                                {index < project.tags.length - 1 && (
                                    <span className="ml-1.5 opacity-40 md:ml-2">
                                        •
                                    </span>
                                )}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="relative flex h-full items-end justify-end"
                >
                    <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title}`}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-all duration-300 group-hover:scale-110 md:h-12 md:w-12 ${
                            isSand
                                ? "border-[#1A1A1A]/20 bg-white/40 text-[#1A1A1A] backdrop-blur-md hover:border-[#1A1A1A]/40 hover:bg-white"
                                : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/25"
                        }`}
                    >
                        <span className="text-[13px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:text-[16px]">
                            ↗
                        </span>
                    </Link>
                </motion.div>
            </div>
        </motion.article>
    );
}

export default function FeaturedProjects() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const viewAllButtonRef = useRef<HTMLButtonElement | null>(null);
    const dialogRef = useRef<HTMLDivElement | null>(null);

    const isInView = useInView(sectionRef, { amount: 0.35 });
    const controls = useAnimation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    useEffect(() => {
        if (!isModalOpen) return;

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        dialogRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsModalOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
            viewAllButtonRef.current?.focus();
        };
    }, [isModalOpen]);

    return (
        <>
            <section
                ref={sectionRef}
                className="relative min-h-screen w-full overflow-hidden px-5 py-8 text-[#1A1A1A] select-none md:px-12 md:py-16 lg:px-20 lg:py-24"
            >
                {/* Background layer */}
                <div className="pointer-events-none absolute inset-0 z-0">
                    <Image
                        src="/images/mountains.webp"
                        alt="Section background"
                        fill
                        priority
                        quality={92}
                        className="object-cover object-bottom"
                    />

                    <div className="absolute inset-0 bg-[#EFECE6]/55" />

                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                radial-gradient(900px 450px at 15% 10%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 60%),
                                radial-gradient(800px 500px at 85% 65%, rgba(215,207,194,0.55) 0%, rgba(215,207,194,0) 65%),
                                radial-gradient(100% 100% at 50% 50%, rgba(0,0,0,0) 72%, rgba(0,0,0,0.08) 100%)
                            `,
                            backgroundRepeat: "no-repeat",
                        }}
                    />

                    <div
                        className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='0.3'/></svg>\")",
                            backgroundRepeat: "repeat",
                        }}
                    />
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={controls}
                    className="relative z-10 mx-auto flex max-w-310 flex-col justify-between"
                >
                    {/* Section Header */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col gap-1 md:gap-3"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#706E6B] uppercase md:text-[13px] lg:text-[14px]">
                                02 — SELECTED WORKS
                            </span>

                            <motion.div variants={fadeInUp}>
                                <button
                                    ref={viewAllButtonRef}
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    aria-haspopup="dialog"
                                    aria-expanded={isModalOpen}
                                    className="group inline-flex items-center gap-1.5 rounded-full border border-[#706E6B]/30 bg-white/10 px-3 py-1 text-[11px] font-medium text-[#4A4844] backdrop-blur-md transition-all duration-300 hover:border-[#1A1A1A] hover:bg-white/30 hover:text-[#1A1A1A] md:px-4 md:py-1.5 md:text-[13px]"
                                >
                                    <span>View all</span>
                                    <span className="font-mono text-[12px] transition-transform duration-300 group-hover:rotate-90 md:text-[14px]">
                                        ⊕
                                    </span>
                                </button>
                            </motion.div>
                        </div>

                        <motion.h2
                            variants={fadeInUp}
                            className="encode-sans-semi-expanded-medium jua-thick text-[28px] tracking-tight text-[#1A1A1A] sm:text-[34px] md:text-[48px] lg:text-[56px]"
                        >
                            Featured{" "}
                            <span className="text-[#9E624A]">Projects</span>
                        </motion.h2>
                    </motion.div>

                    {/* Project grid */}
                    <motion.div
                        variants={staggerContainer}
                        className="mt-8 flex flex-col gap-4 md:mt-12 md:grid md:grid-cols-2 md:gap-6 lg:gap-8"
                    >
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}

                        {/* Scroll indicator */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center justify-start gap-2 pr-1 pt-9 md:gap-3 md:pr-2"
                            aria-hidden="true"
                        >
                            <span
                                className="text-[15px] tracking-wide text-[#9E624A] select-none md:text-[17px]"
                                style={{
                                    fontFamily:
                                        '"Caveat", "Segoe Print", "Bradley Hand", cursive',
                                }}
                            >
                                scroll down
                            </span>

                            <svg
                                className="h-9 w-5 text-[#9E624A] will-change-transform md:h-10 md:w-6"
                                viewBox="0 0 20 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ transform: "translateZ(0)" }}
                            >
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
                </motion.div>
            </section>

            {/* View all projects modal */}
            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {isModalOpen && (
                            <motion.div
                                key="projects-modal"
                                className="fixed inset-0 z-100 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm sm:p-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={(event) => {
                                    if (event.target === event.currentTarget) {
                                        setIsModalOpen(false);
                                    }
                                }}
                            >
                                <motion.div
                                    ref={dialogRef}
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="all-projects-title"
                                    tabIndex={-1}
                                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                    transition={{
                                        duration: 0.25,
                                        ease: EASE_OUT,
                                    }}
                                    className="flex max-h-[88dvh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/30 bg-[#EFECE6] shadow-2xl outline-none"
                                >
                                    {/* Modal header */}
                                    <div className="flex shrink-0 items-center justify-between border-b border-[#D8D4CC] px-5 py-4 sm:px-7 sm:py-5">
                                        <div>
                                            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#706E6B] uppercase sm:text-[11px]">
                                                PROJECT ARCHIVE
                                            </span>
                                            <h2
                                                id="all-projects-title"
                                                className="jua-thick mt-1 text-2xl tracking-tight text-[#1A1A1A] sm:text-3xl"
                                            >
                                                All{" "}
                                                <span className="text-[#9E624A]">
                                                    Projects
                                                </span>
                                            </h2>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsModalOpen(false)
                                            }
                                            aria-label="Close projects"
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#706E6B]/25 bg-white/50 text-2xl text-[#4A4844] transition-colors hover:bg-white"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    {/* Modal project cards */}
                                    <motion.div
                                        variants={staggerContainer}
                                        initial="hidden"
                                        animate="visible"
                                        className="min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6"
                                    >
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                                            {allProjects.map((project) => (
                                                <ProjectCard
                                                    key={project.id}
                                                    project={project}
                                                    isModalCard
                                                />
                                            ))}

                                            {/* ⬇️ Add more projects in the allProjects array above. */}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </>
    );
}
