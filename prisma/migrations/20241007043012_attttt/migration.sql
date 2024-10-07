-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_homeId_fkey";

-- DropForeignKey
ALTER TABLE "NavbarItem" DROP CONSTRAINT "NavbarItem_homeId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavbarItem" ADD CONSTRAINT "NavbarItem_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;
