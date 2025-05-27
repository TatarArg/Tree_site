const GalleryView = (props) => {
  const total = props.images.length;
  const visibleImages = [];

  for (let i = 0; i < props.count; i++) {
    visibleImages.push(props.images[(props.start + i) % total]);
  }

  return (
    <div className="gallery-view">
      {visibleImages.map((src, id) => (
        <img src={src} className="gallery-image" />
      ))}
    </div>
  );
};

export default GalleryView;