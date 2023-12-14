--user credentials table with PK ID
CREATE TABLE login_info (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--scores table with highest score and associated user_Id
CREATE TABLE highest_scores (
  record_id SERIAL PRIMARY KEY,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  score integer NOT NULL,
  user_id SERIAL REFERENCES login_info(user_id) ON DELETE CASCADE
);