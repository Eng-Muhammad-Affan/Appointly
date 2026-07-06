export const days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
const pagesNotAllowed = [
  "/dashboard",
  "/dashboard/appointments",
  "/dashboard/services",
  "/dashboard/services/create",
  "/dashboard/schedule",
  "/add-service",
  "/book-appointment",
  "/login",
  "/create-account",
  "/checkout/failed",
  "/checkout/success",
  "/account",
];

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
    key: "Inetrview",
    value: "Interview",
  },
  {
    key: "Clinic",
    value: "Clinic",
  },
];

export { serviceCategories, pagesNotAllowed, TIMEZONE };
