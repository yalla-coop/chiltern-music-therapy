DROP TABLE IF EXISTS "media" CASCADE;

CREATE TABLE "media" (
  "id" SERIAL PRIMARY KEY,
  "type" media_types NOT NULL,
  "file_name" VARCHAR(255),
  "key" TEXT NOT NULL UNIQUE,
  "bucket" VARCHAR(50) NOT NULL,
  "bucket_region" VARCHAR(15) NOT NULL,
  "size" INTEGER,
  "path" VARCHAR,
  "file_type" VARCHAR(50),
  "created_by" INTEGER REFERENCES users(id),
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "media"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();