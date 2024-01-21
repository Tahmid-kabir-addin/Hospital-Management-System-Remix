/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Bed` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Bed_name_key` ON `Bed`(`name`);
