import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">MyiStay</h3>
            <p className="text-gray-400 mb-4">
              Experience luxury and comfort at its finest. Your home away from home.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={24} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span>Rooms</span>
                </Link>
              </li>
              <li>
                <Link to="/dining" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span>Dining</span>
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span>Facilities</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-green-500" />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-green-500" />
                <span>contact@myistay.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-green-500" />
                <span>123 Luxury Avenue, Paradise City</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-2 pl-10 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 MyiStay. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;