import React from "react";

export default function HomePage() {
  return (
    <div className="bg-gray-100">
      <header className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Token Landing Page
          </h1>
        </div>
      </header>
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src="/path/to/your/image.jpg"
                alt="Landing Page Image"
                className="w-full"
              />
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Discover Our Amazing Features
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                tristique commodo est. Sed nec dignissim justo. Fusce semper,
                arcu eu lacinia sagittis, metus leo pellentesque lacus.
              </p>
              <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
