DROP TABLE IF EXISTS "view_accesses" CASCADE;

CREATE TABLE "view_accesses" (
  "id" SERIAL PRIMARY KEY,
  "owner_user_id" INTEGER REFERENCES users(id) NOT NULL,
  "grant_to_user_id" INTEGER REFERENCES users(id) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "view_accesses"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();