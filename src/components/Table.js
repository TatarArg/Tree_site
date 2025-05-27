import { useState } from "react";
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';

const Table = (props) => {
    const [dataTable, setDataTable] = useState(props.data);
    const updateDataTable = (value) => 
    {
        setDataTable(value);
        setActivePage("1")

        if (props.filtering) {
            props.filtering(value);
        }
    }

    // Текущее состояние: номер активной страницы
    const [activePage, setActivePage] = useState("1");

    // Обработчик клика по номеру страницы
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    
    const setPagination = props.pagination === true && dataTable.length > props.amountRows;
    const amount = setPagination ? props.amountRows : dataTable.length

    // Количество страниц
    const n = Math.ceil(dataTable.length / props.amountRows);

    // Массив номеров страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    // Формируем элементы пагинации
    const pages = arr.map((item, index) =>  
        <span
            key={ index }
            className={String(item) === activePage ? 'page current' : 'page'}
            onClick={ changeActive }
        >
            { item }
        </span>
    );

    return( 
      <>
        <h4>Фильтры</h4>
        <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>
      
        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody 
              body={ dataTable } 
              amountRows={ amount } 
              numPage={ activePage } 
            />
        </table>
        
        {setPagination ? <div>{pages}</div> : <></>}
      </>
    )   
};

export default Table;