import { useState } from "react";
import GalleryView from "./GalleryView";
import GalleryControls from "./GalleryControls";

import Box from "@mui/material/Box";


interface GalleryProps {
  images: string[];
  visible: number;
}

const Gallery = ({ images, visible }: GalleryProps) => {
  const total: number = images.length;
  const [startIndex, setStartIndex] = useState<number>(0);

  const handleNext = (): void => {
    setStartIndex((startIndex + visible) % total);
  };

  const handlePrev = (): void => {
    setStartIndex((startIndex - visible + total) % total);
  };

  return (
    <Box sx = {{textAlign: "center"}}>
      <div className="gallery-container">
        <GalleryView images={images} start={startIndex} count={visible} />
        <GalleryControls onNext={handleNext} onPrev={handlePrev} />
      </div>
    </Box>
  );
};

export default Gallery;