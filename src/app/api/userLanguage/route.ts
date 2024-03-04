import { NextRequest } from "next/server";
import prisma from "src/app/config/db";
import { onSuccessRequest, onThrowError } from "../apiService";
import { verifyUserAuth } from "src/shared/apiShared";

export async function POST(req: NextRequest) {
  try {
    verifyUserAuth(req);
    let body = await req.json();
    body = typeof body === "string" ? JSON.parse(body) : body;

    const stringify = body.language.split(",");
    const languageAlreadyExistsInUser = await prisma.userLanguages.findFirst({
      where: {
        details: {
          base_language: { name: stringify[0] },
          target_language: { path: ["name"], equals: stringify[1] },
        },
        user_profile: { id: body.user_profile_id },
      },
      include: {
        details: {
          include: { base_language: true, user_language: true },
        },
      },
    });
    const languageCombo = await prisma.languagesCombos.findFirst({
      where: {
        base_language: { name: stringify[0] },
        target_language: { path: ["name"], equals: stringify[1] },
      },
      include: {
        base_language: true,
        user_language: true,
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
          include: {
            details: { include: { base_language: true, user_language: true } },
          },
        })
      );
    } else {
      transactions.push(
        prisma.userLanguages.create({
          data: {
            active: true,
            details: {
              connect: {
                id: languageCombo?.id,
              },
            },
            user_profile: {
              connect: {
                id: body.user_profile_id,
              },
            },
          },
          include: {
            details: { include: { base_language: true, user_language: true } },
          },
        })
      );
    }

    transactions.push(
      prisma.user.findFirst({
        where: { profile: { id: body.user_profile_id } },
        include: {
          profile: {
            include: {
              languages: {
                include: { details: { include: { base_language: true } } },
              },
            },
          },
          rank: { include: { rank: true } },
        },
      })
    );

    const request = await prisma.$transaction(transactions);

    return onSuccessRequest({
      httpStatusCode: 200,
      data: request,
    });
  } catch (error) {
    return onThrowError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    verifyUserAuth(req);
    const request = await prisma.userLanguages.findMany();
    return onSuccessRequest({ data: request, httpStatusCode: 200 });
  } catch (error) {
    return onThrowError(error);
  }
}
