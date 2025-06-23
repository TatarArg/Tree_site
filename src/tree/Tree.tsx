import { useParams } from "react-router-dom";
import structures from "../data";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

import { Container, Grid, Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Tree() {
  const { id } = useParams();
  const index = Number(id);
  const tree = structures[index];

  if (!tree) {
    return (
      <>
        <Navbar />
        <Typography variant="h5" sx={{ p: 2 }}>
          Дерево не найдено
        </Typography>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Box>
        <Breadcrumbs
          separator={<NavigateNextIcon />}
        >
          <Link
            to="/"
            style={{
              color: "blue",
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Главная
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: 'medium' }}>
            {tree.name}
          </Typography>
        </Breadcrumbs>
      </Box>


      <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          {tree.name}
        </Typography>

        <Box
          component="img"
          src={tree.image}
          alt={tree.name}
          sx={{
            width: "100%",
            maxWidth: 600,
            height: "auto",
            borderRadius: 2,
            boxShadow: 3,
            mb: 2,
          }}
        />

        { }
        <Typography variant="body1" sx={{ mb: 2, textAlign: "justify" }}>
          {tree.description}
        </Typography>
      </Box>
    </>
  );
}

export default Tree;
