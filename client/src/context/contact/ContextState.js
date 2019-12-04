import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "jill@gmail.com",
        phone: "111-111-1111",
        type: "personal"
      },
      {
        id: 2,
        name: "Sara Watson",
        email: "Sarah@gmail.com",
        phone: "222-111-1111",
        type: "personal"
      },
      {
        id: 3,
        name: "Harry White",
        email: "Harry@gmail.com",
        phone: "333-111-1111",
        type: "professional"
      }
    ]
  };
  //State allows us to access anything in our state
  //dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);
  //Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear current contact

  //Update Contact

  //Filter contacts

  //clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {" "}
      {props.children}{" "}
    </ContactContext.Provider>
  );
};

export default ContactState;
