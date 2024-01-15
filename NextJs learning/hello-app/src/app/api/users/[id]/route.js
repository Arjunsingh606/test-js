import { NextResponse } from "next/server";
import { userdata } from "../../../../Utils/db";

export function GET(request, content) {
  const data = userdata;

  const user = data.filter ((item)=>item.id == content.params.id)
  return NextResponse.json(user, { status: 202 });
}
