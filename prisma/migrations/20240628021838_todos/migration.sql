/*
  Warnings:

  - You are about to drop the column `done` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `todo` DROP COLUMN `done`,
    ADD COLUMN `is_done` BOOLEAN NOT NULL DEFAULT false;
