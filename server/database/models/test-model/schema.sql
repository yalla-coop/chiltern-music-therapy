DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users" (
	"id" serial PRIMARY KEY
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();