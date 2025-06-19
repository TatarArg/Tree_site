import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TreeCardProps {
  image: string;
  title: string;
  description: string;
}

function TreeCard({ image, title, description }: TreeCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%', 
        width: '100%'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ width: 100, height: 70, borderRadius: 1, mr: 2 }}
        />
        <Typography variant="h6">{title}</Typography>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TreeCard;