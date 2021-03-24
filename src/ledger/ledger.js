//import logo from "../logo.svg";
//import "../css/login.css";
import React, {useState} from "react";
import useAsyncEffect from "use-async-effect";
import AddModal from "../modals/addModal";
import Entry from "./entry";

function MainLedger() {
  const [getEntries, setEntries] = useState("");
  const [getAddModal, setAddModal] = useState(false);
  const [getEditModal, setEditModal] = useState("false");

  let currentBalance = 0;

  useAsyncEffect(async () => {
    try {
      const ledger = await fetch("/api/getLedger");
      const res = await ledger.json();
      setEntries(res);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      {getAddModal}
      {getAddModal ? (
        <AddModal
          show={getAddModal}
          close={() => setAddModal(false)}
          categories={getEntries.categories}
          update={setEntries}
        />
      ) : null}
      <button
        className="button is-info is-light"
        onClick={() => setAddModal(true)}
      >
        Add
      </button>
      <br /> <br />
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getEntries.transactions
            ? getEntries.transactions.map((e, i) => {
                if (i === 0) {
                  currentBalance = parseFloat(e.StartingBalance);
                }
                currentBalance =
                  parseFloat(currentBalance) + parseFloat(e.Amount);
                return (
                  <Entry
                    data={e}
                    key={e.TransactionID}
                    balance={currentBalance.toFixed(2)}
                  />
                );
              })
            : console.log("nodata")}
        </tbody>
      </table>
    </div>
  );
}

export default MainLedger;
