import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faEdit} from "@fortawesome/free-solid-svg-icons";

function Entry(props) {
  if (props) {
    console.log("we have data in entry");
  } else {
    console.log("no data in entry");
  }

  return (
    <tr className="ledgerCell">
      <td width="10%">
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
          <FontAwesomeIcon icon={faTrashAlt} onClick={() => alert("test")} />
        </span>
        <span className="actionBtn">
          <FontAwesomeIcon icon={faEdit} onClick={() => alert("test")} />
        </span>
      </td>
    </tr>
  );
}

export default Entry;
