import { useParams } from "react-router-dom";
import structures from "../data"; 
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

function Building() {
  const { id } = useParams();
  const index = Number(id);
  const building = structures[index];

  if (!building) {
    return (
      <>
        <Navbar active="3" />
        <Typography variant="h5" sx={{ p: 2 }}>Здание не найдено</Typography>
      </>
    );
  }

  return (
    <>
      <Navbar active="3" />
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          {building.title}
        </Typography>

        <Box
          component="img"
          src={building.img}
          alt={building.title}
          sx={{
            width: "100%",
            maxWidth: 600,
            height: "auto",
            borderRadius: 2,
            boxShadow: 3,
            mb: 2,
          }}
        />

        {building.description.map((paragraph, idx) => (
          <Typography key={idx} variant="body1" sx={{ mb: 2, textAlign: "justify" }}>
            {paragraph}
          </Typography>
        ))}
      </Box>
    </>
  );
}

export default Building;