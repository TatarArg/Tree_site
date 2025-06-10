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
    <div className="gallery-view">
      {visibleImages.map((src, idx) => (
        <img key={idx} src={src} className="gallery-image" />
      ))}
    </div>
  );
};

export default GalleryView;