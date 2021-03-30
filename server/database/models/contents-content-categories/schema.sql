DROP TABLE IF EXISTS "contents_content_categories" CASCADE;

CREATE TABLE "contents_content_categories" (
  "id" SERIAL PRIMARY KEY,
  "content_id" INTEGER REFERENCES contents(id) NOT NULL,
  "category_id" INTEGER REFERENCES content_categories(id) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "contents_content_categories"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();