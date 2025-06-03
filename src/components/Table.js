import { useState, useEffect } from "react";
import TableHead from './TableHead';
import TableBody from './TableBody';
import Filter from './Filter';
import Sort from './Sort';

const Table = (props) => {
  const [filteredData, setFilteredData] = useState(props.data);
  const [dataTable, setDataTable] = useState(props.data);
  const [activePage, setActivePage] = useState("1");
  const [sortFn, setSortFn] = useState(null);
  const [resetSortTrigger, setResetSortTrigger] = useState(false);

  const updateFilteredData = (filtered) => {
    setFilteredData(filtered);
    if (sortFn) {
      const sorted = [...filtered].sort(sortFn);
      setDataTable(sorted);
      if (props.filtering) props.filtering(sorted);
    } else {
      setDataTable(filtered);
      if (props.filtering) props.filtering(filtered);
    }
    setActivePage("1");
  };

  const applySort = (func) => {
    setSortFn(func);
    let updated;
    if (func) {
      updated = [...filteredData].sort(func);
      setDataTable(updated);
    } else {
      updated = filteredData;
      setDataTable(filteredData);
    }

    if (props.filtering) props.filtering(updated);
    setActivePage("1");
  };

  const handleFilterReset = () => {
    setFilteredData(props.data);
    setDataTable(props.data);
    setActivePage("1");
    setSortFn(null);
    setResetSortTrigger(true);
    if (props.filtering) props.filtering(props.data);
  };

  useEffect(() => {
    if (resetSortTrigger) {
      setResetSortTrigger(false);
    }
  }, [resetSortTrigger]);

  const showPagination =
    props.pagination !== false && dataTable.length > props.amountRows;

  const amount = showPagination ? props.amountRows : dataTable.length;
  const currentPage = showPagination ? activePage : "1";

  const n = Math.ceil(dataTable.length / amount);
  const arr = Array.from({ length: n }, (_, i) => i + 1);

  const changeActive = (e) => setActivePage(e.target.innerHTML);

  const pages = arr.map((item, index) => (
    <span
      key={index}
      className={String(item) === currentPage ? 'page current' : 'page'}
      onClick={changeActive}
    >
      {item}
    </span>
  ));

  return (
    <>
      <h4>Фильтрация</h4>
      <Filter
        filtering={updateFilteredData}
        fullData={props.data}
        onReset={handleFilterReset}
      />

      <h4>Сортировка</h4>
      <Sort
        columns={Object.keys(props.data[0])}
        sorting={applySort}
        resetTrigger={resetSortTrigger}
      />

      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody
          body={dataTable}
          amountRows={amount}
          numPage={currentPage}
        />
      </table>

      {showPagination
        ? <div className="pagination">{pages}</div>
        : <div className="pagination-info"></div>
      }
    </>
  );
};

export default Table;
