CREATE TABLE creation (
  id          BIGSERIAL PRIMARY KEY,
  title       VARCHAR(120) NOT NULL,
  description VARCHAR(500) NOT NULL,
  img         VARCHAR(300) NOT NULL,
  alt         VARCHAR(200) NOT NULL,
  position    INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE photo (
  id       BIGSERIAL PRIMARY KEY,
  src      VARCHAR(300) NOT NULL,
  alt      VARCHAR(200) NOT NULL,
  position INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE contact_message (
  id         BIGSERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  message    VARCHAR(2000) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_read    BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX idx_contact_message_created ON contact_message (created_at DESC);
