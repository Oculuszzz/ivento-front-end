const convertDateTimeToDateTimeString = (dateString) => {
  if (!dateString) {
    return "";
  }

  try {
    const date = new Date(Date.parse(dateString));

    const day = date.getDate();
    const month = date.getMonth() + 1; // Starting index month 0
    const year = date.getFullYear();

    const h = date.getHours();
    const m = date.getMinutes();
    // const ampm = h >= 12 ? "pm" : "am";

    return `${day}/${month}/${year} ${h}:${m}`;
  } catch (error) {
    console.log(`ERROR PARSE DATE - ${dateString}`);
    console.log(`ERROR - ${error}`);
    return "";
  }
};

const convertLocalDateTimeToDateTimeString = (localDateTime) => {
  // const newString = localDateTime.split("T");

  return convertDateTimeToDateTimeString(new Date(localDateTime));
};

const lastActive = (dateTime) => {
  const current = new Date();
  let difference = current.getTime() - dateTime.getTime(); // return milliseconds

  // (1000 milliseconds * (60 seconds * 60 minutes) * 24 hours)
  return Math.ceil(difference / (1000 * 3600 * 24));
};

const getFirstDateCurrentMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getLastDateCurrentMonth = () => {
  const date = new Date();
  let newDateTime = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  newDateTime.setHours(23);
  newDateTime.setMinutes(59);
  newDateTime.setSeconds(59);

  return newDateTime;
};

const convertSelectedMonthToFirstDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const convertSelectedMonthToLastDate = (date) => {
  let newDateTime = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  newDateTime.setHours(23);
  newDateTime.setMinutes(59);
  newDateTime.setSeconds(59);

  return newDateTime;
};

const convertFirstDateToLocalDateTimeFormatString = (date) => {
  const updateDate = convertSelectedMonthToFirstDate(date);

  const day = updateDate.getDate();
  const month = updateDate.getMonth() + 1; // Starting index month 0
  const year = updateDate.getFullYear();

  const h = updateDate.getHours();
  const m = updateDate.getMinutes();
  const s = updateDate.getSeconds();
  // const ampm = h >= 12 ? "pm" : "am";

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}T${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const convertLastDateToLocalDateTimeFormatString = (date) => {
  const updateDate = convertSelectedMonthToLastDate(date);

  const day = updateDate.getDate();
  const month = updateDate.getMonth() + 1; // Starting index month 0
  const year = updateDate.getFullYear();

  const h = updateDate.getHours();
  const m = updateDate.getMinutes();
  const s = updateDate.getSeconds();
  // const ampm = h >= 12 ? "pm" : "am";

  updateDate.toISOString();

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}T${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const DateUtils = {
  convertDateTimeToDateTimeString,
  convertLocalDateTimeToDateTimeString,
  lastActive,
  getFirstDateCurrentMonth,
  getLastDateCurrentMonth,
  convertSelectedMonthToFirstDate,
  convertSelectedMonthToLastDate,
  convertFirstDateToLocalDateTimeFormatString,
  convertLastDateToLocalDateTimeFormatString,
};

export default DateUtils;
