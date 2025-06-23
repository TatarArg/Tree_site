import trees from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';

import Container from '@mui/material/Container'; 


function TreesGrid() {

  const rows: GridRowsProp = trees;

  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название', flex: 1 },
    { field: 'Тип', flex: 0.5 },
    { field: 'Продолжительность жизни, лет', flex: 0.5 },
    { field: 'Континент', flex: 0.5 },
    { field: 'Высота, м' },
    { field: 'Диаметр, м' },
  ];

  return (
 <Container maxWidth="lg" sx={{ height: '700px', mt: '20px' }}>
    <DataGrid
      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      rows={rows}
      columns={columns}
      showToolbar={true} 
    />
    </Container>

  );
}

export default TreesGrid; 