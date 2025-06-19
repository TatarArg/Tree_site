import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
            <Button color="inherit">Главное</Button>
            <Button color="inherit">Дерево</Button>
            <Button color="inherit" disabled>
              Топ высоких деревьев
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar