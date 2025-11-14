import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function uploadToSupabase(filePath: string, filename: string) {
  const file = fs.readFileSync(filePath);
  const bucket = 'processed-videos';
  await supabase.storage.createBucket(bucket, { public: true }).catch(() => {});
  const { error } = await supabase.storage.from(bucket).upload(filename, file, {
    contentType: 'video/mp4',
    upsert: true
  });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data.publicUrl;
}