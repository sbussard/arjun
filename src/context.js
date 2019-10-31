import React, { useEffect, useState, createContext } from "react";

import {
  REACT_APP_SHEET_ID,
  REACT_APP_KEY,
  REACT_APP_SHEET_TAB
} from "./configuration";

const FORM_RESPONSES_URL = `https://sheets.googleapis.com/v4/spreadsheets/${REACT_APP_SHEET_ID}/values/${REACT_APP_SHEET_TAB}?key=${REACT_APP_KEY}`;

const context = createContext();

export default context;
export const Provider = ({ children }) => {
  const [responses, setResponses] = useState([]);

  const transform = (responses = []) => {
    let headers = responses.shift();
    return responses.map(response =>
      response.reduce(
        (acc, value, index) =>
          Object.assign(acc, {
            [headers[index]]: value
          }),
        {}
      )
    );
  };

  useEffect(() => {
    fetch(FORM_RESPONSES_URL)
      .then(sheetData => sheetData.json())
      .then(response => response.values)
      .then(transform)
      .then(setResponses);
  }, []);

  return <context.Provider value={responses} children={children} />;
};
