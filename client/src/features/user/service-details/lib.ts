import axios from "axios";
import { ClientService } from "../services";

export async function getSlots(serviceDetails: ClientService) {
    try {
        const reqData = {
            id: serviceDetails.id,
            duration: serviceDetails.duration, working_days: serviceDetails.working_days, start_time: serviceDetails.start_time, end_time: serviceDetails.end_time
        }

        const response = await axios.post("/api/services/get-slots", reqData);
        return response.data;

    } catch (err) {
        console.log(err)
        return []
    }
}