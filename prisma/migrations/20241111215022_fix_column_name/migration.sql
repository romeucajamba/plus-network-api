/*
  Warnings:

  - You are about to drop the column `pasword_hash` on the `user` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `pasword_hash`,
    ADD COLUMN `password_hash` VARCHAR(191) NOT NULL;
