DROP TABLE IF EXISTS "programmes" CASCADE;

CREATE TABLE "programmes" (
  "id" SERIAL PRIMARY KEY,
  "therapists_clients_id" INTEGER,
  "description" TEXT,
  "status" programme_statuses NOT NULL DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "programmes"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();