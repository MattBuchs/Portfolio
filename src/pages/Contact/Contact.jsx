export default function Contact() {
    function sendEmail(e) {
        e.preventDefault();

        // eslint-disable-next-line no-undef
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: import.meta.env.EMAIL,
            Password: import.meta.env.PASSWORD,
            To: import.meta.env.EMAIL,
            From: import.meta.env.EMAIL,
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
