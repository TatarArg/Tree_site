import React from "react";
import Box from "@mui/material/Box";
import GalleryView from "./GalleryView";

interface GalleryProps {
  images: string[];
  visible: number;
}

const Gallery = ({ images, visible }: GalleryProps) => {
  return (
    <Box sx={{ textAlign: "center", my: 3 }}>
      <div>
        <GalleryView images={images} start={0} count={visible} />
      </div>
    </Box>
  );
};

export default Gallery;