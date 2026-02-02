-- Fix staff photo field to support full base64 images
-- Change from VARCHAR(255) to LONGTEXT to store complete base64 images

USE ecommerce;

-- Update the photo column to LONGTEXT to handle full base64 images
ALTER TABLE staffs MODIFY COLUMN photo LONGTEXT;

-- Verify the change
DESCRIBE staffs;