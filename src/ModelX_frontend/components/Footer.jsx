import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-4 gap-8">
          {/* Website Column */}
          <div>
            <h3 className="text-lg font-semibold font-['Inter'] leading-7">Website</h3>
            <ul className="mt-4 space-y-2">
              {["Models", "Datasets", "Spaces", "Tasks", "Inference Endpoints", "HuggingChat"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-base font-normal font-['Inter'] leading-normal text-black hover:text-gray-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold font-['Inter'] leading-7">Company</h3>
            <ul className="mt-4 space-y-2">
              {["About", "Brand assets", "Terms of service", "Privacy", "Jobs", "Press"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-base font-normal font-['Inter'] leading-normal text-black hover:text-gray-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold font-['Inter'] leading-7">Resources</h3>
            <ul className="mt-4 space-y-2">
              {["Learn", "Documentation", "Blog", "Forum", "Service Status"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-base font-normal font-['Inter'] leading-normal text-black hover:text-gray-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="text-lg font-semibold font-['Inter'] leading-7">Social</h3>
            <ul className="mt-4 space-y-2">
              {["GitHub", "Twitter", "LinkedIn", "Discord"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={`https://${item.toLowerCase()}.com`}
                    className="text-base font-normal font-['Inter'] leading-normal text-black hover:text-gray-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;