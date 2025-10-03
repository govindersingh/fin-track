# Database Setup Instructions

Your application has been successfully migrated from Supabase Auth to Prisma with NextAuth!

## Next Steps

Since the automatic database connection couldn't be established, please follow these manual steps:

### 1. Run the Database Migration

Go to your **Supabase Dashboard**:
1. Navigate to **SQL Editor**
2. Copy the contents of `setup-database.sql` file
3. Paste and run it in the SQL Editor

This will create all necessary tables:
- `users` - For user authentication
- `accounts` - For bank accounts
- `transactions` - For financial transactions

### 2. Update Environment Variables

After running the migration, update your `.env` file with the correct Supabase connection details:

```bash
# Get these from: Supabase Dashboard → Settings → Database
DATABASE_URL="your-actual-connection-string-here"
NEXTAUTH_SECRET="09f26e402586e2faa8da4c98a35f1b20d6b033c60"
NEXTAUTH_URL="http://localhost:3000"
```

**To get your connection string:**
1. Go to Supabase Dashboard
2. Click on **Settings** → **Database**
3. Copy the **Connection String** (URI format)
4. Replace `[YOUR-PASSWORD]` with your actual database password

### 3. Generate Prisma Client

After updating the `.env` file, run:

```bash
npx prisma generate
```

### 4. Start the Application

```bash
npm run dev
```

## What Changed

✅ **Removed:**
- Supabase Auth (replaced with NextAuth)
- Supabase client library
- All Supabase-specific code

✅ **Added:**
- Prisma ORM for database access
- NextAuth for email/password authentication
- RESTful API routes for all operations
- Proper session management

## Authentication

The app now uses NextAuth with credentials provider:
- Users can sign up with email/password
- Passwords are hashed with bcrypt
- Sessions are managed via JWT tokens
- All API routes are protected with session checks

## API Routes

All database operations now go through secure API routes:

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Login
- `GET /api/accounts` - Get all accounts
- `POST /api/accounts` - Create account
- `GET /api/transactions` - Get transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/stats` - Get statistics
- `GET /api/users/[id]` - Get user profile
- `PUT /api/users/[id]` - Update user profile

All routes require authentication via NextAuth session.
