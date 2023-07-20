import React from "react";

const Transaction = ({ id, description, rate, copy, handleDelete }) => {
  return (
    <tr key={id}>
      <td>{description}</td>
      <td>{copy}</td>
      <td>{rate}</td>
      <td>{rate * copy}</td>
      <td>
        <input
          type="button"
          className="btn-delete"
          value="X"
          onClick={() => handleDelete(id)}
        />
      </td>
    </tr>
  );
};

export default Transaction;
