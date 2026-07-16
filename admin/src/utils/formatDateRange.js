export function formatDateRange(startDate, endDate, currentlyStatus) {
  const options = {
    month: "short",
    year: "numeric",
  };

  const start = new Date(startDate).toLocaleDateString("en-US", options);

  const end = currentlyStatus
    ? "Present"
    : new Date(endDate).toLocaleDateString("en-US", options);

  return `${start} - ${end}`;
}