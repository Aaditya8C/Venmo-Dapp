// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Transactions {
    uint256 transactionCount;

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timeStamp;
    }

    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint timeStamp
    );

    TransferStruct[] transactions;

    // payable means receiver is actually able to receive ether from sender
    function addTransaction(
        address payable receiver,
        uint amount,
        string memory message
    ) public {
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp
            )
        );

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    // View means function can only be used to view the data
    function getTransactionsCount() public view returns (uint256) {
        return transactionCount;
    }
}
