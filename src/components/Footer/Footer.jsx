import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { url: "https://x.com/Thesourya2000", name: "Twitter" },
    { url: "https://github.com/soummyaanon", name: "GitHub" },
    { url: "https://www.linkedin.com/in/soumyapandaofficial/", name: "LinkedIn" },
  ];

  return (
    <footer className="relative py-10 text-gray-200 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to="/" className="inline-block mb-4">
              <Logo width="200px" />
            </Link>
            <p className="text-sm">
              Empowering the digital world with innovative solutions.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
  <ul className="space-y-2">
  <li className="text-gray-500">About</li>
  <li className="text-gray-500">Services</li>
  <li className="text-gray-500">Blog</li>
  <li className="text-gray-500">Contact</li>
</ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
            <ul className="flex space-x-4">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <SocialIcon
                    url={link.url}
                    className="hover:opacity-80 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ height: 40, width: 40 }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-center">
            &copy; {currentYear} Soummya Anon. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;