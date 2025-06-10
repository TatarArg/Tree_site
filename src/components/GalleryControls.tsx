import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

interface GalleryControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

const GalleryControls = ({ onPrev, onNext }: GalleryControlsProps) => {
  return (
    <Box mt={10} display="flex" justifyContent="center" gap={2}>
      <Button variant="contained"  onClick={onPrev}>
        Назад
      </Button>
      <Button variant="contained" onClick={onNext}>
        Вперёд
      </Button>
    </Box>
  );
};

export default GalleryControls;