export default function Contact() {
    function sendEmail(e) {
        e.preventDefault();

        // eslint-disable-next-line no-undef
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: import.meta.env.VITE_EMAIL,
            Password: import.meta.env.VITE_PASSWORD,
            To: import.meta.env.VITE_EMAIL,
            From: import.meta.env.VITE_EMAIL,
            Subject: "This is the subject",
            Body: "And this is the body",
        }).then((message) => alert(message));
    }

    return (
        <div className="h-full text-slate-100 flex justify-center">
            <div className="bg-[#120b2a] px-14 py-10 my-20 rounded-md border border-slate-100/30 shadow-md shadow-slate-100/15">
                <h2 className="text-4xl underline underline-offset-8 decoration-yellow-300">
                    Contact
                </h2>
                <section className="mt-6 text-lg">
                    <p>N&apos;hésitez pas à me contacter.</p>
                    <p>
                        Nous pourrons parler plus en détails de mon expérience,
                        mes compétences, votre entreprise, vos projets...
                    </p>
                </section>
                <form onSubmit={sendEmail} className="mt-14">
                    <section className="flex">
                        <div>
                            <label htmlFor="name" className="block">
                                Nom & Prénom
                            </label>
                            <input type="text" id="name" />
                        </div>
                        <div>
                            <label htmlFor="company" className="block">
                                Entreprise
                            </label>
                            <input type="text" id="company" />
                        </div>
                    </section>
                    <div>
                        <label htmlFor="email" className="block">
                            Email
                        </label>
                        <span> *</span>
                        <input type="text" id="email" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block">
                            Votre message
                        </label>
                        <span> *</span>
                        <textarea type="text" id="message" />
                    </div>
                    <p>
                        * Ces champs sont réquis pour pouvoir envoyer votre
                        message
                    </p>
                    <button>Envoyer</button>
                </form>
            </div>
        </div>
    );
}
