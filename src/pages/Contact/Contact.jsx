import { useState } from "react";

export default function Contact() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState();
    const [messageError, setMessageError] = useState();

    function sendEmail(e) {
        e.preventDefault();

        let name = e.target[0].value;
        let company = e.target[1].value;

        if (name === "") name = `<em>Donnée non rentrée</em>`;
        if (company === "") company = `<em>Donnée non rentrée</em>`;
        if (email === "") setEmailError(true);
        if (message === "") setMessageError(true);
        if (message === "" || email === "") return;

        // eslint-disable-next-line no-undef
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: import.meta.env.VITE_EMAIL,
            Password: import.meta.env.VITE_PASSWORD,
            To: import.meta.env.VITE_EMAIL,
            From: import.meta.env.VITE_EMAIL,
            Subject: "Portfolio Message",
            Body: `<strong>Nom/Prénom :</strong> ${name}<br><strong>Entreprise :</strong> ${company}<br><strong>Email :</strong> ${email}<br><strong>Message :</strong> ${message}`,
        }).then((message) => alert(message));
    }

    return (
        <div className="h-full text-slate-100 flex justify-center items-center">
            <div className="bg-[#120b2a] p-4 sm:px-14 sm:py-10 my-10 sm:my-20 rounded-md border border-slate-100/30 shadow-md shadow-slate-100/15 overflow-auto">
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
                <form onSubmit={sendEmail} className="mt-10">
                    <section className="flex flex-col sm:flex-row">
                        <div>
                            <label htmlFor="name" className="block">
                                Nom & Prénom
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="text-slate-950 w-full sm:w-[189px] sm:mr-6"
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="block">
                                Entreprise
                            </label>
                            <input
                                type="text"
                                id="company"
                                className="text-slate-950 w-full sm:w-[189px]"
                            />
                        </div>
                    </section>
                    <div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <span className="text-yellow-300 text-xs"> *</span>
                        </div>
                        <input
                            type="email"
                            id="email"
                            className="text-slate-950 w-full sm:w-[402px]"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(false);
                            }}
                        />
                        {emailError && (
                            <p className="text-red-600 text-sm">
                                Veuillez remplir ce champ
                            </p>
                        )}
                    </div>
                    <div>
                        <div>
                            <label htmlFor="message">Votre message</label>
                            <span className="text-yellow-300 text-xs"> *</span>
                        </div>
                        <textarea
                            type="text"
                            id="message"
                            className="text-slate-950 w-full sm:w-[402px]"
                            onChange={(e) => {
                                setMessage(e.target.value);
                                setMessageError(false);
                            }}
                        />
                        {messageError && (
                            <p className="text-red-600 text-sm">
                                Veuillez remplir ce champ
                            </p>
                        )}
                    </div>
                    <p className="text-yellow-200 text-xs">
                        * Ces champs sont réquis pour pouvoir envoyer votre
                        message
                    </p>
                    <button>Envoyer</button>
                </form>
            </div>
        </div>
    );
}
