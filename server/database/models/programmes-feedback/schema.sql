DROP TABLE IF EXISTS "programmes_feedbacks" CASCADE;

CREATE TABLE "programmes_feedbacks" (
  "id" SERIAL PRIMARY KEY,
  "programme_id" INTEGER REFERENCES programmes(id) NOT NULL,
  "clear_instructions" INTEGER,
  "problems" TEXT,
  "clear_demos" INTEGER,
  "no_demos" BOOLEAN,
  "enjoyable_resources" INTEGER,
  "like_most_and_least" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "programmes_feedbacks"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();