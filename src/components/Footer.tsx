import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'darkslategray', color: 'white', py: 3, mt: 4 }}>
      <Typography align="center" variant="body2">
        Автор: Никита Вдовенков | Контакты:{' '}
        <Link href="mailto:raketa5556@yandex.ru" color="inherit">
          raketa5556@yandex.ru
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer