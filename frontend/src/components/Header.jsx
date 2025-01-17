import React from 'react';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-600 p-4 shadow-md">
      <div className="text-white text-xl font-semibold">Resume Builder</div>
      <div className="flex space-x-4">
        <button className="text-white hover:text-gray-200">Home</button>
        <button className="text-white hover:text-gray-200">About</button>
        <button className="text-white hover:text-gray-200">Contact</button>
      </div>
    </header>
  );
}
