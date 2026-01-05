"use client";

import NavBar from "@/components/Header/NavBar";
import NavbarProjects from "@/components/Header/Navbar-Projects";
import IndexProject from "@/components/projects/Index.Project";
import ProjectsMobile from "@/components/projects/Mobile/ProjectsMobile";
import { useScreenSize } from "@/hook/useScreenSize";
import { projects } from "@/lib/projects";

export default function Projects() {
    const windowSize = useScreenSize();

    return (
        <>
            {windowSize.width < 768 ? (
                <NavBar isProjectPage={true} />
            ) : (
                <NavbarProjects />
            )}

            <main>
                {windowSize.width < 768 ? (
                    <ProjectsMobile projects={projects} />
                ) : (
                    <IndexProject projects={projects} />
                )}
            </main>
        </>
    );
}
