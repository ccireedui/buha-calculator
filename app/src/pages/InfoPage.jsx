import React, { useState, useEffect } from "react";
import { getBuhaTokenReadContract } from "../../contracts/BuhaTokenContractHelper";

export default function InfoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getBuhaTokenInfo();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("Name:", name);
    console.log("Email:", email);
    // Reset the form
    setName("");
    setEmail("");
  };
  return (
    <div className="bg-gray-100">
      <header className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Info Page
          </h1>
        </div>
      </header>
      <main className="py-10">
        <form className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Form Example
          </h2>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
        </form>
      </main>
    </div>
  );

  async function getBuhaTokenInfo() {
    const { buhaTokenReadContract } = await getBuhaTokenReadContract();
    const name = await buhaTokenReadContract.name();
    const symbol = await buhaTokenReadContract.symbol();
    const decimals = await buhaTokenReadContract.decimals();
    const totalSupply = await buhaTokenReadContract.totalSupply();
    console.log("Name:", name);
    console.log("Symbol:", symbol);
    console.log("Decimals:", decimals);
    console.log("Total Supply:", totalSupply);
  }
}
