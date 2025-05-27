const GalleryControls = (props) => {
  return (
    <div>
      <button onClick={props.onPrev}>Назад</button>
      <button onClick={props.onNext}>Вперёд</button>
    </div>
  );
};

export default GalleryControls;