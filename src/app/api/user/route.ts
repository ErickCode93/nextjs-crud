import { NextResponse } from "next/server";

// In-memory users array for demonstration (not persistent)
// let users: any[] = [];

export async function GET() {
  // Return all users
  return NextResponse.json("");
}

export async function POST(request: Request) {
  // const data = await request.json();
  // users.push(data);
  return NextResponse.json({
    message: "User created successfully",
    // user: data,
  });
}

export async function PUT(request: Request) {
  const data = await request.json();
  // const { index, user } = data; // expects { index: number, user: { name, email } }
  // if (typeof index === "number" && users[index]) {
  //   users[index] = user;
  //   return NextResponse.json({ message: "User updated", user });
  // }
  return NextResponse.json({ message: "User not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
  const data = await request.json();
  // const { index } = data; // expects { index: number }
  // if (typeof index === "number" && users[index]) {
  //   const deleted = users.splice(index, 1);
  //   return NextResponse.json({ message: "User deleted", user: deleted[0] });
  // }
  return NextResponse.json({ message: "User not found" }, { status: 404 });
}
