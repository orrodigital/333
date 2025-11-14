import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function processStretch(inputPath: string, factor: number): Promise<string> {
  try {
    console.log(`Processing video stretch with factor: ${factor}`);
    
    // Calculate stretch transformation
    // factor 1.2 = 20% taller, factor 0.8 = 20% shorter
    const scaleHeight = Math.round(factor * 100);
    
    // Upload to Cloudinary with video transformation
    const result = await cloudinary.uploader.upload(inputPath, {
      resource_type: 'video',
      transformation: [
        {
          height: `${scaleHeight}%`,
          crop: 'scale',
          quality: 'auto:good',
          format: 'mp4',
        }
      ],
      folder: 'video-stretch',
      overwrite: true,
    });

    console.log('Video processed successfully:', result.secure_url);
    return result.secure_url;
    
  } catch (error) {
    console.error('Video processing error:', error);
    throw new Error(`Failed to process video: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}