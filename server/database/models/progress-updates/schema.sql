DROP TABLE IF EXISTS "progress_updates" CASCADE;

CREATE TABLE "progress_updates" (
  "id" SERIAL PRIMARY KEY,
  "programme_id" INTEGER REFERENCES programmes(id) NOT NULL,
  "media_id" INTEGER REFERENCES media(id),
  "client_message" TEXT,
  "therapist_message" TEXT,
  "link" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "progress_updates"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();