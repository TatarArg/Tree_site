import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TreeCard from '../components/TreeCard';
import trees from '../data';

function TreesPage() {
  return (
    <Container sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3, 
          justifyContent: 'space-between',
        }}
      >
        {trees.map((tree, index) => (
          <Box
            key={index}
            sx={{
              flex: '0 1 calc(50% - 12px)', 
              display: 'flex',
              mb: 3,
            }}
          >
            <TreeCard
              image={tree.image}
              title={tree.name}
              description={tree.description}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default TreesPage;