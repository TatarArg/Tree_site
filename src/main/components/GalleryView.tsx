import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

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
      {visibleImages.map((src, idx) => {
        const globalIndex = (start + idx) % total;

        return (
          <Link
            key={idx}
            to={`/tree/${globalIndex}`}
            style={{ textDecoration: 'none' }}
          >
            <Box
              component="img"
              src={src}
              sx={{
                width: 280,
                height: 200,
                border: '2px solid',
                borderRadius: 1,
              }}
            />
          </Link>
        );
      })}
    </Box>
  );
};

export default GalleryView;
