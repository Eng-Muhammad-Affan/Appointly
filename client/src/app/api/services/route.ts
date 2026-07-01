import { NextResponse } from "next/server";
import db from "@/db";
import { service } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const GET = async () => {
  try {
    
    // Test 2: Try the relation query
    const services = await db.query.service.findMany({
      where: eq(service.is_active, true),
      with: {
        user: {
          columns:{
            name:true
          }
        }
      },
      columns: {
        is_active:false,
        maxCapacity:false,
        last_generated:false,
      }
    });
    
    
    return NextResponse.json(services, { status: 200 });
  } catch (err) {
    console.error("Query error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};