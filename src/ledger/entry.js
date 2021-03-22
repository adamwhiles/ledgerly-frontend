import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faEdit} from "@fortawesome/free-solid-svg-icons";

function Entry(props) {
  if (props) {
    console.log("we have data in entry");
  } else {
    console.log("no data in entry");
  }

  function numberWithCommas(x) {
    //return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return x;
  }

  return (
    <tr>
      <td width="10%">{props.data.Date}</td>
      <td>{props.data.Description}</td>
      <td width="5%">
        {props.data.Amount < 0.0 ? (
          <span className="tag is-danger">
            <b>${numberWithCommas(props.data.Amount.toFixed(2))}</b>
          </span>
        ) : (
          <span className="tag is-primary">
            <b>${numberWithCommas(props.data.Amount.toFixed(2))}</b>
          </span>
        )}
      </td>
      <td width="5%">${numberWithCommas(props.balance)}</td>
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
