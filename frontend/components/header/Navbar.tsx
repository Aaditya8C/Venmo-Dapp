"use client";
import React, { useContext } from "react";
import { TransactionContext } from "../context/context";

const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const shortenAddress = (address) => {
    const first = address.slice(0, 5);
    const last = address.slice(address.length - 4);
    return first + "........" + last;
  };
  return (
    <div className="bg-orange-300 p-8 flex items-center justify-between shadow-xl px-28">
      <p className="text-orange-900 font-bold text-3xl">Venmo</p>

      {currentAccount ? (
        <p className="font-semibold">
          Hey User, {shortenAddress(currentAccount)}
        </p>
      ) : (
        <button className="text-white bg-orange-500 font-semibold px-4 py-3 rounded-full hover:bg-orange-600 transition-all duration-200">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Navbar;
