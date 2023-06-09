import React, { useState, useEffect } from "react";
import Switch from "react-switch";

export default function StakePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apy, setApy] = useState(0);

  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    getBuhaTokenInfo();
  }, []);

  const handleToggleChange = () => {
    setIsToggled(!isToggled);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100">
      <header className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Stake Page
          </h1>
        </div>
      </header>
      <main className="py-10">
        <form className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Staking Form
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
              Balance:
            </label>
            <div>asdasd</div>
          </div>
          {true ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Staking Amount:
                </label>
                <input
                  type="number"
                  id="addedUserCount"
                  // value={addedUserCount}
                  // onChange={handleAddedUserCountChange}
                  className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min={0}
                  style={{
                    MozAppearance: "textfield",
                    appearance: "textfield",
                  }}
                />
              </div>
              <div className="mb-4 flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Staking Term:
                </label>
                <input
                  type="number"
                  id="addedUserCount"
                  // value={addedUserCount}
                  // onChange={handleAddedUserCountChange}
                  className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min={0}
                  style={{
                    MozAppearance: "textfield",
                    appearance: "textfield",
                  }}
                />
              </div>
            </>
          ) : (
            <div className="mb-4 flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Staking Term:
              </label>
              <input
                type="number"
                id="addedUserCount"
                // value={addedUserCount}
                // onChange={handleAddedUserCountChange}
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
              Term/Days:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Stake
          </button>
        </form>
      </main>
    </div>
  );

  async function getBuhaTokenInfo() {
    const { buhaTokenReadContract } = await getBuhaTokenReadContract();
    const apy = await buhaTokenReadContract.getCurrentAPY();
    setApy(apy);
    // uint term;
    // uint maturityTs;
    // uint amount;
    // uint apy;
  }
}
