import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cxjcgcdbhrwtkdqpueto.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4amNnY2RiaHJ3dGtkcXB1ZXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MjMwNjEsImV4cCI6MjA5MDk5OTA2MX0.kyogcBjj5eI90pofLmraBITeI-5AQXF1kVOzrH1sQpc"

export const supabase = createClient(supabaseUrl, supabaseKey)