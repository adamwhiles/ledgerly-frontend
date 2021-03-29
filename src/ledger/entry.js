import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faEdit} from "@fortawesome/free-solid-svg-icons";

function Entry(props) {
  const deleteEntry = async id => {
    try {
      const entry = await fetch("/api/deleteEntry", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          entryID: id
        })
      });
      const res = await entry.json();
      props.update(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr className="ledgerCell">
      <td width="5%">
        <span className="tag">{props.data.Date}</span>
      </td>
      <td>{props.data.Description}</td>
      <td width="5%">
        {props.data.Amount < 0.0 ? (
          <span className="tag debit">
            <b>
              $
              {parseFloat(props.data.Amount).toLocaleString("en", {
                minimumFractionDigits: 2
              })}
            </b>
          </span>
        ) : (
          <span className="tag credit">
            <b>
              $
              {parseFloat(props.data.Amount).toLocaleString("en", {
                minimumFractionDigits: 2
              })}
            </b>
          </span>
        )}
      </td>
      <td width="5%">
        $
        {parseFloat(props.balance).toLocaleString("en", {
          minimumFractionDigits: 2
        })}
      </td>
      <td width="5%">
        <span className="actionBtn">
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => deleteEntry(props.data.TransactionID)}
          />
        </span>
        <span className="actionBtn">
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => props.editModal(props.data)}
          />
        </span>
      </td>
    </tr>
  );
}

export default Entry;
