import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/config/db";
import { onThrowError } from "../apiService";

// ADD NEW LANGUAGE TO USER
export async function POST(req: NextRequest) {
  try {
    let body = await req.json();

    const languageAlreadyExistsInUser = await prisma.userLanguages.findFirst({
      where: {
        details: { id: body.language_id },
        user_profile: { id: body.user_profile_id },
      },
    });

    const transactions: any[] = [
      prisma.userLanguages.updateMany({
        data: { active: false },
        where: { user_profile: { id: body.user_profile_id } },
      }),
    ];

    if (languageAlreadyExistsInUser) {
      transactions.push(
        prisma.userLanguages.update({
          where: { id: languageAlreadyExistsInUser.id },
          data: { active: true },
          include: { details: true },
        })
      );
    } else {
      transactions.push(
        prisma.userLanguages.create({
          data: {
            active: true,
            details: {
              connect: {
                id: body.language_id,
              },
            },
            user_profile: {
              connect: {
                id: body.user_profile_id,
              },
            },
          },
          include: { details: true },
        })
      );
    }

    if (body.hasOwnProperty("refresh"))
      transactions.push(
        prisma.user.findFirst({
          where: { profile: { id: body.user_profile_id } },
          include: {
            profile: { include: { languages: { include: { details: true } } } },
            rank: { include: { rank: true } },
          },
        })
      );

    const request = await prisma.$transaction(transactions);

    return NextResponse.json({ request });
  } catch (error) {
    return onThrowError(error);
  }
}

export async function GET() {
  try {
    const request = await prisma.userLanguages.findMany();
    return NextResponse.json(request);
  } catch (error) {
    return onThrowError(error);
  }
}
