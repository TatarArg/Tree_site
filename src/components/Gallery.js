import { useState } from "react";
import GalleryView from "./GalleryView";
import GalleryControls from "./GalleryControls";


const Gallery = (props) => {
  const total = props.images.length;
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((startIndex + props.visible) % total);
  };

  const handlePrev = () => {
    setStartIndex((startIndex - props.visible + total) % total);
  };

  return (
    <div className="gallery-container">
      <GalleryView images={props.images} start={startIndex} count={props.visible}/>
      <GalleryControls onNext={handleNext} onPrev={handlePrev} />
    </div>
  );
};

export default Gallery;