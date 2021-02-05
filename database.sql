CREATE DATABASE salesdb;

CREATE TABLE sale(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(255),
    amount VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP

);
CREATE TABLE sale(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(255),
    amount VARCHAR(255),
    created_at datetime,
    updated_at datetime

);

ALTER TABLE sale
ALTER COLUMN created_at TYPE TIMESTAMP,
ALTER COLUMN updated_at TYPE TIMESTAMP;

ALTER TABLE sale
  ALTER created_at DROP DEFAULT
 ,ALTER created_at type timestamp USING created_at::date
 ,ALTER created_at SET DEFAULT NULL::date
  ALTER updated_at DROP DEFAULT
 ,ALTER updated_at type timestamp USING updated_at::timestamp
 ,ALTER updated_at SET DEFAULT '1970-01-01 01:00:00'::timestamp;


 SELECT *
  FROM sale
 WHERE created_at >= NOW().TO_DATE() - interval '12 hour';

 select *
from sale
where created_at BETWEEN str_to_date(NOW(), '%Y-%m-%d') AND '2018-01-31';


SELECT *
FROM sale
WHERE (created_at::DATE >= date_trunc('week', CURRENT_TIMESTAMP - interval '1 week')::DATE and
       created_at::DATE < date_trunc('week', CURRENT_TIMESTAMP)::DATE
      )