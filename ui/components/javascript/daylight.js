import React, { useState, useEffect } from "react";

const TimeZoneChecker = () => {
  const [isDaylightSaving, setIsDaylightSaving] = useState(null);

  useEffect(() => {
    const now = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isDST = new Date(now.getFullYear(), 6, 1).getTimezoneOffset() < now.getTimezoneOffset();
    setIsDaylightSaving(isDST);
  }, []);

  return (
    <div>
      <h3>Daylight Saving Time Check</h3>
      <p>{isDaylightSaving !== null ? (isDaylightSaving ? "Currently in Daylight Saving Time" : "Not in Daylight Saving Time") : "Checking..."}</p>
    </div>
  );
};

export default TimeZoneChecker;
