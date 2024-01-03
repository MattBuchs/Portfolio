import "./border-animation.css";

export default function Work() {
    const work = [
        {
            id: 1,
            img: "/avatar.svg",
            title: "Titre",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eos deserunt molestiae rerum porro, delectus illo iste, numquam laborum vel quis ipsa cum, facilis voluptas. Eligendi nisi officiis labore tempora!",
            demoLink: "#",
            sourceCodeLink: "#",
        },
        {
            id: 2,
            img: "/avatar.svg",
            title: "Titre",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eos deserunt molestiae rerum porro, delectus illo iste, numquam laborum vel quis ipsa cum, facilis voluptas. Eligendi nisi officiis labore tempora!",
            demoLink: "#",
            sourceCodeLink: "#",
        },
        {
            id: 3,
            img: "/avatar.svg",
            title: "Titre",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eos deserunt molestiae rerum porro, delectus illo iste, numquam laborum vel quis ipsa cum, facilis voluptas. Eligendi nisi officiis labore tempora!",
            demoLink: "#",
            sourceCodeLink: "#",
        },
        {
            id: 4,
            img: "/avatar.svg",
            title: "Titre",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eos deserunt molestiae rerum porro, delectus illo iste, numquam laborum vel quis ipsa cum, facilis voluptas. Eligendi nisi officiis labore tempora!",
            demoLink: "#",
            sourceCodeLink: "#",
        },
        {
            id: 5,
            img: "/avatar.svg",
            title: "Titre",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eos deserunt molestiae rerum porro, delectus illo iste, numquam laborum vel quis ipsa cum, facilis voluptas. Eligendi nisi officiis labore tempora!",
            demoLink: "#",
            sourceCodeLink: "#",
        },
    ];

    return (
        <>
            <h2 className="text-4xl mt-6 text-slate-200 underline decoration-yellow-300 underline-offset-8 font-semibold">
                Work
            </h2>
            <div className="flex flex-col">
                {work.map((obj) => (
                    <article
                        key={obj.id}
                        className={`box flex bg-red-500 md:w-2/3 px-8 py-4 mt-10 rounded${
                            obj.id % 2 === 0 ? " md:self-end" : ""
                        }`}
                    >
                        <img
                            src={obj.img}
                            alt="Illustration du projet"
                            className="w-32"
                        />

                        <div>
                            <h3>{obj.title}</h3>
                            <p>{obj.text}</p>

                            <div>
                                <a href={obj.demoLink}>Demo</a>
                                <a href={obj.sourceCodeLink}>Code</a>
                            </div>
                        </div>
                        <div className="top"></div>
                        <div className="bottom"></div>
                        <div className="left"></div>
                        <div className="right"></div>
                    </article>
                ))}
            </div>
        </>
    );
}
