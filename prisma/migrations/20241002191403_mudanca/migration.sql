/*
  Warnings:

  - You are about to alter the column `type` on the `chartdata` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `tipo` on the `conta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `userId` to the `Conta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chartdata` MODIFY `type` ENUM('PIE', 'LINE', 'BAR') NOT NULL;

-- AlterTable
ALTER TABLE `conta` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `tipo` ENUM('PAGAR', 'RECEBER') NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Conta_vencimento_idx` ON `Conta`(`vencimento`);

-- AddForeignKey
ALTER TABLE `Conta` ADD CONSTRAINT `Conta_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
