import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import shashwathImg from "./img/bg-3.jpg"; // ✅ Your image

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4skug0c",       // ✅ Your Gmail service ID
        "template_lkngsik",      // ✅ Your EmailJS template ID
        form.current,
        "WtMTZ4sLCslG_pm2i"      // ✅ Your public key
      )
      .then(() => {
        alert("✅ Message sent successfully!");
        form.current.reset();
      })
      .catch((error) => {
        console.error("❌ Email send failed:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-5xl w-full glassy-card rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-10 p-10 animate-fadeIn">
        {/* Left Side: Image */}
        <div className="flex-shrink-0">
          <img
            src={shashwathImg}
            alt="SHASHWATH G U"
            className="w-56 h-56 rounded-2xl object-cover shadow-lg border-4 border-white"
          />
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full md:w-2/3">
          <h2 className="text-4xl font-extrabold mb-6 text-center md:text-left tracking-tight text-white drop-shadow-lg">
            Contact Shashwath G U
          </h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <InputField name="name" placeholder="Your Name" />
            <InputField name="email" type="email" placeholder="Your Email" />
            <InputField name="title" placeholder="Subject Title" />
            <TextAreaField name="message" placeholder="Your Message" />
            <SendButton />
          </form>
        </div>
      </div>
    </section>
  );
}

const InputField = ({ name, type = "text", placeholder }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    required
    className="w-full px-5 py-4 rounded-xl bg-black bg-opacity-30 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105 transition-all duration-300"
  />
);

const TextAreaField = ({ name, placeholder }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    rows="4"
    required
    className="w-full px-5 py-4 rounded-xl bg-black bg-opacity-30 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105 transition-all duration-300 resize-none"
  ></textarea>
);

const SendButton = () => (
  <button
    type="submit"
    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 animate-pulse"
  >
     SEND MESSAGE
  </button>
);

export default Contact;