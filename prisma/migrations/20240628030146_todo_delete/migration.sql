/*
  Warnings:

  - You are about to drop the `new_table` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `todo` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- DropTable
DROP TABLE `new_table`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'student',
    `grade` INTEGER NOT NULL DEFAULT 1,
    `points` INTEGER NOT NULL DEFAULT 10,
    `email` VARCHAR(191) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
