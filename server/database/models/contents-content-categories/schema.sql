DROP TABLE IF EXISTS "contents_content_categories" CASCADE;

CREATE TABLE "contents_content_categories" (
  "id" SERIAL,
  "content_id" INTEGER REFERENCES contents(id) ON DELETE CASCADE NOT NULL,
  "category_id" INTEGER REFERENCES content_categories(id) ON DELETE CASCADE NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT contents_content_categories_pkey PRIMARY KEY (content_id, category_id)
);

CREATE UNIQUE INDEX
  unique_content_category ON contents_content_categories
  (content_id, category_id);


CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "contents_content_categories"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();