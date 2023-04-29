import * as React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';


export default function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            Minha coleção de livros
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
