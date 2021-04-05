ALTER TABLE media
    ADD CONSTRAINT fk_media_users FOREIGN KEY (created_by) REFERENCES users (id);