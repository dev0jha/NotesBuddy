-- SQL Script to Make User Admin
-- Run this in your database client or via Prisma Studio

-- Replace 'your-user-id' with your actual user ID
-- You can find your user ID by checking the session or database

-- Update user role to ADMIN
UPDATE "user" 
SET role = 'ADMIN' 
WHERE email = 'your-email@gmail.com';

-- Or if you know your user ID:
UPDATE "user" 
SET role = 'ADMIN' 
WHERE id = 'your-user-id';

-- To verify:
SELECT id, name, email, role FROM "user";
