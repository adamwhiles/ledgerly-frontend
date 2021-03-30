import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faEdit} from "@fortawesome/free-solid-svg-icons";
import {Form} from "react-bulma-components";

function Entry(props) {
  const checkCleared = () => {
    if (props.data.Cleared === 1) {
      return true;
    } else {
      return false;
    }
  };

  const [getCleared, setCleared] = useState(checkCleared());

  const toggleCleared = async id => {
    console.log("Setting entry id " + id + " cleared state to " + !getCleared);
    try {
      const entry = await fetch("/api/toggleCleared", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          entryID: id,
          cleared: !getCleared
        })
      });
      const res = await entry.json();
      setCleared(!getCleared);
    } catch (err) {
      console.log(err);
    }
  };

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

  const {Checkbox, Control} = Form;

  return (
    <tr className="ledgerCell">
      <td width="5%">
        <span className="tag">{props.data.Date.slice(0, 5)}</span>
      </td>
      <td>{props.data.Description}</td>
      <td width="5%">
        <Control>
          <Checkbox
            type="checkbox"
            checked={getCleared}
            value="cleared"
            onChange={() => toggleCleared(props.data.TransactionID)}
          />
        </Control>
      </td>
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
