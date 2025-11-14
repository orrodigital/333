#!/bin/bash
# Vercel build script for backend

echo "Installing FFmpeg..."
# This won't work on Vercel - FFmpeg needs to be bundled differently
# apt-get update && apt-get install -y ffmpeg

echo "Building TypeScript..."
npm run build

echo "Build complete"