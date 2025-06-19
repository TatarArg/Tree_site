import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  active: string;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: "1px solid",
  borderColor: theme.palette.divider,
  padding: "8px 12px",
}));

function Navbar({ active }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 0, bgcolor: "transparent", mt: "28px" }}>
      <Container maxWidth="xl">
        <StyledToolbar>
          <Typography variant="h6" sx={{ color: "#5d8aa8" }}>
            Самые высокие здания и сооружения
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant={active === "1" ? "contained" : "text"}
                color="info"
                size="medium"
              >
                Главная
              </Button>
            </Link>

            <Link to="/list" style={{ textDecoration: "none" }}>
              <Button
                variant={active === "2" ? "contained" : "text"}
                color="info"
                size="medium"
              >
                Список зданий
              </Button>
            </Link>

            <Link to="/building/0" style={{ textDecoration: "none" }}>
              <Button
                variant={active === "3" ? "contained" : "text"}
                color="info"
                size="medium"
              >
                Описание
              </Button>
            </Link>

            <Link to="/chart" style={{ textDecoration: "none" }}>
              <Button
                variant={active === "4" ? "contained" : "text"}
                color="info"
                size="medium"
              >
                Диаграммы
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <Link to="/" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={toggleDrawer(false)} selected={active === "1"}>
                    Главная
                  </MenuItem>
                </Link>

                <Link to="/list" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={toggleDrawer(false)} selected={active === "2"}>
                    Список зданий
                  </MenuItem>
                </Link>

                <Link to="/building/0" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={toggleDrawer(false)} selected={active === "3"}>
                    Описание
                  </MenuItem>
                </Link>

                <Link to="/chart" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={toggleDrawer(false)} selected={active === "4"}>
                    Диаграммы
                  </MenuItem>
                </Link>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
