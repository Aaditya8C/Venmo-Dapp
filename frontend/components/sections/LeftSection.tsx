import { Button, InputAdornment, TextField } from "@mui/material";
import {
  CircleDollarSign,
  Earth,
  Heart,
  MessageSquare,
  UserRound,
  Users,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { textShortner } from "../helpers/textShortner";
import { TransactionContext } from "../context/context";

const LeftSection = () => {
  const context = useContext(TransactionContext);
  const [userData, setUserData] = useState([
    {
      address: "nkdjnkdhbnikdh54+6845",
      message: "hey there myselft aaditya",
    },
    {
      address: "nkdjnkdhbnikdh54+6845",
      message: "hey there myselft aaditya",
    },
    {
      address: "nkdjnkdhbnikdh54+6845",
      message: "hey there myselft aaditya",
    },
  ]);
  if (!context) {
    return <div>Error: Context not available</div>;
  }
  const { fetchTransactions } = context;

  return (
    <div className="grid gap-10 h-fit">
      <div className=" bg-orange-200 p-10">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Activity</p>
          <div className="flex gap-4">
            <Earth />
            <UserRound />
            <Users />
          </div>
        </div>
        <hr className="w-full h-[3px] my-2 bg-black " />

        <div className="grid gap-4">
          {userData.map((item, index) => {
            return (
              <div key={index} className="flex justify-between items-center">
                <UserRound />
                <span className="flex-1 px-6 text-base">
                  <p>{textShortner(item.address)}</p>
                  <p className="font-semibold">{item.message}</p>
                </span>
                <div className="flex gap-3">
                  <Heart />
                  <MessageSquare />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
