import { NextRequest } from "next/server";
import { onSuccessRequest, onThrowError } from "../../apiService";
import { generateLevelData, getSearchQuery } from "src/shared/apiShared";
import { CustomError, ILevelBody } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";
import { ExerciseDifficulty } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const [difficulty, unit_id, lang] = getSearchQuery(req.url, [
      "difficulty",
      "unit_id",
      "lang",
    ]);

    if (!difficulty || !unit_id || !lang)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request ID.",
      });

    const request = await prisma.exercise.findMany({
      where: { difficulty: difficulty as any, unit: { id: +unit_id } },
      orderBy: { id: "desc" },
      take: 10,
    });

    if (!request)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error not found",
      });

    request.map((ele) => ({ ...ele, lang }));

    return onSuccessRequest({
      httpStatusCode: 200,
      data: request,
    });
  } catch (error) {
    return onThrowError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ILevelBody = await req.json();

    const data = await generateLevelData(body);

    if (!data)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error generating level data.",
      });

    const request = await prisma.exercise.create({
      data: {
        difficulty: data.difficulty as ExerciseDifficulty,
        sourceLanguages: data.sourceLanguage,
        targetLanguages: data.targetLanguage,
        tts: data.tts,
        type: data.type,
        choices: data.choices ? (data.choices as any[]) : [],
        compactTranslations: data.compactTranslations,
        correctAnswers: data.correctAnswers,
        correctIndex: data.correctIndex,
        correctIndices: data.correctIndices ? data.correctIndices : [],
        correctSolutions: data.correctSolutions,
        displayTokens: data.displayTokens ? (data.displayTokens as any[]) : [],
        prompt: data.prompt,
        solutionTranslations: data.solutionTranslation,
        unit: { connect: { id: body.unitId } },
      },
    });

    return onSuccessRequest({
      httpStatusCode: 200,
      data: request,
    });
  } catch (error) {
    return onThrowError(error);
  }
}
