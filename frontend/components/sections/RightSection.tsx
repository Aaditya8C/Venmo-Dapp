import { Button, InputAdornment, TextField } from "@mui/material";
import { CircleDollarSign } from "lucide-react";
import React from "react";

const RightSection = () => {
  return (
    <div className="grid gap-10">
      <form className="bg-orange-200 shadow-xl p-10">
        <p className="text-xl font-semibold">
          Send <span className="text-orange-900">Payment</span>{" "}
          <span className="text-green-700">/ Request</span>
        </p>
        <hr className="w-full h-[2px] my-2 bg-orange-900 " />
        <div className="grid gap-6">
          <TextField
            id="standard-basic"
            label="To"
            variant="outlined"
            color="warning"
          />
          <TextField
            id="standard-basic"
            label="Message"
            variant="outlined"
            color="warning"
          />
          <div className="flex  justify-between gap-4">
            <TextField
              id="standard-basic"
              label="Amount"
              variant="outlined"
              color="warning"
              className="w-full"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CircleDollarSign />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              color="warning"
              className="w-full text-2xl"
            >
              Send
            </Button>
          </div>
        </div>
      </form>

      <div className="bg-orange-200 shadow-xl p-10">
        <p className="text-xl font-semibold"> Developed by Aaditya Padte</p>
        <p>Decentralized Platform for message sharing with payment option.</p>
      </div>
    </div>
  );
};

export default RightSection;
