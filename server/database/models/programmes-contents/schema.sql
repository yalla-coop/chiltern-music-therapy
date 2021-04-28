DROP TABLE IF EXISTS "programmes_contents" CASCADE;

CREATE TABLE "programmes_contents" (
  "id" SERIAL PRIMARY KEY,
  "programme_id" INTEGER REFERENCES programmes(id) NOT NULL,
  "content_id" INTEGER REFERENCES contents(id) ON DELETE CASCADE NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "programmes_contents"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();