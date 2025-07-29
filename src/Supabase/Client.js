// src/supabase/client.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zmcrsetdpmgmmeqwkaeq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptY3JzZXRkcG1nbW1lcXdrYWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMTc2MTksImV4cCI6MjA2Nzc5MzYxOX0.drZLzz8wcWpoUUkmBfTWZr_cLWwxvEbq2XU8lIDljEw';

export const supabase = createClient(supabaseUrl, supabaseKey);
