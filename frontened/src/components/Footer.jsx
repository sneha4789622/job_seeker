import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Companies } from "../componentsData/FooterD";
import {
  faFacebook,
  faGooglePlus,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="flex flex-col px-10 bg-blue-950 text-white text-center">
      
      {/* Social Icons */}
      <div className="flex justify-center gap-8 p-5">
        <FontAwesomeIcon icon={faFacebook} className="bg-white text-black p-2 rounded-full cursor-pointer" />
        <FontAwesomeIcon icon={faInstagram} className="bg-white text-black p-2 rounded-full cursor-pointer" />
        <FontAwesomeIcon icon={faTwitter} className="bg-white text-black p-2 rounded-full cursor-pointer" />
        <FontAwesomeIcon icon={faGooglePlus} className="bg-white text-black p-2 rounded-full cursor-pointer" />
        <FontAwesomeIcon icon={faYoutube} className="bg-white text-black p-2 rounded-full cursor-pointer" />
      </div>

      {/* Footer Links */}
      <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
        {Companies.map((section, index) => (
          <div key={index}>
            <h3 className="font-bold mb-6">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((items) => (
                <li key={items.key}>
                  <a href={items.href} className="hover:text-gray-300 transition">
                    {items.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="pb-6 text-sm text-gray-300">
        © {new Date().getFullYear()} JobSeeker. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
