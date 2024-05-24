import React, { useEffect, useState } from 'react';

const DateNumericMonthExtractor = ({ dbDateString }) => {
  const [numericDay, setNumericDay] = useState(null);
  const [numericMonth, setNumericMonth] = useState(null);

  useEffect(() => {
    const dateTime = new Date(dbDateString);
    const date = dateTime.getDate();
    const month = dateTime.getMonth() + 1; // Month is zero-based, so add 1

    setNumericDay(date);
    setNumericMonth(month);
  }, [dbDateString]);

  return (
    <div>
      <p>Date: {numericDay}</p>
      <p>Month: {numericMonth}</p>
    </div>
  );
};

export default DateNumericMonthExtractor;
