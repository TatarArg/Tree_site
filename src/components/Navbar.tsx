import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';


function Navbar() {
  const theme = useTheme();
  const isMediumOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar
        sx={{
          justifyContent: isMediumOrSmaller ? 'center' : 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography
          sx={{
            flexGrow: isMediumOrSmaller ? 0 : 1,
            textAlign: isMediumOrSmaller ? 'center' : 'left',
          }}
        >
          Топ высоких деревьев
        </Typography>

        {!isMediumOrSmaller && (
          <Box>
            <Link to="/">
              <Button color="inherit">Главная</Button>
            </Link>

            <Link to="/list">
              <Button color="inherit">Список Деревье</Button>
            </Link>
            <Link to="/Tree/0">
              <Button color="inherit">Дерево</Button>
            </Link>
            <Link to="/chart">
              <Button color="inherit">Диаграммы</Button>
            </Link>

          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar