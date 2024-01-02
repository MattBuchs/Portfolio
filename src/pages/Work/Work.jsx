export default function Work() {
    const work = [
        {
            id: 1,
            img: "/avatar.svg",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eos deserunt molestiae rerum porro, delectus illo iste, numquam laborum vel quis ipsa cum, facilis voluptas. Eligendi nisi officiis labore tempora!",
            demoLink: "#",
            sourceCodeLink: "#",
        },
        {
            id: 2,
            img: "/avatar.svg",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eos deserunt molestiae rerum porro, delectus illo iste, numquam laborum vel quis ipsa cum, facilis voluptas. Eligendi nisi officiis labore tempora!",
            demoLink: "#",
            sourceCodeLink: "#",
        },
        {
            id: 3,
            img: "/avatar.svg",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eos deserunt molestiae rerum porro, delectus illo iste, numquam laborum vel quis ipsa cum, facilis voluptas. Eligendi nisi officiis labore tempora!",
            demoLink: "#",
            sourceCodeLink: "#",
        },
        {
            id: 4,
            img: "/avatar.svg",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eos deserunt molestiae rerum porro, delectus illo iste, numquam laborum vel quis ipsa cum, facilis voluptas. Eligendi nisi officiis labore tempora!",
            demoLink: "#",
            sourceCodeLink: "#",
        },
        {
            id: 5,
            img: "/avatar.svg",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eos deserunt molestiae rerum porro, delectus illo iste, numquam laborum vel quis ipsa cum, facilis voluptas. Eligendi nisi officiis labore tempora!",
            demoLink: "#",
            sourceCodeLink: "#",
        },
    ];

    return (
        <div className="flex flex-col">
            {work.map((obj) => (
                <section
                    key={obj.id}
                    className={`bg-red-500 w-2/3 px-8 py-4 mt-20${
                        obj.id % 2 === 0 ? " self-end" : ""
                    }`}
                >
                    <div className="flex">
                        <img
                            src={obj.img}
                            alt="Illustration du projet"
                            className="w-32"
                        />
                        <p>{obj.text}</p>
                    </div>
                    <div>
                        <a href={obj.demoLink}>Demo</a>
                        <a href={obj.sourceCodeLink}>Code</a>
                    </div>
                </section>
            ))}
        </div>
    );
}
