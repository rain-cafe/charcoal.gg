-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "description" TEXT,
    "bio" TEXT,
    "creator_id" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plugin" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "template" TEXT NOT NULL,

    CONSTRAINT "Plugin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterPlugin" (
    "character_id" TEXT NOT NULL,
    "plugin_id" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "CharacterPlugin_pkey" PRIMARY KEY ("character_id","plugin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterPlugin" ADD CONSTRAINT "CharacterPlugin_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterPlugin" ADD CONSTRAINT "CharacterPlugin_plugin_id_fkey" FOREIGN KEY ("plugin_id") REFERENCES "Plugin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
