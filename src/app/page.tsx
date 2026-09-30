import FloatingNavigator from "@/components/FloatingNavigator";
import FullPageScroll from "@/components/FullPageScroll";
import About from "@/components/sections/About";
import BeyondCode from "@/components/sections/BeyondCode";
import ContactSection from "@/components/sections/ContactSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import JourneyExperience from "@/components/sections/JourneyExperience";
import Skills from "@/components/sections/Skills";

export default function Page() {
    return (
        <main className="relative h-svh w-full overflow-hidden bg-[#0f1217]">
            {/* گوی ناوبری شناور و قابل جابه‌جایی */}
            <FloatingNavigator />

            {/* کنترل‌کننده اسکرول تمام‌صفحه */}
            <FullPageScroll>
                <section data-snap id="hero" className="h-svh">
                    <Hero />
                </section>

                <section data-snap id="about" className="h-svh bg-[#0f1217] text-white">
                    <About />
                </section>

                <section data-snap id="projects" className="h-svh bg-[#0f1217] text-white">
                    <FeaturedProjects />
                </section>

                <section data-snap id="skills" className="h-svh bg-[#0f1217] text-white">
                    <Skills />
                </section>

                <section data-snap id="journey" className="h-svh bg-[#0f1217] text-white">
                    <JourneyExperience />
                </section>

                <section data-snap id="beyond-code" className="h-svh bg-[#0f1217] text-white">
                    <BeyondCode />
                </section>
                <section data-snap id="ContactSection" className="h-svh bg-[#0f1217] text-white">
                    <ContactSection/>
                </section>
            </FullPageScroll>
        </main>
    );
}

