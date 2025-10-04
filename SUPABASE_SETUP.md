# Supabase Setup for OneTry Logistics

## Free Supabase Database Setup

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with your GitHub account (free)
3. Click "New Project"
4. Choose organization and create project
5. Wait for project to be ready (2-3 minutes)

### Step 2: Get Project Credentials
1. Go to Settings → API
2. Copy your Project URL and Anon Key:
   - `Project URL`: https://your-project-id.supabase.co
   - `anon/public key`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

### Step 3: Create Environment Variables
Create `.env.local` file in your project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Create Database Table
1. Go to Supabase Dashboard → SQL Editor
2. Run this SQL to create the quotes table:

```sql
CREATE TABLE quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  goods_description TEXT NOT NULL,
  weight TEXT NOT NULL,
  packing_type TEXT NOT NULL,
  load_type TEXT NOT NULL,
  length TEXT,
  width TEXT,
  height TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later)
CREATE POLICY "Allow all operations" ON quotes FOR ALL USING (true);
```

### Step 5: Deploy to Vercel
1. Add the environment variables to your Vercel project:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Redeploy your project

## Benefits of Supabase:
- ✅ **Free tier**: 500MB database, real-time subscriptions
- ✅ **Serverless-friendly**: Works perfectly with Vercel
- ✅ **Real-time**: Automatic real-time updates
- ✅ **Built-in Auth**: User authentication system
- ✅ **Dashboard**: Easy data management interface
- ✅ **Scalable**: Grows with your application

## Alternative: Quick Deploy with Mock Data
If you want to deploy immediately without setting up a database, I can create a mock data version that works in production.
