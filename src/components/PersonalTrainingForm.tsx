import React, { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/lib/style.css";

export default function PersonalTrainingForm() {
  const initialDays: Date[] = [];
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);
  const [notes, setNotes] = useState("");

  const footer =
    days && days.length > 0 ? (
      <p>You selected {days.length} day(s).</p>
    ) : (
      <p>Please pick one or more days.</p>
    );

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div>
      <h2>Personal Training Form</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div>
          <label>Date Range:</label>
          <DayPicker
            mode="multiple"
            min={1}
            selected={days}
            onSelect={setDays}
            footer={footer}
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            rows={4}
            cols={50}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
