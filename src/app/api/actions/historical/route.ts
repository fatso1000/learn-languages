import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/config/db";
import { onThrowError } from "../../apiService";

export async function POST(req: NextRequest) {
  try {
    let message = "Historical Saved successfully";
    const { user_id, content_id } = await req.json();

    const isExisting = await prisma.historical.findFirst({
      where: {
        content_id,
        user_id,
      },
    });

    if (!isExisting) {
      await prisma.historical.create({
        data: { user_id, content_id },
      });
    } else {
      const current_date = new Date();
      await prisma.historical.update({
        where: { id: isExisting.id },
        data: { last_watched: current_date },
      });
      message = "Historical modified successfully.";
    }

    return NextResponse.json({ message });
  } catch (error) {
    return onThrowError(error);
  }
}
