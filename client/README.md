
### Completed :
- [X] Show today’s schedule in calender in dashboard.
- [X] Complete the slot regeneration .
- [X] Complete the fix of slot allocation .
- [X] Create an accounts page from where the user check his booked appointment .
- [X] Appointment rescheduling route .
- [X] Implement functionality to send otp for login of service provider .
- [X] Render the view profile icon on header when the user is logged in .
- [X] Complete the class based payment service .

### Basic :
- Implement a functionality to show the service views in dashboard . Update the count in database when service details s rendered .
- Design thumbnail of project from stitch with google nano banana and attach it to root readme .
- Test all api routes using bruno .
- Remove auth related extra api routes and make sure to use better auth builtin methods .
- Add proper error handling to all api calls routes . [Check this out](https://dev.to/riyon_sebastian/building-a-robust-frontend-error-handling-system-with-axios-and-custom-hooks-27k3)
- All a universal debugging logger .
- Update the service details page to show all the metadata about service .
- Update the cards component in account page to show meaningful data .
- on dashboards Create cards for total earnings this month , a side div for any popup
- Number of appointments per week/month.
- No-shows, cancellations, revenue earned. 
- Add a refund logic for cancelled appointments [see more details in this document] (./IMPROVEMENTS.Preadmd)
- Implement appointment cancellation . `[MENTIONED]`
- Notification push . `[MENTIONED]`
- Acknowledgement feature through qr code .

### Intermediate :
- Improve success and failure pages .
- Implement feature of state saving .

### Advanced :
- Add proper testing using playwright .
- Dockerize the application properly .
- Run the test simultaneously in docker containers locally .
- Add a github actions CI/CD pipeline to test the code on vercel preview then deploy to production .
- Create appointment booking tool for AI agent .
 
## Optional :
-  Create a new route for verifying if user has completed onboarding or not . Create a new field in 
`useDashboard` and update it in `FetchDashboardData` component

## Features implementation :

### Acknowledgement feature through QR code :
- Service providers have thier own QR code provided by platform .
- This qr code contain the link `http://localhost:3000/mark?app_id=exampleid&service_id=exampleid&`
- In this route , create a useEffect hook that sends a post request to `/api/acknowledge` with the following request body :
```javascript
{
appointment_id:string;
service_id:string;
}
```
- On the api route  :
   - Mark appointment as completed .
   - Push reminder of ratings and review to account .
   - transfer 95% funds to service provider's account .


### Implement a task queue :
- Create a new table in postgres for task queue implementation with row level locking .
### Notification push :
- Integrate Twilio API for integration of notification and reminders .
**Push notification :**
- When the provider accepts the reschedule request from dashboard .
- When the provider cancel appointments .
- When the funds are transfered to provider account . 
- When reschedule is requested from accounts .
- When appointment is booked .

### Appointment cancellation :
- Provider can be able to select multiple appointments and mark them `CANCELLED` .
- Create a route which takes array of appointment ids and mark them `CANCELLED` .
- Server then calls another function to push message on whatsapp that your appointment hasbeen cancelled . OR Push a notification . 

#### Updating services :

- When `max_appointments_per_day` changes, don’t delete everything.

- Fetch all future unbooked slots and delete them.

- Then regenerate new slots for the upcoming period with the new limit.

- Keep past and booked slots untouched.

#### /dashboard :
- Sidebar must contain a button which access the camera , then capture image of a qr code , scans it and mark the encoded appointment as `COMPLETED`  

##### /dashboard/appointments :
- Provider can be able to view appointments as table OR list .
- Provider can be able to cancel any appointment .

##### /dashboard/schedule :
- Fix the calender view so that user can be able to view his all his schedule .
- Calender component should be customized ,  should be according to theme , and can be very easy to understand .

##### /dashboard/reschedules :
- User can be able to view reschedule requests . 
- User can be able to accept or reject the appointment reschedule request .

affanamir903@gmail.com (alpHA23@)
example@gmail.com  (alphA@bEt1)

```bash
docker exec -i postgres psql -U affan -d appointly < reschedule_requests.sql
```