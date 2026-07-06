export const days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
const pageNotAllowedRegex = /(dashboard|account)/ 

const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const serviceCategories = [
  {
    key: "All",
    value: "All",
  },
  {
    key: "Salon",
    value: "Salon",
  },
  {
    key: "Hair cut",
    value: "Hair cut",
  },
  {
    key: "Interview",
    value: "Interview",
  },
  {
    key: "Clinic",
    value: "Clinic",
  },
];

export { serviceCategories, pageNotAllowedRegex, TIMEZONE };
