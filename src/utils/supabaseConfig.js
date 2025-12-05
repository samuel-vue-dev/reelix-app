
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ysmkdmpwbdjeqnwfiioh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbWtkbXB3YmRqZXFud2ZpaW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NjkzOTcsImV4cCI6MjA4MDM0NTM5N30.YXOQEVdt3rcbGW-qyFr2g2ppodsfSyzLCkQLWQ37nGc" ;

export const supabase = createClient(supabaseUrl, supabaseKey);
        