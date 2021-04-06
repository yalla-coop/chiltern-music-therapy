DROP TABLE IF EXISTS "therapist_clients" CASCADE;

CREATE TABLE "therapist_clients" (
  "id" SERIAL PRIMARY KEY,
  "therapist_user_id" INTEGER REFERENCES users(id) NOT NULL,
  "client_user_id" INTEGER REFERENCES users(id) NOT NULL UNIQUE,
  "therapy_background" TEXT,
  "therapy_goals" JSON[], -- [{ goal: '', category: ''}]
  "therapist_bio" TEXT,
  "therapist_intro" TEXT,
  "therapist_message" TEXT,
  "invite_token" VARCHAR(8) NOT NULL UNIQUE,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "therapist_clients"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();