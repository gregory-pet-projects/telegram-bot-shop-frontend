import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";

// Define a constant for the default subject value
const DEFAULT_SUBJECT = "physical";

export const Form = () => {
  // Define state variables and their corresponding setter functions using the useState hook
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);

  // Get the `tg` object from the `useTelegram` custom hook
  const { tg } = useTelegram();

  // Define a callback function that sends data to Telegram when the "Send Data" button is clicked
  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, street, subject, tg]);

  // Register the `onSendData` callback function as an event listener for the "mainButtonClicked" event
  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);

    // Unregister the `onSendData` callback function when the component is unmounted
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  // Set the text of the "Send Data" button when the component is mounted
  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, [tg]);

  // Show or hide the "Send Data" button based on whether the country and street inputs have values
  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street, tg]);

  // Define onChange event handlers for the country, street, and subject inputs
  const onChangeCountry = (e) => setCountry(e.target.value);

  const onChangeStreet = (e) => setStreet(e.target.value);

  const onChangeSubject = (e) => setSubject(e.target.value);

  // Render the component
  return (
    <div className={"form"}>
      <h3>Введите ваши данные</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"Страна"}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"Улица"}
        value={street}
        onChange={onChangeStreet}
      />

      <select
        menuPlacement="top"
        value={subject}
        onChange={onChangeSubject}
        className={"select"}
      >
        <option value={"physical"}>Физ. лицо</option>
        <option value={"legal"}>Юр. лицо</option>
      </select>
    </div>
  );
};
