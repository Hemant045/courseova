import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all the details.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for reaching out! We will get back to you shortly.");
      setFormData({ name: "", email: "", message: "" });
      setErrorMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 text-center">Contact Us</h1>
        <p className="text-center text-gray-600 mb-8">
          We're always here to assist you. Fill out the form or reach us through other channels.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              rows={5}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center font-medium">{errorMessage}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Other Ways to Reach Us</h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            You can also reach us at:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
            <a
              href="https://wa.me/919257372495"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-green-600 hover:text-green-800 transition"
            >
              <FaWhatsapp className="text-3xl sm:text-4xl mb-2" />
              <span>WhatsApp</span>
              <small className="text-gray-500">+91 92573 72495</small>
            </a>
            <a
              href="mailto:hemantvaishnav2222@gmail.com"
              className="flex flex-col items-center text-red-600 hover:text-red-800 transition"
            >
              <FaEnvelope className="text-3xl sm:text-4xl mb-2" />
              <span>Email</span>
              <small className="text-gray-500">hemantvaishnav2222@gmail.com</small>
            </a>
            <a
              href="https://instagram.com/courseova"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-pink-600 hover:text-pink-800 transition"
            >
              <FaInstagram className="text-3xl sm:text-4xl mb-2" />
              <span>Instagram</span>
              <small className="text-gray-500">@Courseova</small>
            </a>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-center text-xl font-semibold text-gray-900 mb-4">Our Location</h3>
          <iframe
            className="w-full h-60 rounded-md shadow-md"
            src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_URL"
            loading="lazy"
            allowFullScreen
            title="Our Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
