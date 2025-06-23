import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TreeCard from './TreeCard';
import trees from '../../data';
import { Link } from 'react-router-dom';

function TreesPage() {
  return (
    <Container sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: {
            xs: 'center',     // На мобильных — по центру
            md: 'space-between',
          },
        }}
      >
        {trees.map((tree, index) => (
          <Box
            key={index}
            sx={{
              flex: '0 1 calc(50% - 12px)', 
              minWidth: 280,               
              display: 'flex',
              mb: 3,
            }}
          >
            <Link
              to={`/tree/${index}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <TreeCard
                image={tree.image}
                title={tree.name}
                description={tree.description}
              />
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default TreesPage;
