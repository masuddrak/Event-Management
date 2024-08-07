import { connectDB } from "@/lib/ocnnectDB";
const bcrypt = require('bcrypt');

import { NextResponse } from "next/server";
export const POST = async (request) => {
  const newUser = await request.json();
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");
    const existUser=await userCollection.findOne({email:newUser.email})
    if(existUser){
        return NextResponse.json({ message: "already have you account " }, { status: 304 });
    }
    const hasPassword=bcrypt.hashSync(newUser.password, 14);
    const resp = await userCollection.insertOne({...newUser,password:hasPassword});
    return NextResponse.json({ message: "User Created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong", error },
      { status: 500 }
    );
  }
};
