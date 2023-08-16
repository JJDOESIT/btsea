export default function TimestampToDate(timestamp) {
  let date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(timestamp);
  return date;
}
