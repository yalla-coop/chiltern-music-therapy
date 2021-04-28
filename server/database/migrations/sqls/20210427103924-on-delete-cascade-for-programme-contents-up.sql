BEGIN;

ALTER TABLE programmes_contents
DROP CONSTRAINT programmes_contents_programme_id_fkey,
ADD CONSTRAINT programmes_contents_programme_id_fkey
  FOREIGN KEY (programme_id)
  REFERENCES programmes(id)
  ON DELETE CASCADE;


ALTER TABLE programmes_contents ALTER programme_id SET NOT NULL;

ALTER TABLE programmes_contents
DROP CONSTRAINT programmes_contents_content_id_fkey,
ADD CONSTRAINT programmes_contents_content_id_fkey
  FOREIGN KEY (content_id)
  REFERENCES contents(id)
  ON DELETE CASCADE;


ALTER TABLE programmes_contents ALTER content_id SET NOT NULL;


COMMIT;