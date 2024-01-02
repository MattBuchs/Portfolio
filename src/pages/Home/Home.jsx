export default function Home() {
    return (
        <div className="flex items-center h-[90vh] -translate-y-10">
            <section className="w-1/2 bg-[#120b2a] text-slate-200 py-8 px-12 rounded shadow">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae dolores velit, labore ducimus eveniet aperiam
                    amet, perferendis quidem quas placeat, illo tempora ipsa
                    reiciendis impedit adipisci expedita voluptatibus voluptatem
                    blanditiis dolore voluptas odio? Necessitatibus totam
                    praesentium vitae sed nostrum eum a hic blanditiis earum at
                    odit expedita corrupti, sint cupiditate.
                </p>
            </section>
            <section className="w-1/2 h-2/3 ml-16 p-4 border rounded-lg shadow flex items-center justify-center">
                <img
                    src="/avatar.svg"
                    alt="Photo de profil"
                    className="h-full"
                />
            </section>
        </div>
    );
}
