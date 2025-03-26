import React from 'react'

export const Input = ({ placeholder, value, onChange, type = "text" }) => {
    return (
      <input
        type={type}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  };