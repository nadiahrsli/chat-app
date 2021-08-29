const { createClient } = require("@supabase/supabase-js");

const supabaseURL = process.env.SUPABASE_API_URL;
const supabaseApiKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseURL, supabaseApiKey);

module.exports = supabase;
