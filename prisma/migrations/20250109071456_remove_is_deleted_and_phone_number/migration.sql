/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `isDeleted`,
    DROP COLUMN `phoneNumber`;
