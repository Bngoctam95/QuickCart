import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request)

        await dbConnect()
        const user = await User.findById(userId)

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" })
        }

        return NextResponse.json({ success: true, user })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}