/*
  Warnings:

  - A unique constraint covering the columns `[calendarId,name]` on the table `employees` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."employees_calendarId_key";

-- CreateIndex
CREATE UNIQUE INDEX "employees_calendarId_name_key" ON "employees"("calendarId", "name");
