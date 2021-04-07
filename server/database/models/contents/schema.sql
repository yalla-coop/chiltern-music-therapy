DROP TABLE IF EXISTS "contents" CASCADE;

CREATE TABLE "contents" (
  "id" SERIAL PRIMARY KEY,
  "media_id" INTEGER REFERENCES media(id),
  "type" media_types NOT NULL,
  "title" VARCHAR(100) NOT NULL,
  "instructions" TEXT,
  "link" TEXT,
  "library_content" BOOLEAN DEFAULT FALSE,
  "therapist_library_user_id" INTEGER REFERENCES users(id),
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "contents"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();