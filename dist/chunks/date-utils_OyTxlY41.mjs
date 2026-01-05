function formatDateToYYYYMMDD(date) {
  return date.toISOString().substring(0, 10);
}

export { formatDateToYYYYMMDD };
