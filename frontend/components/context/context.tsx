"use client";
import { ethers } from "ethers";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { contractAbi, contractAddress } from "../utils/constants";
import { getCookie, setCookie } from "cookies-next";
import toast from "react-hot-toast";
import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

// Define a type for the context value
interface TransactionContextValue {
  connectWallet: () => void;
  sendTransaction: () => void;
  fetchTransactions: () => void;
  setReceiverAddress: (address: string) => void;
  setAmount: (amount: string) => void;
  setMessage: (message: string) => void;
  currentAccount: string | null;
  receiverAddress: string;
  amount: string;
  message: string;
  transactionCount: Number | undefined;
  isLoading: boolean;
  userTransactions: Array<object>;
}

// Providing a default value to transactionCOntext
// const defaultContextValue: TransactionContextValue = {};

// Create the context with a default value
export const TransactionContext = createContext<
  TransactionContextValue | undefined
>(undefined);

interface TransactionProviderProps {
  children: ReactNode;
}

const { ethereum } = window;

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [userTransactions, setUserTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(
    Number(getCookie("TxCount"))
  );
  const [isLoading, setIsLoading] = useState(false);

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
        fetchTransactions();
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
        console.log("currentTransactionCount", currentTransactionCount);
        setCookie("TxCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const transactionContract = await createEthereumContract();
        console.log(transactionContract, "transactionContract created");
        const parsedAmount = ethers.parseEther(amount);

        console.log(currentAccount, receiverAddress, parsedAmount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: receiverAddress,
              gas: "0x5208",
              value: parsedAmount.toString(),
            },
          ],
        });

        const transactionHash = await transactionContract.addTransaction(
          receiverAddress,
          parsedAmount,
          message
        );
        setIsLoading(true);
        console.log("Loading.......");
        await transactionHash.wait();
        console.log("Sucesss");
        setIsLoading(false);

        const transactionCount =
          await transactionContract.getTransactionsCount();
        setTransactionCount(Number(transactionCount));
        // window.location.reload();
      } else {
        console.log("No Ethereum Object Founc");
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      if (ethereum) {
        const transactionContract = await createEthereumContract();
        const availableTransactions =
          await transactionContract.getAllTransactions();

        const formattedTransactions = availableTransactions.map(
          (transaction: any) => {
            const timestampInMilliseconds = Number(transaction[4]) * 1000;
            const date = new Date(timestampInMilliseconds);

            return {
              receiverAddress: transaction[0],
              senderAddress: transaction[1],
              amount: parseInt(transaction[2].toString(), 10) / 10 ** 18,
              message: transaction[3],
              timestamp: timeAgo.format(date, "mini"),
            };
          }
        );

        setUserTransactions(formattedTransactions);
      } else {
        console.log("No Ethereum Object Founc");
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    isWalletConnected();
    isTransactionExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        setAmount,
        setMessage,
        connectWallet,
        sendTransaction,
        setReceiverAddress,
        fetchTransactions,
        currentAccount,
        receiverAddress,
        amount,
        message,
        isLoading,
        transactionCount,
        userTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
