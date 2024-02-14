import { NextRequest } from "next/server";
import prisma from "src/app/config/db";
import { onSuccessRequest, onThrowError } from "../../apiService";
import { verifyUserAuth } from "src/shared/apiShared";

export async function POST(req: NextRequest) {
  try {
    verifyUserAuth(req);
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

    return onSuccessRequest({ data: {}, httpStatusCode: 200, message });
  } catch (error) {
    return onThrowError(error);
  }
}
