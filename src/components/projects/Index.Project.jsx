"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProjectSection from "./ProjectSection";
import CircleNavigator from "./CircleNavigator";
import ControlButton from "./ControlButton";

export default function IndexProject({ projects }) {
    const sectionRefs = useRef([]);
    const circleRefs = useRef([]);

    const numProjects = projects.length;
    const radius = 200; // Rayon du grand cercle
    const smallCircleRadius = 9; // Rayon des petits cercles
    const positionX = 225;
    const positionY = 225;

    const getCirclePosition = useCallback(
        (index) => {
            const angle = (index / numProjects) * 2 * Math.PI - Math.PI / 2;
            const x = positionX + radius * Math.cos(angle);
            const y = positionY + radius * Math.sin(angle);
            return { x, y };
        },
        [numProjects]
    );

    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isPausedClicked, setIsPausedClicked] = useState(false);
    const [touchedProject, setTouchedProject] = useState(null);

    const getRotatingCirclePosition = (progress) => {
        const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2;
        const x = positionX + radius * Math.cos(angle);
        const y = positionY + radius * Math.sin(angle);
        return { x, y };
    };

    const updateProject = (sectionRef, circleRef) => {
        sectionRefs.current.forEach((el) => {
            if (el.classList.contains("z-40")) {
                el.classList.remove("z-40");
                el.classList.remove("animate-fadeIn");
                el.classList.add("z-30");
            }
        });
        circleRefs.current.forEach((el) =>
            el.classList.remove("animate-scaleUp")
        );

        if (sectionRef) {
            sectionRef.classList.add("z-40");
            sectionRef.classList.add("animate-fadeIn");
        }

        if (circleRef) {
            circleRef.classList.add("animate-scaleUp");
        }

        setTimeout(() => {
            sectionRefs.current.forEach((el) => {
                if (el.classList.contains("z-30")) {
                    el.classList.remove("z-30");
                }
            });
        }, 500);
    };

    useEffect(() => {
        if (isPaused || isPausedClicked) {
            return;
        }

        setIsPausedClicked(false);
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress =
                    prevProgress < 100 ? prevProgress + 0.05 : 0;

                const { x: rotatingX, y: rotatingY } =
                    getRotatingCirclePosition(newProgress);

                projects.forEach((project, index) => {
                    const { x, y } = getCirclePosition(index);
                    const distance = Math.sqrt(
                        (rotatingX - x) * (rotatingX - x) +
                            (rotatingY - y) * (rotatingY - y)
                    );
                    if (distance < smallCircleRadius + 5) {
                        if (touchedProject !== project.id) {
                            updateProject(
                                sectionRefs.current[index],
                                circleRefs.current[index]
                            );
                            setTouchedProject(project.id);
                        }
                    }
                });

                if (newProgress === 0) {
                    setTouchedProject(null);
                }

                return newProgress;
            });
        }, 10);
        return () => clearInterval(interval);
    }, [
        isPaused,
        isPausedClicked,
        touchedProject,
        projects,
        getCirclePosition,
    ]);

    const handleCircleClick = (index) => {
        const angle = (index / numProjects) * 360;
        const newProgress = (angle / 360) * 100;

        setProgress(newProgress);
        updateProject(sectionRefs.current[index], circleRefs.current[index]);
    };

    return (
        <div className="h-screen">
            {projects.map((project, index) => (
                <ProjectSection
                    key={project.id}
                    project={project}
                    index={index}
                    setIsPaused={setIsPaused}
                    sectionRefs={sectionRefs}
                />
            ))}

            <CircleNavigator
                projects={projects}
                getCirclePosition={getCirclePosition}
                handleCircleClick={handleCircleClick}
                progress={progress}
                setIsPaused={setIsPaused}
                circleRefs={circleRefs}
            />

            <ControlButton
                isPaused={isPaused}
                isPausedClicked={isPausedClicked}
                setIsPausedClicked={setIsPausedClicked}
            />
        </div>
    );
}
