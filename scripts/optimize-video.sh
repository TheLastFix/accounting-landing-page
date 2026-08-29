#!/bin/bash

# Check if a video path argument was provided
if [ -z "$1" ]; then
  echo "Error: Please provide a input video file path."
  echo "Usage: ./optimize-video.sh path/to/video.mov"
  exit 1
fi

INPUT_VIDEO="$1"
OUTPUT_DIR="public/videos"

# Check if input video exists
if [ ! -f "$INPUT_VIDEO" ]; then
  echo "Error: File '$INPUT_VIDEO' not found."
  exit 1
fi

# Note: In Nuxt, static assets served directly should go to 'public/' rather than 'assets/'
mkdir -p "$OUTPUT_DIR"

# Extract filename without extension
FILENAME=$(basename -- "$INPUT_VIDEO")
FILENAME_NO_EXT="${FILENAME%.*}"

WEBM_OUTPUT="$OUTPUT_DIR/${FILENAME_NO_EXT}.webm"
MP4_OUTPUT="$OUTPUT_DIR/${FILENAME_NO_EXT}.mp4"
POSTER_OUTPUT="$OUTPUT_DIR/${FILENAME_NO_EXT}-poster.jpg"

echo "--------------------------------------------------"
echo "Processing video: $INPUT_VIDEO"
echo "Output directory: $OUTPUT_DIR"
echo "--------------------------------------------------"

# 1. Generate WebM (VP9)
echo "Generating WebM version..."
ffmpeg -y -i "$INPUT_VIDEO" -vf "scale=1920:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 38 -an "$WEBM_OUTPUT"

# 2. Generate MP4 (H.264)
echo "Generating MP4 version..."
ffmpeg -y -i "$INPUT_VIDEO" -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart "$MP4_OUTPUT"

# 3. Generate Poster Image (First frame)
echo "Generating Poster image..."
ffmpeg -y -i "$INPUT_VIDEO" -vframes 1 -q:v 2 "$POSTER_OUTPUT"

echo "--------------------------------------------------"
echo "Done! All assets generated successfully in $OUTPUT_DIR:"
echo " - $WEBM_OUTPUT"
echo " - $MP4_OUTPUT"
echo " - $POSTER_OUTPUT"
echo "--------------------------------------------------"