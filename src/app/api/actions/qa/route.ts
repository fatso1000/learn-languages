import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/config/db";
import { onThrowError } from "../../apiService";

export async function POST(req: NextRequest) {
  try {
    let message = "Historical Saved successfully";
    const { user_id } = await req.json();

    const isExisting = await prisma.userRank.findFirst({
      where: {
        user_id,
      },
    });

    const current_date = new Date();
    await prisma.user.update({
      where: { id: 2 },
      data: { rank: { update: { data: { user_experience: 2 } } } },
    });
    message = "Historical modified successfully.";

    return NextResponse.json({ message });
  } catch (error) {
    return onThrowError(error);
  }
}
