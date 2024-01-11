import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/config/db";
import { onThrowError } from "../../apiService";
import { MAX_EXPERIENCE } from "src/shared/helpers";
import { verifyUserAuth } from "src/shared/apiShared";

export async function POST(req: NextRequest) {
  try {
    verifyUserAuth(req);
    let message = "Historical Saved successfully";
    const { user_id, experience } = await req.json();

    const userRank = await prisma.userRank.findFirst({
      where: {
        user_id,
      },
      select: {
        user_experience: true,
        rank_id: true,
      },
    });

    if (userRank != null) {
      const isExistNextRank =
        (await prisma.ranks.findUnique({
          where: { id: userRank?.rank_id + 1 },
        })) !== null;

      const { user_experience, rank_id } = userRank;

      let newExperience = user_experience + experience;

      const isUpgradeLevel = user_experience + experience >= MAX_EXPERIENCE;

      if (isUpgradeLevel && !isExistNextRank) newExperience = MAX_EXPERIENCE;
      if (isUpgradeLevel && isExistNextRank) newExperience -= MAX_EXPERIENCE;

      const current_date = new Date();

      await prisma.user.update({
        where: { id: user_id },
        data: {
          rank: {
            update: {
              data: {
                updated_at: current_date,
                user_experience: newExperience,
                rank_id:
                  isUpgradeLevel && isExistNextRank ? rank_id + 1 : rank_id,
              },
            },
          },
        },
      });

      message = "Historical modified successfully.";

      return NextResponse.json({ message });
    }
  } catch (error) {
    return onThrowError(error);
  }
}
