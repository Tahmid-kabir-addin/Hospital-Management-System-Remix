-- DropForeignKey
ALTER TABLE `Bed` DROP FOREIGN KEY `Bed_patientId_fkey`;

-- AlterTable
ALTER TABLE `Bed` MODIFY `patientId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Bed` ADD CONSTRAINT `Bed_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
