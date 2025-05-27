import { Link } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background border-t text-muted-foreground text-sm w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Branding */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-primary mb-4 -ml-1">📘 Courseova</h2>
            <p className="leading-relaxed mb-4">
              The ultimate platform for students to learn, revise, and succeed in their tech journey with curated notes and expert-led courses.
            </p>
            <p className="mb-1">📞 +91 9257372495</p>
            <p>📧 courseova45@gmail.com</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="hover:text-primary transition">Courses</Link></li>
              <li><Link to="/notes" className="hover:text-primary transition">Study Notes</Link></li>
              <li><Link to="/about" className="hover:text-primary transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
              <li><Link to="/refund-policy" className="hover:text-primary transition">Refund & Return Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-primary transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Telegram Signup */}
          {/* <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-primary mb-4">Join Our Community</h3>
            <p className="mb-4">Get course updates, study notes, and important alerts directly on Telegram.</p>
            <a
              href="https://t.me/courseova"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition"
            >
              Join us on Telegram
            </a>
          </div> */}
        </div>

        {/* Divider */}
        <div className="mt-14 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Bottom Text */}
          <p className="text-center">&copy; {new Date().getFullYear()} <span className="font-semibold text-primary">Courseova</span>. Crafted with ❤️ in India.</p>

          {/* Social Icons */}
          <div className="flex gap-5">
            <a
              href="https://wa.me/919257372495"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="hover:text-green-500 transition"
            >
              <FaWhatsapp className="h-5 w-5" />
            </a>
            <a
              href="https://t.me/CourseovaChannel"
              target="_blank"
              rel="noopener noreferrer"
              title="Telegram"
              className="hover:text-sky-500 transition"
            >
              <FaTelegramPlane className="h-5 w-5" />
            </a>
            <a
              href="mailto:courseova45@gmail.com"
              title="Email"
              className="hover:text-red-500 transition"
            >
              <FaEnvelope className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
