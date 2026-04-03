-- IMPORTANT: RUN AFTER DatabaseSchema.sql

INSERT INTO passport_york (university_username, university_pass_hash) 
VALUES 
('student', '$2b$10$xwJwwKYVftFE4qwAc4sv4.iWeeTA88vqggT3WdqGHbnFhXXfWlv1C'), -- Pass: student 
('admin', '$2b$10$rI66KEnPcrLsEPwqb9NV7.5JM5ScuHdnmL0cNL7WnVx7XACuUgCUW'); -- Pass: admin


INSERT INTO person (first_name, last_name, cred_id) 
VALUES 
('Bob', 'Smith', 1), -- Bob is student
('Jane', 'Doe', 2); -- Jane is admin

INSERT INTO basic_user (person_id) VALUES (1);

INSERT INTO staff (person_id) VALUES (2);      

INSERT INTO lost_item_report (item_category, item_type, brand, material, primary_colour, description, date_lost, location_lost, user_id) 
VALUES 
('Electronics', 'Laptop', 'Apple', 'Metal', 'Silver/Grey', 'MacBook Air with a YorkU sticker', '2026-03-25', 'VH', 1), 
('Bags', 'Backpack', 'Herschel', 'Fabric', 'Blue', 'Blue backpack with a broken zipper', '2026-03-28', 'DB', 1); 

-- 10 entries
INSERT INTO lost_items (item_category, item_type, brand, material, primary_colour, description, date_found, location_found, item_status, staff_id) 
VALUES 
('Electronics', 'Smartphone', 'Samsung', 'Metal', 'Black', 'Galaxy S21 with cracked screen', '2026-04-01', 'LAS', 'Available', 1),
('Personal', 'Water Bottle', 'Hydro Flask', 'Metal', 'Blue', 'Scratched blue flask', '2026-04-01', 'VH', 'Available', 1),
('Clothing', 'Hoodie', 'Nike', 'Fabric', 'Red', 'Red hoodie, size Large', '2026-03-30', 'VH', 'Available', 1),
('Books', 'Textbook', 'Pearson', 'Other', 'Black', 'Intro to Psychology textbook', '2026-03-29', 'LAS', 'Available', 1),
('Identification', 'Wallet', 'Generic', 'Fabric', 'Brown', 'Leather wallet, no cash inside', '2026-04-02', 'CLH', 'Available', 1),
('Sports', 'Basketball', 'Spalding', 'Other', 'Orange', 'Well-worn basketball', '2026-03-25', 'TM', 'Available', 1),
('Electronics', 'Headphones', 'Sony', 'Plastic', 'Silver/Grey', 'Noise cancelling over-ear headphones', '2026-04-01', 'ACW', 'Available', 1),
('Personal', 'Umbrella', 'Totes', 'Plastic', 'Yellow', 'Bright yellow folding umbrella', '2026-04-02', 'DB', 'Available', 1),
('Bags', 'Tote Bag', 'YorkU Bookstore', 'Fabric', 'White', 'Canvas tote bag with York logo', '2026-03-27', 'SCL', 'Claimed', 1),
('Clothing', 'Beanie', 'Adidas', 'Fabric', 'Green', 'Green knit winter hat', '2026-04-01', 'SCL', 'Available', 1);



-- 10 extra entries:
INSERT INTO lost_items (item_category, item_type, brand, material, primary_colour, description, date_found, location_found, item_status, staff_id) 
VALUES 
('Electronics', 'Laptop', 'Dell', 'Metal', 'Black', 'XPS 13 in a grey padded sleeve, login screen shows "Student"', '2026-03-20', 'SCL', 'Available', 1),
('Bags', 'Backpack', 'JanSport', 'Fabric', 'Purple', 'Purple backpack with a YorkU keychain and a water bottle', '2026-03-22', 'TM', 'Available', 1),
('Clothing', 'Scarf', 'N/A', 'Fabric', 'Pink', 'Soft woolen pink scarf, very long', '2026-03-24', 'VH', 'Available', 1),
('Personal', 'Glasses', 'Ray-Ban', 'Plastic', 'Gold', 'Tortoiseshell frames in a black leather case with a cleaning cloth', '2026-03-26', 'DB', 'Available', 1),
('Identification', 'Keys', 'Toyota', 'Metal', 'Silver/Grey', 'Car keys with a red YorkU lanyard and a gym tag', '2026-03-28', 'DB', 'Available', 1),
('Books', 'Notebook', 'Moleskine', 'Other', 'Blue', 'Hardcover blue notebook, contains handwritten physics notes', '2026-03-29', 'ACW', 'Available', 1),
('Electronics', 'Tablet', 'Apple', 'Metal', 'Silver/Grey', 'iPad Pro 11-inch with a magnetic Apple Pencil attached', '2026-03-31', 'CLH', 'Available', 1),
('Sports', 'Gym Bag', 'Under Armour', 'Fabric', 'Black', 'Large black duffel bag found near the change rooms', '2026-04-01', 'TM', 'Claimed', 1),
('Personal', 'Watch', 'Casio', 'Metal', 'Gold', 'Classic digital watch with a gold-tone stainless steel strap', '2026-04-02', 'LAS', 'Available', 1),
('Clothing', 'Jacket', 'North Face', 'Fabric', 'Black', 'Black puffer jacket, size Medium, left on a chair', '2026-03-15', 'LAS', 'Available', 1);


--added later
-- account number 3
INSERT INTO passport_york (university_username, university_pass_hash)
VALUES 
('itemHorder', '$2b$10$.CVcwROAeb2ViI71azGEzOEBD14oamUW61NI2a0qeNmmI5bdjBN/6');
-- Password is also itemHorder

INSERT INTO person (first_name, last_name, cred_id)
VALUES 
('Lucy', 'Lament', 3);

INSERT INTO basic_user (person_id)
VALUES 
(3); 

INSERT INTO item_claim (user_id, item_id, claim_status)
VALUES
(2, 9, 'approved'),
(2, 18, 'approved')