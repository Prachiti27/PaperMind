import React from "react";
import ContactForm from "../components/ContactForm";
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-48">
        
        {/* Contact Form - Left Side */}
        <div className="bg-white p-8 rounded-2xl ml-10 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <ContactForm />
        </div>

        {/* Contact Info - Right Side */}
        <div className="flex flex-col justify-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">Contact Information</h2>
          
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-indigo-600 mt-1" />
            <p className="text-gray-700">Pune, Maharashtra, India</p>
          </div>

          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-indigo-600 mt-1" />
            <p className="text-gray-700">prachitikitey86@gmail.com</p>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-indigo-600 mt-1" />
            <p className="text-gray-700">+91 123 456 7890</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-5 mt-6">
            <Link to="#" className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link to="#" className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link to="#" className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
