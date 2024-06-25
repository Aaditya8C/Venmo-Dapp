"use client";
import { ethers } from "ethers";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { contractAbi, contractAddress } from "../utils/constants";
import { getCookie, setCookie } from "cookies-next";

// Define a type for the context value
interface TransactionContextValue {}

// Providing a default value to transactionCOntext
const defaultContextValue: TransactionContextValue = {};

// Create the context with a default value
export const TransactionContext =
  createContext<TransactionContextValue>(defaultContextValue);

interface TransactionProviderProps {
  children: ReactNode;
}

const { ethereum } = window;

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [transactionCount, setTransactionCount] = useState(
    getCookie("TxCount")
  );

  const isWalletConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask!!");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("Noo Accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask!!");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum account found");
    }
  };

  const createEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    return transactionContract;
  };

  const isTransactionExists = async () => {
    try {
      if (ethereum) {
        const transactionContract = await createEthereumContract();

        const currentTransactionCount =
          await transactionContract.getTransactionsCount();
        console.log(currentTransactionCount);
        setCookie("TxCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isWalletConnected();
    isTransactionExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
      {children}
    </TransactionContext.Provider>
  );
};
