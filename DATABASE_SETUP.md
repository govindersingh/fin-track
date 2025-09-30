# Database Setup Instructions

Before running the application, you need to set up your Supabase database schema.

## Step 1: Run the SQL Migration

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New query**
5. Copy the entire contents of `supabase-migration.sql` file
6. Paste it into the SQL editor
7. Click **Run** or press `Ctrl/Cmd + Enter`

## Step 2: Verify Tables Created

After running the migration, verify that the following tables were created:

- `profiles`
- `accounts`
- `transactions`

You can check this in the **Table Editor** section of your Supabase dashboard.

## Step 3: Run the Application

Once the database schema is set up, you can start using the application:

```bash
npm run dev
```

## What the Migration Creates

### Tables

1. **profiles**: Stores user profile information
   - `id` (linked to auth.users)
   - `full_name`
   - `avatar_url`
   - `plan` (free/paid)
   - Timestamps

2. **accounts**: Stores bank account information
   - `id`
   - `user_id` (linked to profiles)
   - `bank_name`, `branch`
   - `account_number`, `ifsc_code`, `upi_id`
   - `balance`
   - `account_type` (savings/current)
   - Timestamps

3. **transactions**: Stores financial transactions
   - `id`
   - `user_id` (linked to profiles)
   - `account_id` (linked to accounts)
   - `date`, `description`
   - `amount`, `type` (credit/debit)
   - `category`
   - Timestamps

### Security (RLS Policies)

All tables have Row Level Security enabled with policies ensuring:
- Users can only view, create, update, and delete their own data
- Authentication is required for all operations
- Data is properly isolated between users

### Indexes

Performance indexes are created on:
- `transactions.user_id`
- `transactions.account_id`
- `transactions.date`
- `accounts.user_id`

### Triggers

Automatic `updated_at` timestamp updates on all tables.

## Troubleshooting

If you encounter any errors:

1. **"relation already exists"**: The tables are already created. You can proceed to use the app.
2. **"permission denied"**: Make sure you're logged into your Supabase project and have admin access.
3. **Auth errors**: Ensure your Supabase URL and anon key in `.env` are correct.

## Next Steps

After setup:
1. Sign up for an account in the app
2. Add your bank accounts
3. Record transactions
4. View reports and analytics

Your data is securely stored in your Supabase database with full encryption and access control.