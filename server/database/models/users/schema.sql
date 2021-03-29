DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(20) NOT NULL,
  "last_name" VARCHAR(20) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "reset_password_token" TEXT,
  "over_16" BOOLEAN DEFAULT TRUE NOT NULL,
  "postcode" VARCHAR(9), -- for clients, for now its 2 char, but could be full later
  "mobile_number" VARCHAR(50) UNIQUE,
  "contact_number" VARCHAR(50),
  "roles" user_roles[] NOT NULL,
  "status" user_statuses NOT NULL DEFAULT 'ACTIVE',
  "contact_email" VARCHAR(100),
  "bio" TEXT,
  "profile_photo_media_id" INTEGER REFERENCES medias(id),
  "organisation_id" INTEGER REFERENCES organisations(id),
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();