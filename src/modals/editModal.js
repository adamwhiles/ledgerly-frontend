import React, {useState, forwardRef} from "react";
import {createPortal} from "react-dom";
import {Modal, Button, Form, Icon} from "react-bulma-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faCommentAlt,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const {Input, Field, Control, Label, Select} = Form;

function EditModal(props) {
  const getTransactionType = () => {
    if (props.entry.Amount < 0) {
      return "2";
    } else {
      return "1";
    }
  };

  const [getCategory, setCategory] = useState(props.entry.CategoryID);
  const [getType, setType] = useState(getTransactionType());
  const [getAmount, setAmount] = useState(props.entry.Amount);
  const [getDescription, setDescription] = useState(props.entry.Description);
  const [startDate, setStartDate] = useState(new Date(props.entry.Date));

  const editEntry = async () => {
    console.log(startDate);
    try {
      const ledger = await fetch("/api/editEntry", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          Date: startDate,
          Amount: parseFloat(getAmount),
          Description: getDescription,
          Type: parseInt(getType),
          Category: parseInt(getCategory),
          EntryID: props.entry.TransactionID
        })
      });
      const res = await ledger.json();
      props.update(res);
    } catch (err) {
      console.log(err);
    }
  };

  const DateInput = forwardRef(({value, onClick}, ref) => {
    return (
      <Control iconLeft>
        <>
          <Input
            type="text"
            placeholder="Date"
            value={value}
            onClick={onClick}
            readOnly
          />
        </>
        <Icon align="left">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            onClick={() => alert("test")}
            className="mr-1"
          />
        </Icon>
      </Control>
    );
  });

  return (
    <Modal show={props.show} onClose={props.close}>
      <Modal.Card>
        <Modal.Card.Head showClose={true} onClose={props.close}>
          <Modal.Card.Title>Edit Entry</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Field className="is-horizontal field-body">
            <Field>
              <DatePicker
                id="date_field"
                selected={startDate}
                onChange={date => setStartDate(date)}
                customInput={<DateInput />}
                popperClassName="date_field"
                popperContainer={({children}) =>
                  createPortal(children, document.body)
                }
              />
            </Field>
            <Field className="control is-expanded">
              <Control iconLeft>
                <Input
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  onChange={e => setAmount(e.target.value)}
                  value={getAmount}
                />
                <Icon align="left">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    onClick={() => alert("test")}
                    className="mr-1"
                  />
                </Icon>
              </Control>
            </Field>
            <Field className="control is-expanded">
              <Control iconLeft>
                <Input
                  type="text"
                  placeholder="Description"
                  name="description"
                  onChange={e => setDescription(e.target.value)}
                  value={getDescription}
                />
                <Icon align="left">
                  <FontAwesomeIcon
                    icon={faCommentAlt}
                    onClick={() => alert("test")}
                    className="mr-1"
                  />
                </Icon>
              </Control>
            </Field>
          </Field>
          <Field className="is-horizontal field-body">
            <Field className="is-expanded">
              <Label size="small">Income/Expense</Label>
              <Control>
                <Select
                  onChange={e => setType(e.target.value)}
                  name="transType"
                  value={getType}
                >
                  <option value="none" defaultValue>
                    Select One
                  </option>
                  <option value="1">Income</option>
                  <option value="2">Expense</option>
                </Select>
              </Control>
            </Field>
            <Field>
              <Label size="small">Category</Label>
              <Control>
                <Select
                  onChange={e => setCategory(e.target.value)}
                  name="category"
                  value={getCategory}
                >
                  <option value="none" defaultValue>
                    Select One
                  </option>
                  {props.categories != null
                    ? props.categories.map(e => {
                        return (
                          <option key={e.CategoryID} value={e.CategoryID}>
                            {e.CategoryName}
                          </option>
                        );
                      })
                    : null}
                </Select>
              </Control>
            </Field>
          </Field>
        </Modal.Card.Body>
        <Modal.Card.Foot
          style={{alignItems: "center", justifyContent: "right"}}
        >
          <Button className="credit" onClick={() => editEntry()}>
            Confirm
          </Button>
          <Button className="debit" onClick={() => props.close()}>
            Cancel
          </Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  );
}

export default EditModal;
