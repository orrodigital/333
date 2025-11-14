export default {
  expo: {
    name: "VideoStretch",
    slug: "video-stretch",
    version: "1.0.0",
    platforms: ["ios", "android", "web"],
    sdkVersion: "49.0.0",
    extra: {
      backendUrl: process.env.BACKEND_URL || "https://your-backend.example.com",
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    }
  }
};