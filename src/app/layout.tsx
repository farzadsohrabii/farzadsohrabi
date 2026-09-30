import type { Metadata } from "next";
import "./globals.css";





export const metadata: Metadata = {
  title: "Farzad Sohrabi | Frontend Developer",
  
  description: "Frontend Developer specialized in React, Next.js, and Tailwind CSS. Focused on building responsive and clean user interfaces.",
 
  icons: {
    icon: "/f-icon.svg",
  },

  keywords:[
    "Farzad",
    "Sohrabi",
    "farzad",
    "sohrabi",
    "Farzad Sohrabi",
    "farzad sohrabi",
    "Farzad sohrabi",
    "farzad Sohrabi",
    "Frontend developer",
    "Frontend",
    "nextjs",
    "next.js",
    "Next.JS",
    "فرزاد سهرابی",
    "فرزاد",
    "سهرابی",
    "فرانت اند",
    "برنامه نویس",
    "طراح سایت",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
