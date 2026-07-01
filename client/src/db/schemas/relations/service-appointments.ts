import { relations } from "drizzle-orm";
import { service , appointment} from "../index";

export const serviceRelationWithAppointments = relations(
  service,
  ({ many }) => ({
    appointments: many(appointment),
  }),
);
export const appointmentRelationWithService = relations(
  appointment,
  ({ one }) => ({
    service: one(service, {
      fields: [appointment.service_id],
      references: [service.id],
    }),
  }),
);
