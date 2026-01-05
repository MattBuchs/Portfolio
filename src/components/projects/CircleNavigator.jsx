const CircleNavigator = ({
    projects,
    getCirclePosition,
    handleCircleClick,
    progress,
    setIsPaused,
    circleRefs,
}) => {
    const radius = 200; // Rayon du grand cercle
    const positionX = 225;
    const positionY = 225;
    const smallCircleRadius = 11;

    return (
        <section className="hidden md:block absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-112.5 h-112.5">
            <svg width="450" height="450" xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx={positionX}
                    cy={positionY}
                    r={radius}
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                    className="drop-shadow-custom-shadow"
                />
                <circle
                    cx={positionX}
                    cy={positionY}
                    r={radius}
                    stroke="#000"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`0 ${2 * Math.PI * radius}`}
                    strokeDashoffset={`${
                        ((100 - progress) / 100) * (2 * Math.PI * radius) +
                        0.25 * (2 * Math.PI * radius)
                    }`}
                />
                {projects.map((project, index) => {
                    const { x, y } = getCirclePosition(index);
                    return (
                        <g
                            key={project.id}
                            transform={`translate(${x}, ${y})`}
                            className="cursor-pointer"
                            onClick={() => handleCircleClick(index)}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <circle
                                cx="0"
                                cy="0"
                                r={smallCircleRadius}
                                fill="#fff"
                                stroke="#00000040"
                                strokeWidth="1"
                                className="transition-transform transform hover:scale-150 drop-shadow-custom-shadow-circle"
                                ref={(el) => (circleRefs.current[index] = el)}
                            />
                        </g>
                    );
                })}
            </svg>
        </section>
    );
};

export default CircleNavigator;
