/*
  Warnings:

  - You are about to drop the column `featuredImae` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "featuredImae",
ADD COLUMN     "featuredImage" TEXT;
