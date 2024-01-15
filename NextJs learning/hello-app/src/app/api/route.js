import { NextResponse } from "next/server";

export function GET(request) {
  return NextResponse.json({
    name: "arjun singh",
    age: "23",
    height: "5.10 feet",
    city:"surat"
  }, {status:200});
}











// export async function GET(request) {
//   return new Response("first api");
// }

// export default function handler(req, res) {
//     res.status(200).json({ text: 'Hello' });
//   }
