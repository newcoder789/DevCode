import React from 'react'
export const Button = ({ children, onClick, variant = "primary" }) => {
    const baseStyles = "px-4 py-2 rounded-md font-semibold transition-all";
    const variants = {
      primary: "bg-blue-500 hover:bg-blue-600 text-white",
      secondary: "bg-gray-200 hover:bg-gray-300 text-black",
      danger: "bg-red-500 hover:bg-red-600 text-white",
    };
    return (
      <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
        {children}
      </button>
    );
  };