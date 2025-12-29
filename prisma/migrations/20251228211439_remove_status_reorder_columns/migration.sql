-- CreateTable: Migration inicial baseada no schema.prisma atual
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(256),
    "title" VARCHAR(256) NOT NULL,
    "summary" VARCHAR(500),
    "content" TEXT NOT NULL,
    "author" VARCHAR(256),
    "category" VARCHAR(64),
    "image_url" VARCHAR(512),
    "publish_date" VARCHAR(64),
    "changedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");
CREATE INDEX "slug" ON "posts"("slug");
CREATE INDEX "publish_date" ON "posts"("publish_date");
