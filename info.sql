DROP DATABASE IF EXISTS customer;
CREATE DATABASE customer;

USE customer;

CREATE TABLE info(
  item_id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  dob INTEGER(8) NOT NULL,
  email VARCHAR(256) NOT NULL,
  phone INTEGER(10) NOT NULL,
  interest VARCHAR(256) NOT NULL,
  med_card BOOLEAN NOT NULL,
  primary key(item_id)
);

SELECT * FROM info;
