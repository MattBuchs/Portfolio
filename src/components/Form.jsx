"use client";

import { useState } from "react";
import * as EmailValidator from "email-validator";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

export default function Form() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        society: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setFormData({
            lastName: "",
            firstName: "",
            email: "",
            phone: "",
            society: "",
            message: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.lastName.trim() ||
            !formData.email.trim() ||
            !formData.message.trim()
        ) {
            return setErrorMessage(
                "Veuillez remplir tous les champs obligatoires s'il vous plaît."
            );
        }

        if (!EmailValidator.validate(formData.email.trim())) {
            return setErrorMessage("Le format de l'email n'est pas valide.");
        }

        setIsSubmitting(true);
        setErrorMessage("");

        emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                formData,
                {
                    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
                }
            )
            .then(
                () => {
                    resetForm();
                    setSuccessMessage(true);
                    // Fermer automatiquement la notification après 5 secondes
                    setTimeout(() => {
                        setSuccessMessage(false);
                    }, 5000);
                },
                () => {
                    setErrorMessage(
                        "Une erreur s'est produite. Veuillez réessayer."
                    );
                }
            )
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="relative">
            <AnimatePresence>
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 shadow-lg rounded-lg px-6 py-4 max-w-md w-full flex items-center"
                    >
                        <div className="shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                            <svg
                                className="w-6 h-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-green-900 mb-1">
                                Message envoyé avec succès !
                            </h3>
                            <p className="text-green-800 text-sm">
                                Merci pour votre message. Je vous répondrai dans
                                les plus brefs délais.
                            </p>
                        </div>
                        <button
                            className="ml-auto text-green-500 hover:text-green-700"
                            onClick={() => setSuccessMessage(false)}
                            aria-label="Fermer la notification"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <form
                className="px-2 lg:px-14 py-6"
                onSubmit={handleSubmit}
                aria-label="Formulaire de contact"
            >
                <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="block md:w-[48%] mt-2">
                        <div>
                            <label
                                htmlFor="last-name"
                                className="text-gray-700 font-medium mb-1.5"
                            >
                                Nom
                            </label>
                        </div>
                        <input
                            type="text"
                            id="last-name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border-2 border-gray-300 h-11 w-full rounded-lg px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            required
                            aria-required="true"
                            aria-describedby="required-fields"
                        />
                    </div>
                    <div className="md:w-[48%] mt-2">
                        <label
                            htmlFor="first-name"
                            className="text-gray-700 font-medium mb-1.5"
                        >
                            Prénom
                        </label>
                        <span
                            className="ml-1 text-gray-500 text-xs"
                            aria-label="requis"
                        >
                            (optionnel)
                        </span>
                        <input
                            type="text"
                            id="first-name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border-2 border-gray-300 h-11 w-full rounded-lg px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="md:w-[48%] mt-2">
                        <div className="block">
                            <label
                                htmlFor="email"
                                className="text-gray-700 font-medium mb-1.5"
                            >
                                Email
                            </label>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border-2 border-gray-300 h-11 w-full rounded-lg px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            required
                            aria-required="true"
                            aria-describedby="required-fields"
                        />
                    </div>
                    <div className="md:w-[48%] mt-2">
                        <label
                            htmlFor="phone"
                            className="text-gray-700 font-medium mb-1.5"
                        >
                            Téléphone
                        </label>
                        <span
                            className="ml-1 text-gray-500 text-xs"
                            aria-label="requis"
                        >
                            (optionnel)
                        </span>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border-2 border-gray-300 h-11 w-full rounded-lg px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <label
                        htmlFor="society"
                        className="text-gray-700 font-medium mb-1.5"
                    >
                        Société
                    </label>
                    <span
                        className="ml-1 text-gray-500 text-xs"
                        aria-label="requis"
                    >
                        (optionnel)
                    </span>
                    <input
                        type="text"
                        id="society"
                        name="society"
                        value={formData.society}
                        onChange={handleChange}
                        className="border-2 border-gray-300 h-11 w-full rounded-lg px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                </div>
                <div className="mt-2">
                    <div className="block">
                        <label
                            htmlFor="message"
                            className="text-gray-700 font-medium mb-1.5"
                        >
                            Message
                        </label>
                    </div>
                    <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="resize-none border-2 border-gray-300 rounded-lg w-full h-32 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        required
                        aria-required="true"
                        aria-describedby="required-fields"
                    ></textarea>
                </div>

                {errorMessage && (
                    <motion.div
                        className="mt-4 px-4 py-3 bg-red-50 rounded-lg border-l-4 border-red-500 flex items-start"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        aria-live="assertive"
                    >
                        <svg
                            className="w-5 h-5 text-red-500 mr-3 shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="text-red-700 text-sm font-medium">
                            {errorMessage}
                        </p>
                    </motion.div>
                )}
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative flex justify-center items-center bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 mt-6 rounded-lg shadow-lg transition-all duration-300
                    will-change-transform origin-center leading-none
                    ${
                        isSubmitting
                            ? "opacity-80 cursor-not-allowed"
                            : "hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Envoi en cours...
                        </>
                    ) : (
                        <>
                            <svg
                                className="w-5 h-5 mr-2 rotate-45"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                            <span>Envoyer le message</span>
                        </>
                    )}
                </motion.button>
            </form>
        </div>
    );
}
