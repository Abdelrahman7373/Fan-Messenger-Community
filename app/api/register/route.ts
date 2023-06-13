import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { error } from "console";

export async function POST(
    request: Request
) {
    try{
        const body = await request.json();
        const {email, name, password} = body;
        if(!email || !name || !password) {return new NextResponse('Something is missing!', {status:400})};
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({data:{email, name, hashedPassword}});
        return NextResponse.json(user);
    } catch(error: any) {
        console.log(error, 'REGISTRATION_ERROR');
        return new NextResponse('SERVER ERROR', {status:500});
    }
}