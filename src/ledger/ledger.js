import React, {useState} from "react";
import useAsyncEffect from "use-async-effect";
import AddModal from "../modals/addModal";
import EditModal from "../modals/editModal";
import Entry from "./entry";

function MainLedger() {
  const [getEntries, setEntries] = useState("");
  const [getAddModal, setAddModal] = useState(false);
  const [getEditModal, setEditModal] = useState(false);
  const [getCurrentEntry, setCurrentEntry] = useState("");

  // These are variables we use when displaying the proper balance, 0 as the starting point
  // currentMonth is so we can keep track of when the next entry starts a new month and while and
  // we can break up the table to show it's a new month
  let currentBalance = 0;
  let currentMonth = 0;

  useAsyncEffect(async () => {
    try {
      const ledger = await fetch("/api/getLedger");
      const res = await ledger.json();
      setEntries(res);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const openEditModal = entry => {
    setCurrentEntry(entry);
    setEditModal(true);
  };

  return (
    <div>
      {getAddModal ? (
        <AddModal
          show={getAddModal}
          close={() => setAddModal(false)}
          categories={getEntries.categories}
          update={setEntries}
        />
      ) : null}
      {getEditModal ? (
        <EditModal
          show={getEditModal}
          close={() => setEditModal(false)}
          categories={getEntries.categories}
          update={setEntries}
          entry={getCurrentEntry}
        />
      ) : null}

      <table className="table">
        <thead className="ledgerHead">
          <tr className="ledgerHead">
            <td colSpan="5">
              <button
                className="button is-info is-light addButton"
                onClick={() => setAddModal(true)}
              >
                Add
              </button>
            </td>
          </tr>
        </thead>
        <thead className="ledgerHead">
          <tr className="ledgerHead">
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
                // Convert our string date and to date object so we can get the month
                let newDate = new Date(e.Date);
                let entry;
                if (i === 0) {
                  currentBalance = parseFloat(e.StartingBalance);
                  currentMonth = newDate.getMonth();
                  let monthName = newDate.toLocaleString("default", {
                    month: "long"
                  });
                  entry = (
                    <tr className="ledgerMonth">
                      <td colSpan="5">{monthName}</td>
                    </tr>
                  );
                }
                if (currentMonth !== newDate.getMonth()) {
                  currentMonth = newDate.getMonth();
                  let monthName = newDate.toLocaleString("default", {
                    month: "long"
                  });
                  entry = (
                    <tr className="ledgerMonth">
                      <td colSpan="5">{monthName}</td>
                    </tr>
                  );
                }
                currentBalance =
                  parseFloat(currentBalance) + parseFloat(e.Amount);
                entry = (
                  <React.Fragment key={e.TransactionID.toString()}>
                    {entry}
                    <Entry
                      data={e}
                      balance={currentBalance.toFixed(2)}
                      update={setEntries}
                      editModal={openEditModal}
                    />
                  </React.Fragment>
                );
                return entry;
              })
            : console.log("nodata")}
        </tbody>
      </table>
    </div>
  );
}

export default MainLedger;
