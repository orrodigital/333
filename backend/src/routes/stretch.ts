import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { processStretch } from '../lib/ffmpeg';

const router = express.Router();

// Configure multer for temporary file storage
const upload = multer({
  dest: '/tmp/', // Use /tmp for serverless compatibility
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb): void => {
    // Validate file type
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  },
});

// POST /api/stretch - Process video with stretch transformation
router.post('/stretch', upload.single('video'), async (req, res) => {
  let tempFilePath: string | null = null;
  
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ 
        error: 'Missing video file',
        message: 'Please upload a video file'
      });
    }

    // Validate and parse parameters
    const factor = parseFloat(req.body.factor || '1.0');
    const axisStart = JSON.parse(req.body.axisStart || '{"x":0,"y":0}');
    const axisEnd = JSON.parse(req.body.axisEnd || '{"x":0,"y":1}');
    const exportFormat = req.body.exportFormat || 'mp4';

    // Validate factor range
    if (factor < 0.1 || factor > 5.0) {
      return res.status(400).json({
        error: 'Invalid factor',
        message: 'Factor must be between 0.1 and 5.0'
      });
    }

    console.log(`Processing video: ${file.originalname}, factor: ${factor}`);
    
    tempFilePath = file.path;

    // Process video using Cloudinary (no local output needed)
    const processedUrl = await processStretch(tempFilePath, factor);

    // Generate response
    const result = {
      url: processedUrl,
      name: `stretched-${uuidv4()}.mp4`,
      factor,
      originalName: file.originalname,
      processedAt: new Date().toISOString(),
    };

    console.log('Video processing completed successfully');
    res.json(result);

  } catch (error) {
    console.error('Video processing error:', error);
    
    // Send appropriate error response
    if (error instanceof Error) {
      res.status(500).json({
        error: 'Processing failed',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    } else {
      res.status(500).json({
        error: 'Processing failed',
        message: 'Unknown error occurred'
      });
    }
  } finally {
    // Clean up temporary file
    if (tempFilePath) {
      try {
        fs.unlinkSync(tempFilePath);
        console.log('Temporary file cleaned up');
      } catch (cleanupError) {
        console.error('Failed to cleanup temporary file:', cleanupError);
      }
    }
  }
});

// GET /api/stretch/health - Health check for video processing
router.get('/health', (req, res) => {
  res.json({
    service: 'video-stretch',
    status: 'operational',
    timestamp: new Date().toISOString(),
    features: {
      videoProcessing: true,
      cloudinaryIntegration: !!process.env.CLOUDINARY_CLOUD_NAME,
      fileUpload: true,
    }
  });
});

export default router;