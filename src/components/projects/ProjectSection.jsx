import { MoveRight } from "lucide-react";
import Link from "next/link";

const ProjectSection = ({ project, index, setIsPaused, sectionRefs }) => {
    return (
        <section
            className={`h-full w-full flex mb-4 absolute ${
                index === 0 ? "z-40" : ""
            }`}
            ref={(el) => (sectionRefs.current[index] = el)}
        >
            <div
                className={`w-full md:w-1/2 h-full`}
                style={{ background: project.bgColorLeft }}
            >
                {index % 2 === 0 ? (
                    <div className="w-full h-full flex items-end">
                        <article className="text-white mb-24 w-full pl-20 pr-[20%]">
                            <h2 className="text-3xl font-semibold">
                                {project.title}
                            </h2>
                            <p className="text-lg leading-6 mt-1.5">
                                {project.paragraph}
                            </p>
                            <Link
                                href={`/projects/${project.slug}`}
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                                className="border mt-6 px-6 py-2 rounded-full hover:bg-white hover:text-black hover:scale-[1.08] transition-all duration-300 font-semibold inline-flex items-center gap-2"
                            >
                                Voir le Projet
                                <MoveRight
                                    width={24}
                                    height={24}
                                    className="mt-0.5"
                                />
                            </Link>
                        </article>
                    </div>
                ) : (
                    <div className="w-full h-full flex justify-center items-center">
                        <img
                            src={`/img/${project.img}`}
                            alt=""
                            className={project.class}
                        />
                    </div>
                )}
            </div>
            <div
                className={`w-full md:w-1/2 h-full`}
                style={{ background: project.bgColorRight }}
            >
                {index % 2 !== 0 ? (
                    <div className="w-full h-full flex items-end">
                        <article className="text-white mb-16 w-full pl-[20%] pr-20">
                            <h2 className="text-3xl font-bold">
                                {project.title}
                            </h2>
                            <p className="text-lg leading-6 mt-1.5">
                                {project.paragraph}
                            </p>
                            <Link
                                href={`/projects/${project.slug}`}
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                                className="border mt-6 px-6 py-2 rounded-full hover:bg-white hover:text-black hover:scale-[1.08] transition-all duration-300 font-semibold inline-flex items-center gap-2"
                            >
                                Voir le Projet
                                <MoveRight
                                    width={24}
                                    height={24}
                                    className="mt-0.5"
                                />
                            </Link>
                        </article>
                    </div>
                ) : (
                    <div className="w-full h-full flex justify-center items-center relative">
                        <img
                            src={`/img/${project.img}`}
                            alt=""
                            className={project.class}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectSection;
