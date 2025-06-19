import React from 'react';
import Box from '@mui/material/Box';

interface GalleryViewProps {
  images: string[];
  start: number;
  count: number;
}

const GalleryView = ({ images, start, count }: GalleryViewProps) => {
  const total: number = images.length;
  const visibleImages: string[] = [];

  for (let i = 0; i < count; i++) {
    visibleImages.push(images[(start + i) % total]);
  }

  return (
    <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
      {visibleImages.map((src, idx) => (
        <Box
          key={idx}
          component="img"
          src={src}
          sx={{
            width: 280,
            height: 200,
            border: '2px solid',
            borderRadius: 1,
          }}
        />
      ))}
    </Box>
  );
};

export default GalleryView;