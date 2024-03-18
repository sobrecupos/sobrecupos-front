import { getComponentClassNames } from "@marketplace/ui/namespace";
import React from 'react';

type ButtonAppointmentProps = {
  id: string;
  text: string;
  onClick: () => void;
}
const classes = getComponentClassNames("schedule", {
  spinner: "spinner",
  title: "title",
  subtitle: "subtitle",
  timeSlotsContainer: "time-slots-container",
  address: "address",
  addressIcon: "address-icon",
  insurances: "insurances",
  timeSlots: "time-slots",
  timeSlot: "time-slot",
  back: "back",
  table: "table",
  tableRow: "table-row",
  tableData: "table-data",
  form: "form",
  formElement: "form-element",
  label: "label",
  input: "input",
  submit: "submit",
  empty: "empty",
});
const ButtonAppointment: React.FC<ButtonAppointmentProps> = ({ id, text, onClick }) => {

  const handleOnClick = () => {
    onClick();
  }
  return (
    <button
      key={`timeslot-${id}`}
      className={classes.timeSlot}
      onClick={() =>
        handleOnClick()}
    >
      {text}
    </button >
  );
}

export default ButtonAppointment;