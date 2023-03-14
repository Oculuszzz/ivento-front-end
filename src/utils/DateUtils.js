export const convertDateTimeToDateTimeString = (dateString) => {
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

export const convertLocalDateTimeToDateTimeString = (localDateTime) => {
  // const newString = localDateTime.split("T");

  return convertDateTimeToDateTimeString(new Date(localDateTime));
};

export const lastActive = (dateTime) => {
  const current = new Date();
  let difference = current.getTime() - dateTime.getTime(); // return milliseconds

  // (1000 milliseconds * (60 seconds * 60 minutes) * 24 hours)
  return Math.ceil(difference / (1000 * 3600 * 24));
};
