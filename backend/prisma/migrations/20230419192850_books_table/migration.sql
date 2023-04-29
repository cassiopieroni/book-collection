-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "bookPublisherId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "totalPages" INTEGER NOT NULL,
    "isFinishedReading" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Book_bookPublisherId_fkey" FOREIGN KEY ("bookPublisherId") REFERENCES "BookPublisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BookPublisher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorToBookPublisher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AuthorToBookPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AuthorToBookPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "BookPublisher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_authorId_title_key" ON "Book"("authorId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BookPublisher_name_key" ON "BookPublisher"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToBookPublisher_AB_unique" ON "_AuthorToBookPublisher"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToBookPublisher_B_index" ON "_AuthorToBookPublisher"("B");
