-- CreateTable
CREATE TABLE "BattleLogMessage" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BattleLogMessage_pkey" PRIMARY KEY ("id")
);
