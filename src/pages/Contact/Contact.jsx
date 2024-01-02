import { useState } from "react";

export default function Contact() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState();
    const [messageError, setMessageError] = useState();
    const [emailInvalid, setEmailInvalid] = useState();

    function sendEmail(e) {
        e.preventDefault();

        let name = e.target[0].value || "<em>Donnée non rentrée</em>";
        let company = e.target[1].value || "<em>Donnée non rentrée</em>";

        if (email === "") setEmailError(true);
        if (message === "") setMessageError(true);
        if (!checkEmail(email) && email !== "") return setEmailInvalid(true);

        if (message && email) {
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
    }

    function checkEmail(email) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    }

    return (
        <div className="h-full text-slate-100 flex justify-center items-center">
            <div className="bg-[#120b2a] p-6 sm:px-14 sm:py-10 my-10 sm:my-20 rounded-md border border-slate-100/30 shadow-md shadow-slate-100/15 overflow-auto">
                <h2 className="text-4xl underline underline-offset-8 decoration-yellow-300 font-semibold">
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
                                className="text-slate-950 w-full sm:w-[189px] sm:mr-6 px-2 py-1 border border-yellow-300 rounded-sm"
                            />
                        </div>
                        <div className="mt-2 sm:mt-0">
                            <label htmlFor="company" className="block">
                                Entreprise
                            </label>
                            <input
                                type="text"
                                id="company"
                                className="text-slate-950 w-full sm:w-[189px] px-2 py-1 border border-yellow-300 rounded-sm"
                            />
                        </div>
                    </section>
                    <div className="mt-2">
                        <div>
                            <label htmlFor="email">Email</label>
                            <span className="text-yellow-300 text-xs"> *</span>
                        </div>
                        <input
                            type="email"
                            id="email"
                            className="text-slate-950 w-full sm:w-[402px] px-2 py-1 border border-yellow-300 rounded-sm"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(false);
                                setEmailInvalid(false);
                            }}
                        />
                        {emailError && (
                            <p className="text-red-600 text-sm">
                                Veuillez remplir ce champ
                            </p>
                        )}
                        {emailInvalid && (
                            <p className="text-red-600 text-sm">
                                Email invalide
                            </p>
                        )}
                    </div>
                    <div className="mt-2">
                        <div>
                            <label htmlFor="message">Votre message</label>
                            <span className="text-yellow-300 text-xs"> *</span>
                        </div>
                        <textarea
                            type="text"
                            id="message"
                            className="text-slate-950 w-full sm:w-[402px] min-h-[100px] px-2 py-1 border border-yellow-300 rounded-sm"
                            onChange={(e) => {
                                setMessage(e.target.value);
                                setMessageError(false);
                            }}
                        />
                        {messageError && (
                            <p className="text-red-600 text-sm -translate-y-1.5">
                                Veuillez remplir ce champ
                            </p>
                        )}
                    </div>
                    <button className="bg-slate-200 px-6 py-2 rounded text-slate-950 mt-6 hover:bg-slate-300">
                        Envoyer
                    </button>
                    <p className="text-yellow-200/80 text-xs mt-4">
                        * Ces champs sont réquis pour pouvoir envoyer votre
                        message
                    </p>
                </form>
            </div>
        </div>
    );
}
