DROP TABLE IF EXISTS "content_categories" CASCADE;

CREATE TABLE "content_categories" (
  "id" SERIAL PRIMARY KEY,
  "text" VARCHAR(100) NOT NULL UNIQUE,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "content_categories"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();