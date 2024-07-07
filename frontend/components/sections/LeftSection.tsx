import { Button, InputAdornment, TextField } from "@mui/material";
import {
  CircleDollarSign,
  Clock10,
  Earth,
  Heart,
  MessageSquare,
  User as UserIcon,
  Users,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { textShortner } from "../helpers/textShortner";
import { TransactionContext } from "../context/context";

interface UserTransaction {
  senderAddress: string;
  receiverAddress: string;
  message: string;
  timestamp: string;
  amount: number;
}
const LeftSection = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    return <div>Error: Context not available or failed to fetch data</div>;
  }
  const { userTransactions } = context as {
    userTransactions: UserTransaction[];
  };
  const { currentAccount } = context;
  const generateRandomAvatar = () => {
    const avatar = Math.floor(Math.random() * 1000);
    return `https://avatars.dicebear.com/api/adventurer/${
      avatar + (currentAccount || "")
    }.svg`;
  };

  console.log(userTransactions);

  return (
    <div className="grid gap-10">
      <div className="bg-orange-200 p-10">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Activity</p>
          <div className="flex gap-4">
            <Earth />
            <UserIcon />
            <Users />
          </div>
        </div>
        <hr className="w-full h-[3px] my-2 bg-black " />

        <div className="grid gap-8 h-[85%] overflow-x-scroll scrollbar-none">
          {userTransactions.length > 0 ? (
            userTransactions.map(
              (
                { senderAddress, receiverAddress, amount, timestamp, message },
                index
              ) => (
                <div key={index} className="flex justify-between items-center">
                  {/* <UserIcon /> */}
                  <img
                    src={generateRandomAvatar()}
                    alt=""
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span className="flex-1 px-6 text-base">
                    <p className="italic">
                      {textShortner(senderAddress)} {"    "}to{"    "}
                      {textShortner(receiverAddress)}
                    </p>
                    <span className="flex gap-2 items-center">
                      <p className="italic">{timestamp}</p>
                      <Earth size={18} className="text-gray-600" />
                    </span>
                    <p className="font-semibold">{message}</p>
                  </span>
                  <div className="flex gap-3">
                    <Heart />
                    <MessageSquare />
                  </div>
                </div>
              )
            )
          ) : (
            <p>No transactions available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
