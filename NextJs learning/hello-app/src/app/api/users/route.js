import { NextResponse } from "next/server";
import { userdata } from "../../../Utils/db";

export function GET() {
  const data = userdata;
  return NextResponse.json(data, { status: 202 });
}

export async function POST(request){
  const payload = await request.json()
  console.log(payload);
  return NextResponse.json(payload)
}
