
import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these with your actual Supabase project URL and anon key.
// It is highly recommended to use environment variables for these values.
const supabaseUrl = 'https://wvfzbsmryxzqbrgyksyd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Znpic21yeXh6cWJyZ3lrc3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NzA3NzcsImV4cCI6MjA3ODI0Njc3N30.hu3-S_kMV2Ubph2gZeSl8vzovWSPeZQJyMVu_2rSMaQ';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Please check your configuration.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
