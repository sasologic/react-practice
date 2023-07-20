import React from "react";
import data from "../transactions.js";
import { useState } from "react";
import Transaction from "./Transaction.jsx";

const TransactionList= () => {
  const [transactions, setTransactions] = useState(data);
  const [item, setItem] = useState({ description: "", copy: "", rate: "" });
  const [searchValue, setSearchValue] = useState("");

  function clearTransaction() {
    setTransactions([]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    const { description, copy, rate } = item;
    if (!description || !copy || !rate) return;
    const newTransactions = [...transactions, { id, description, copy, rate }];
    setTransactions(newTransactions);
    setItem({ description: "", rate: "", copy: "" });
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);
    if (searchTerm == "") {
      setTransactions(data);
      return;
    }

    const updatedTransactions = [...transactions];
    // const searchResults = updatedTransactions.filter((transaction) => {
    //   return transaction.description
    //     .toLowerCase()
    //     .includes(searchValue.toLowerCase());
    // });
    const searchResults = updatedTransactions.filter((transaction) => {
      return (
        transaction.description
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) !== -1
      );
    });
    setTransactions(searchResults);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchValue == "") {
      setTransactions(data);
      return;
    }
    const updatedTransactions = [...transactions];
    // const searchResults = updatedTransactions.filter((transaction) => {
    //   return transaction.description
    //     .toLowerCase()
    //     .includes(searchValue.toLowerCase());
    // });
    const searchResults = updatedTransactions.filter((transaction) => {
      return (
        transaction.description
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) !== -1
      );
    });
    setTransactions(searchResults);
  };

  const handleReset = () => {
    setTransactions(data);
  };

  const handleDelete = (id) => {
    console.log(`remove ${id}`);
    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.id !== id;
    });
    setTransactions(filteredTransactions);
  };
  return (
    <div className="transaction">
      <h1>Sasologic Infosys</h1>
      <form
        className="search-form"
        id="search-form"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="search"
          placeholder="search transactions"
          value={searchValue}
          onChange={handleSearch}
        />
        <input type="submit" value="Search" />
      </form>

      <form className="reset-form" id="reset-form" onSubmit={handleReset}>
        <button value="Reset Transactions" className="button">
          Reset Transactions
        </button>
      </form>
      
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Copy</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return <Transaction {...transaction} handleDelete={handleDelete} />
            
          })}
        </tbody>
      </table>

      <button className=" button clear danger" onClick={clearTransaction}>
        Clear Transaction
      </button>
      <form onSubmit={handleSubmit} id="main-submit" className="form">
        <div className="form-row">
          <label htmlFor="description">Description</label>
          <br />
          <input
            type="text"
            id="description"
            value={item.description}
            name="description"
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="copy">Copy</label>
          <br />
          <input
            type="text"
            id="copy"
            value={item.copy}
            name="copy"
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="rate">Rate</label>
          <br />
          <input
            type="text"
            id="rate"
            value={item.rate}
            name="rate"
            onChange={handleChange}
          />
        </div>

        <button className="button" type="Submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionList;
