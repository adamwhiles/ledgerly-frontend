//import logo from "../logo.svg";
//import "../css/login.css";
import React, {useState} from "react";
import {Modal, Section, Button, Form, Icon} from "react-bulma-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faDollarSign,
  faCommentAlt
} from "@fortawesome/free-solid-svg-icons";

const {Input, Field, Control, Label, Select} = Form;

function AddModal(props) {
  const [getCategory, setCategory] = useState("");
  const [getType, setType] = useState("");
  const [getAmount, setAmount] = useState("");
  const [getDescription, setDescription] = useState("");

  return (
    <Modal show={props.show} onClose={props.close}>
      <Modal.Card>
        <Modal.Card.Head showClose={true} onClose={props.close}>
          <Modal.Card.Title>Add Entry</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Field className="is-horizontal field-body">
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
            <Field>
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
                  <option value="credit">Income</option>
                  <option value="debit">Expense</option>
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
                  <option value="credit">Income</option>
                  <option value="debit">Expense</option>
                </Select>
              </Control>
            </Field>
          </Field>
        </Modal.Card.Body>
      </Modal.Card>
    </Modal>
  );
}

export default AddModal;
