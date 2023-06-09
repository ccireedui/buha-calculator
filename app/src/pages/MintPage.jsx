import React, { useEffect, useState } from "react";
import {
  getBuhaTokenReadContract,
  getBuhaTokenWriteContract,
} from "../../contracts/BuhaTokenContractHelper";
import { parse } from "../../contracts/helpers";
import moment from "moment";
import Switch from "react-switch";

export default function MintPage() {
  const [userCount, setUserCount] = useState(0);
  const [estimatedAmount, setEstimatedAmount] = useState(0);
  const [addedUserCount, setAddedUserCount] = useState(0);
  const [amp, setAmp] = useState(0);
  const [eaa, setEaa] = useState(0);
  const [termCount, setTermCount] = useState(0);
  const [maxTerm, setMaxTerm] = useState(0);
  const [isToggled, setIsToggled] = useState(false);

  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    getBuhaTokenInfo();
  }, []);

  useEffect(() => {
    getEstimatedAmount();
  }, [addedUserCount, termCount]);

  const handleTermCountChange = (e) => {
    if (e.target.value > maxTerm) {
      setTermCount(maxTerm);
      return;
    }
    if (e.target.value < 1) {
      setTermCount(maxTerm);
      return;
    }
    if (e.target.value.startsWith("0")) {
      e.target.value = e.target.value.slice(1);
    }
    setTermCount(e.target.value);
  };

  const handleAddedUserCountChange = (e) => {
    const { value } = e.target;

    if (/[^\d]/.test(value)) {
      setAddedUserCount(value.replace(/[^\d]/g, ""));
    } else {
      if (value.startsWith("0") && value.length > 1 && value[1] !== "0") {
        setAddedUserCount(value[1]);
      } else {
        setAddedUserCount(value);
      }
    }
  };

  const handleToggleChange = () => {
    setIsToggled(!isToggled);
  };

  const handleMint = (e) => {
    e.preventDefault();
    mintBuha();
  };

  return (
    <div className="bg-gray-100">
      <header className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Mint Page
          </h1>
        </div>
      </header>
      <main className="py-10">
        <form className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Mint Buha
          </h2>
          <div className="mb-4 flex items-center justify-between">
            <label
              htmlFor="toggle"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Calculator:
            </label>
            <label className="switch">
              <Switch
                checked={isToggled}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor="#3B82F6"
                handleDiameter={25}
                height={20}
                width={40}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                onChange={handleToggleChange}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label
              htmlFor="userCount"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              User Count:
            </label>
            <div>{userCount}</div>
          </div>
          {isToggled && (
            <div className="mb-4 flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Users:
              </label>
              <input
                type="number"
                id="addedUserCount"
                value={addedUserCount}
                onChange={handleAddedUserCountChange}
                className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                min={0}
                style={{ MozAppearance: "textfield", appearance: "textfield" }}
              />
            </div>
          )}
          <div className="mb-4 flex items-center justify-between">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Term Days(1-{maxTerm}):
            </label>
            <input
              type="number"
              id="termCount"
              value={termCount}
              onChange={handleTermCountChange}
              className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={1}
              max={maxTerm}
              style={{ MozAppearance: "textfield", appearance: "textfield" }}
            />
          </div>
          {isToggled && (
            <div className="mb-4 flex items-center justify-between">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Estimated Amount:
              </label>
              <div>{isCalculating ? "Calculating..." : ""}</div>
              <div>{estimatedAmount}</div>
            </div>
          )}
          {isToggled ? (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl"
              // onClick={handleCalculate}
            >
              Calculate
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl"
              onClick={handleMint}
            >
              Start Minting
            </button>
          )}
        </form>
      </main>
    </div>
  );

  async function getBuhaTokenInfo() {
    const { buhaTokenReadContract } = await getBuhaTokenReadContract();
    const userCount = await buhaTokenReadContract.userCount();
    const maxTerm = await buhaTokenReadContract.getCurrentMaxTerm();
    const amp = await buhaTokenReadContract.getCurrentAMP().then((res) => {
      return res.toNumber();
    });
    const eaa = await buhaTokenReadContract.getCurrentEAAR().then((res) => {
      return res.toNumber() + 1000;
    });
    setAmp(amp);
    setEaa(eaa);
    setUserCount(userCount.toNumber());
    setMaxTerm(maxTerm.toNumber() / 86400);
  }

  function getEstimatedAmount() {
    if (addedUserCount == 0 || addedUserCount == 1) {
      setEstimatedAmount(0);
    } else {
      setEstimatedAmount(
        Math.floor((amp * termCount * Math.log2(addedUserCount) * eaa) / 1000)
      );
    }
  }

  async function mintBuha() {
    const { buhaTokenWriteContract } = await getBuhaTokenWriteContract();
    await buhaTokenWriteContract.mintBuha(
      addedUserCount,
      termCount,
      "0x9E736e9B7000c1137f6fd06190Df03ee3e45Aa61"
    );
  }
}
