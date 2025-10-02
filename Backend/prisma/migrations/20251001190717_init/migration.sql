-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."events" (
    "event_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,
    "day" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "organizer_id" INTEGER NOT NULL,
    "vip_tickets" INTEGER NOT NULL,
    "reg_tickets" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "image" TEXT NOT NULL,
    "delete_status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "public"."reserved_events" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "complete_status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reserved_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "idx_events_organizer_id" ON "public"."events"("organizer_id");

-- CreateIndex
CREATE INDEX "idx_events_date_time" ON "public"."events"("date_time");

-- CreateIndex
CREATE INDEX "idx_events_city" ON "public"."events"("city");

-- CreateIndex
CREATE INDEX "idx_events_type" ON "public"."events"("type");

-- CreateIndex
CREATE INDEX "idx_events_delete_status" ON "public"."events"("delete_status");

-- CreateIndex
CREATE UNIQUE INDEX "events_title_key" ON "public"."events"("title");

-- CreateIndex
CREATE INDEX "idx_reserved_events_user_id" ON "public"."reserved_events"("user_id");

-- CreateIndex
CREATE INDEX "idx_reserved_events_event_id" ON "public"."reserved_events"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "reserved_events_event_id_user_id_key" ON "public"."reserved_events"("event_id", "user_id");

-- AddForeignKey
ALTER TABLE "public"."events" ADD CONSTRAINT "events_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reserved_events" ADD CONSTRAINT "reserved_events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reserved_events" ADD CONSTRAINT "reserved_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
