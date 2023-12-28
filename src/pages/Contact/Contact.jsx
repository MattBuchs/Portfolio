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
        <form onSubmit={sendEmail}>
            <input type="text" />
            <input type="text" />
            <button>Envoyer</button>
        </form>
    );
}
