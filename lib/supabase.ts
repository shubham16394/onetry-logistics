import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Quote {
  id?: string
  company_name: string
  contact_person: string
  email: string
  phone: string
  pickup_location: string
  drop_location: string
  goods_description: string
  weight: string
  packing_type: string
  load_type: string
  length?: string
  width?: string
  height?: string
  created_at?: string
}
