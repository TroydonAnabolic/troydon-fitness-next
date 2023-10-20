import React, { useState } from "react";
import { DayPicker, DateRange, DayClickEventHandler } from "react-day-picker";
import { addMonths, isSameMonth, isSameDay } from "date-fns";

type Props = {
  selectedDays: Date[];
  setSelectedDays: React.Dispatch<React.SetStateAction<Date[]>>;
};

const DatePickerCustom = ({ selectedDays, setSelectedDays }: Props) => {
  const today = new Date();
  const minDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  const [month, setMonth] = useState<Date>(today);

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    const newSelectedDays = [...selectedDays];
    if (modifiers.selected) {
      const index = selectedDays.findIndex((selectedDay) =>
        isSameDay(day, selectedDay)
      );
      newSelectedDays.splice(index, 1);
    } else {
      newSelectedDays.push(day);
    }
    setSelectedDays(newSelectedDays);
  };

  const handleResetClick = () => setSelectedDays([]);

  let footer = (
    <div>
      <p>Please pick one or more days.</p>

      <button
        className="btn btn-secondary m-3"
        disabled={isSameMonth(today, month)}
        onClick={() => setMonth(today)}
      >
        Go to Today
      </button>
    </div>
  );

  if (selectedDays.length > 0)
    footer = (
      <div>
        <p>
          You selected {selectedDays.length} days.{" "}
          <button className="btn btn-primary m-3" onClick={handleResetClick}>
            Reset
          </button>
        </p>
        <button
          className="btn btn-secondary"
          disabled={isSameMonth(today, month)}
          onClick={() => setMonth(today)}
        >
          Go to Today
        </button>
      </div>
    );

  return (
    <div className="flex justify-center items-cente bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
      <DayPicker
        captionLayout="dropdown-buttons"
        min={1}
        max={5}
        onDayClick={handleDayClick}
        selected={selectedDays}
        month={month}
        fromDate={minDate}
        toDate={maxDate}
        onMonthChange={setMonth}
        footer={footer}
        styles={{
          caption: { color: "#0ea5e9" },
          dropdown: { backgroundColor: "#d1d5db" },
        }}
        className="text-sky-blue-500" // Apply the text color here
      />
    </div>
  );
};

export default DatePickerCustom;
