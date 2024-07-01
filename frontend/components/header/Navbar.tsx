"use client";
import React, { useContext } from "react";
import { TransactionContext } from "../context/context";
import { textShortner } from "../helpers/textShortner";

const Navbar = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    return <div>Error: Context not available</div>;
  }

  const { connectWallet, currentAccount } = context;

  return (
    <div className="bg-orange-300 p-8 flex items-center justify-between shadow-xl px-28">
      <p className="text-orange-900 font-bold text-3xl">Venmo</p>

      {currentAccount ? (
        <p className="font-semibold">
          Hey User, {textShortner(currentAccount)}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          className="text-white bg-orange-500 font-semibold px-4 py-3 rounded-full hover:bg-orange-600 transition-all duration-200"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Navbar;
