import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    {
      icon: Facebook,
      link: "https://facebook.com",
      hoverBg: "hover:bg-blue-600",
    },
    {
      icon: Twitter,
      link: "https://twitter.com",
      hoverBg: "hover:bg-sky-500",
    },
    {
      icon: Instagram,
      link: "https://instagram.com",
      hoverBg: "hover:bg-pink-600",
    },
    {
      icon: Linkedin,
      link: "https://linkedin.com",
      hoverBg: "hover:bg-blue-700",
    },
  ];

  return (
    <footer className="bg-black text-gray-300 w-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Previous sections remain the same */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-red-500 font-semibold text-lg mb-4">
              About Us
            </h3>
            <p className="text-sm hover:text-white transition-colors duration-300">
              We are dedicated to providing exceptional services and solutions
              to our valued customers. Our commitment to excellence drives
              everything we do.
            </p>
          </div>

          {/* Quick Links */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-red-500 font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Services", "Portfolio", "Careers", "Privacy Policy"].map(
                (item) => (
                  <li key={item} className="group">
                    <a
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="relative overflow-hidden block hover:text-white transition-colors duration-300"
                    >
                      <span className="relative z-10 inline-block transition-transform duration-300">
                        {item}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500  transition-all duration-300"></span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-red-500 font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <div className="space-y-2">
              <div className="group flex items-center gap-2 hover:text-white transition-colors duration-300">
                <Mail
                  size={16}
                  className="text-red-500 group-hover:scale-110 transition-transform duration-300"
                />
                <a href="mailto:info@company.com">info@company.com</a>
              </div>
              <div className="group flex items-center gap-2 hover:text-white transition-colors duration-300">
                <Phone
                  size={16}
                  className="text-red-500 group-hover:scale-110 transition-transform duration-300"
                />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>
            </div>
          </div>

          {/* Social Media - Enhanced version */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-red-500 font-semibold text-lg mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-6">
              {socialIcons.map((social, index) => (
                <a key={index} href={social.link} className="group relative">
                  <div
                    className={`
                    p-2 rounded-full 
                    transform transition-all duration-300
                    hover:-translate-y-2 hover:shadow-lg
                    ${social.hoverBg}
                    relative
                    before:content-['']
                    before:absolute
                    before:top-0
                    before:left-0
                    before:w-full
                    before:h-full
                    before:rounded-full
                    before:bg-current
                    before:opacity-0
                    before:scale-0
                    before:transition-all
                    before:duration-300
                    hover:before:opacity-20
                    hover:before:scale-150
                  `}
                  >
                    <social.icon
                      className="text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10"
                      size={24}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-red-900">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm group">
              <span className="group-hover:text-red-500 transition-colors duration-300">
                © {currentYear} Your Company Name. All rights reserved.
              </span>
            </p>
            <p className="text-sm mt-2 md:mt-0 group">
              Created with{" "}
              <span className="text-red-500 inline-block hover:scale-125 transition-transform duration-300">
                ♥
              </span>{" "}
              by{" "}
              <span className="group-hover:text-red-500 transition-colors duration-300">
                Your Name
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
