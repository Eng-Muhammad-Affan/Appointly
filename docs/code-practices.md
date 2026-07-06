# Claude code context for Appointly :

## Overview :
Appointly is a complete appointments management platform where business owners and service providers sell thier services and expand thier reach to thier potential clients . This application allows a provider list services , while clients can book thier appointments and check out best services from platform .

## Routes :
**/services** : Service listing page .
**/service/[id]** : Service details page on which details about service are shown .
**/account** : User's account page where user check his upcoming booked appointments , request any reschedules .
**/login-user** : Login page for user 
**/login-provider** : Login for service providers .
**/signup-user** : Signup page for user .
**/create-account** : Signup page for service provider . After signup provider is redirected to the stripe onboarding page and provider is required to complete the onboarding to list services and accept payments .

## Development Practices (MANDATORY) :

#### **Use of zustand states :**
- If any state can be used by two components , the zustand should be used for state instead of react builtin `useContext` hook .
- Zustand state must be typesafe , means that zustand state should contain a type defining the state in its file 
Example :
```typescript
// must mention type ... 
interface ZustandState {
    stateValue:number;
    setStateValue:(val:number) => void;
}
export const useZustandState = create<ZustandState>()((set) => ({
// remaining state init ...
}))
```

#### **Form handling :**
- If a form has only one field , handle it manually using `useState`
- If a form contains input fields more than 1 , the form should be validated and handled using `react-hook-form`
- The react-hook-form should validate the form data using a corresponding zod schema placed withing `_validations` folder or `_validations.ts` file .
- The form can be able to show all the field errors in realtime .
must use `mode:"onchange"` in react-hook-form .
- Must use custom hook when integrating `react-hook-form` .

#### **Use of better auth :**
- All the authentication related functionality can be built in application using `better-auth`
- Don't create any extra routes related to authentication if more important than nessessary .

#### **Use of drizzle ORM :**
drizzle is the orm which should be used in the application 

In traditional fullstack nextjs projects , the project is structured in following ways .

```markdown
----/src
| ---- /components
            | ------- /layout
                        | ------- Header.tsx
                        | ------- Footer.tsx
            | ------- /pages
                        | ------- Home
                                    | ------- Banner.tsx
                                    | ------- cta.tsx
            | ------- /common
                        | ------- Input.tsx
                        | ------- Button.tsx

| ---- /stores  (Zustand states)
            | ------- use-dashboard.ts
            | ------- use-services.ts
            | ------- use-otp-form.ts

| ---- /app  (App router)
| ---- /lib  
| ---- /utils  (Reusable utilities)
| ---- /db  (Drizzle)
| ---- proxy.ts  (Next.JS middleware)

```



check the following code 
```typescript 
import type { AddServiceAPISchema } from "@/app/add-service/_validations/add-service-api-schema";
import type { NextRequest } from "next/server";
import db from "@/db";
import { NextResponse } from "next/server";
import { service } from "@/db/schemas";

// _____ Libraries ...
import type { z } from "zod";

// ____ Utils ...
import { GenerateSlots } from "@shared/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const POST = async (req: NextRequest) => {
  console.log("--------------------- Running addServiceAction () ... -------------------------");
  
  try {
    const formData: z.infer<typeof AddServiceAPISchema> = await req.json();

    // 1. Check authentication
    const { user, session } = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    // 3. Insert service
    const [newService] = await db
      .insert(service)
      .values({
        ...formData,
        maxCapacity: formData.max_capacity,
        user_id: formData.user_id,
      })
      .returning();

    if (!newService) {
      return NextResponse.json(
        { message: "Failed to create service" },
        { status: 500 }
      );
    }

    console.log("Inserted a new service : ", newService);
    
    // 4. Generate slots
    console.log("Generating slots : ", "-------------");
    const slots: { id: string }[] = await GenerateSlots(
      { id: true },
      {
        id: newService.id,
        duration: newService.duration,
        working_days: newService.working_days,
        start_time: newService.start_time,
        end_time: newService.end_time,
      },
    );

    console.log(`Generated total ${slots.length} slots ...`);
    console.log("----------------------------Operation completed successfully-----------------------------");

    return NextResponse.json(
      {
        message: "Added a new service",
        service: newService,
        appointments: [],
      },
      { status: 201 },
    );
    
  } catch (err) {
    // Handle different types of errors
    console.error("Error in addServiceAction:", err);
    
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Invalid JSON payload" },
        { status: 400 }
      );
    }
    
    if (err instanceof Error) {
      // Check for specific error types
      if (err.message.includes("authentication") || err.message.includes("session")) {
        return NextResponse.json(
          { message: "Authentication failed", details: err.message },
          { status: 401 }
        );
      }
      
      if (err.message.includes("database") || err.message.includes("db")) {
        return NextResponse.json(
          { message: "Database operation failed", details: err.message },
          { status: 500 }
        );
      }
      
      // Generic error
      return NextResponse.json(
        { message: "An error occurred", details: err.message },
        { status: 500 }
      );
    }
    
    // Fallback for unknown error types
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
};
```