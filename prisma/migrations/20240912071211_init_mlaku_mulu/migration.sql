-- CreateEnum
CREATE TYPE "location_type" AS ENUM ('departing_from', 'destiination_to');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_tourist" BOOLEAN NOT NULL DEFAULT false,
    "tourist_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "tourist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" "location_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "location_from_id" INTEGER NOT NULL,
    "location_to_id" INTEGER NOT NULL,
    "travel_at" TIMESTAMP(3) NOT NULL,
    "tourist_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tourist_id_key" ON "tourist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "location_id_key" ON "location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "history_id_key" ON "history"("id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "tourist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_location_from_id_fkey" FOREIGN KEY ("location_from_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_location_to_id_fkey" FOREIGN KEY ("location_to_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "tourist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
