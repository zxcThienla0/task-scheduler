-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_refreshToken_key" ON "tokens"("refreshToken");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
