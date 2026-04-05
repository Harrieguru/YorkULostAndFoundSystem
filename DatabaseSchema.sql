--RUN THIS IN POSTGRESQL

--Incase the script must be rerun
-- Drop tables
DROP TABLE IF EXISTS item_claim CASCADE;
DROP TABLE IF EXISTS lost_items CASCADE;
DROP TABLE IF EXISTS lost_item_report CASCADE;
DROP TABLE IF EXISTS basic_user CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS passport_york CASCADE;
DROP TABLE IF EXISTS dummy_for_backend_testing CASCADE;

-- Drop types
DROP TYPE IF EXISTS claim_status_type CASCADE;
DROP TYPE IF EXISTS item_status_type CASCADE;
DROP TYPE IF EXISTS status_type CASCADE;
DROP TYPE IF EXISTS category_type CASCADE;
DROP TYPE IF EXISTS material_type CASCADE;
DROP TYPE IF EXISTS colour_type CASCADE;


--Database Schema
CREATE TABLE passport_york(
	cred_id serial primary key,
	university_username varchar(50) not null unique,
 	university_pass_hash text not null
);

Create table person(
	person_id serial primary key,
	name varchar(100),
	cred_id integer not null references passport_york(cred_id)
);

Alter table person 
add constraint passport_to_person_is_1to1 unique(cred_id);

create table staff (
    staff_id SERIAL primary key,
    person_id INTEGER references person(person_id)
);

create table basic_user (
    user_id SERIAL primary key,
    person_id INTEGER unique references person(person_id)
);

CREATE TYPE status_type as enum ('pending', 'resolved');

CREATE TYPE category_type as enum (
    'Electronics', 'Clothing', 'Sports', 'Books', 
    'Bags', 'Identification', 'Personal', 'Other'
);

CREATE TYPE material_type as enum (
    'Metal', 'Plastic', 'Fabric', 'Other'
);

CREATE TYPE colour_type AS ENUM (
    'Black', 'White', 'Silver/Grey', 'Red', 'Blue', 
    'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 
    'Brown', 'Gold', 'Other'
);

-- Only will filter for category, material, and primary colour in website
CREATE TABLE lost_item_report (
report_id SERIAL primary key,
report_date DATE default current_date, 
	item_category category_type not null default 'Other', 
	item_type VARCHAR(50) not null default 'N/A',	
	brand VARCHAR(50) not null default 'N/A',		
material material_type not null default 'Other', 	
primary_colour colour_type not null default 'Other',           
description TEXT,
date_lost DATE,
location_lost varchar(5) not null default 'N/A',
report_status status_type default 'pending',
user_id integer not null references basic_user(user_id)
);


create type item_status_type as enum(
	'Available', 'Claimed'
);


create table lost_items (
	item_id serial primary key,
	item_category category_type not null default 'Other',
	item_type VARCHAR(50) not null default 'N/A',
	brand VARCHAR(50) not null default 'N/A',
	material material_type not null default 'Other',
	primary_colour colour_type not null default 'Other',
	description TEXT,
	date_found DATE,
	location_found varchar(5) not null default 'N/A', 
	item_status item_status_type default 'Available',
	staff_id integer not null references staff(staff_id) 
);


create type claim_status_type as enum(
'pending', 'approved', 'rejected'
);

create table item_claim(
	claim_id serial primary key,
	user_id integer references basic_user(user_id),
	item_id integer references lost_items(item_id),
	claim_status claim_status_type not null default 'pending'
);

ALTER TABLE item_claim 
ADD CONSTRAINT one_claim_per_user_per_item UNIQUE(user_id, item_id);

-- added later
ALTER TABLE staff ADD CONSTRAINT unique_staff_person_id UNIQUE (person_id); 

ALTER TABLE basic_user ADD CONSTRAINT unique_user_person_id UNIQUE (person_id);

ALTER TABLE person RENAME COLUMN name TO first_name;
ALTER TABLE person ADD COLUMN last_name VARCHAR(100);


CREATE TABLE dummy_for_backend_testing (
	test_id serial primary key, 
	color varchar(40) not null,
	number integer not null,
	is_even boolean not null
);
