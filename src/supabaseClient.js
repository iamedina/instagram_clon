import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vybtgkfjiriempihahcu.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5YnRna2ZqaXJpZW1waWhhaGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTUxNDgsImV4cCI6MjA3MzQzMTE0OH0.tklbp87Bdx5wwssRJNsBVdMSu6Z9SDBZX3mNFLlLBzI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)