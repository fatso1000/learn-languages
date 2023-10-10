-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Readings" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "locked_texts" INTEGER NOT NULL,

    CONSTRAINT "Readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTexts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "reading_id" INTEGER NOT NULL,

    CONSTRAINT "ReadingTexts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAndAswer" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "options" TEXT[],
    "correct_answer" TEXT NOT NULL,
    "reading_texts_id" INTEGER NOT NULL,

    CONSTRAINT "QuestionAndAswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingTexts_reading_id_key" ON "ReadingTexts"("reading_id");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionAndAswer_reading_texts_id_key" ON "QuestionAndAswer"("reading_texts_id");

-- AddForeignKey
ALTER TABLE "ReadingTexts" ADD CONSTRAINT "ReadingTexts_reading_id_fkey" FOREIGN KEY ("reading_id") REFERENCES "Readings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAndAswer" ADD CONSTRAINT "QuestionAndAswer_reading_texts_id_fkey" FOREIGN KEY ("reading_texts_id") REFERENCES "ReadingTexts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
