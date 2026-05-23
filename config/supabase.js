const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const normalizeEnv = (value) => {
  if (!value) return value;
  const trimmed = String(value).trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
};

const supabaseUrl = normalizeEnv(process.env.SUPABASE_URL);
const supabaseKey = normalizeEnv(process.env.SUPABASE_KEY);

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key in environment variables');
}

try {
  // Validate URL early so misconfigured env vars fail with a clearer error.
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid SUPABASE_URL: ${error.message}`);
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
