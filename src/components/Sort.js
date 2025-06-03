import { useState, useEffect } from "react";

const Sort = (props) => {
  const [field1, setField1] = useState("0");
  const [desc1, setDesc1] = useState(false);
  const [field2, setField2] = useState("0");
  const [desc2, setDesc2] = useState(false);
  const [field3, setField3] = useState("0");
  const [desc3, setDesc3] = useState(false);

  useEffect(() => {
    setField1("0");
    setDesc1(false);
    setField2("0");
    setDesc2(false);
    setField3("0");
    setDesc3(false);
  }, [props.resetTrigger]);

  const resetSortForm = () => {
    setField1("0");
    setDesc1(false);
    setField2("0");
    setDesc2(false);
    setField3("0");
    setDesc3(false);
    props.sorting(null);
  };

  useEffect(() => {
    if (field1 === "0") {
      setField2("0");
      setDesc2(false);
      setField3("0");
      setDesc3(false);
    }
  }, [field1]);

  useEffect(() => {
    if (field2 === "0") {
      setField3("0");
      setDesc3(false);
    }
  }, [field2]);

  const getOptions = (excludedIndexes) => {
    return props.columns
      .map((col, index) => ({ col, index }))
      .filter(({ index }) => !excludedIndexes.includes(index))
      .map(({ col, index }) => (
        <option key={index + 1} value={index + 1}>{col}</option>
      ));
  };

  const applySorting = () => {
    const sortArr = [];

    if (field1 !== "0") sortArr.push({ column: parseInt(field1) - 1, order: desc1 });
    if (field2 !== "0") sortArr.push({ column: parseInt(field2) - 1, order: desc2 });
    if (field3 !== "0") sortArr.push({ column: parseInt(field3) - 1, order: desc3 });

    if (sortArr.length === 0) {
      props.sorting(null);
      return;
    }

    const compare = (a, b) => {
      if (!a || !b) return 0;

      const keys = Object.keys(a);

      for (let i = 0; i < sortArr.length; i++) {
        const { column, order } = sortArr[i];
        const field = keys[column];
        if (!field) continue;

        let valA = a[field];
        let valB = b[field];

        const numeric = [keys.length - 1, keys.length - 2, keys.length - 4].includes(column);
        if (numeric) {
          valA = parseFloat(valA);
          valB = parseFloat(valB);
        } else {
          valA = String(valA).toLowerCase();
          valB = String(valB).toLowerCase();
        }

        if (valA > valB) return order ? -1 : 1;
        if (valA < valB) return order ? 1 : -1;
      }

      return 0;
    };

    props.sorting(compare);
  };

  return (
    <form id="sort" onSubmit={(e) => e.preventDefault()}>
      <p>
        <label>Первый уровень:</label>
        <select value={field1} onChange={(e) => setField1(e.target.value)}>
          <option value="0">Нет</option>
          {getOptions([])}
        </select>
        <label>
          <input
            type="checkbox"
            checked={desc1}
            onChange={(e) => setDesc1(e.target.checked)}
            disabled={field1 === "0"}
          />
          По убыванию?
        </label>
      </p>

      <p>
        <label>Второй уровень:</label>
        <select
          value={field2}
          onChange={(e) => setField2(e.target.value)}
          disabled={field1 === "0"}
        >
          <option value="0">Нет</option>
          {getOptions([parseInt(field1) - 1])}
        </select>
        <label>
          <input
            type="checkbox"
            checked={desc2}
            onChange={(e) => setDesc2(e.target.checked)}
            disabled={field2 === "0"}
          />
          По убыванию?
        </label>
      </p>

      <p>
        <label>Третий уровень:</label>
        <select
          value={field3}
          onChange={(e) => setField3(e.target.value)}
          disabled={field2 === "0"}
        >
          <option value="0">Нет</option>
          {getOptions([
            parseInt(field1) - 1,
            parseInt(field2) - 1
          ])}
        </select>
        <label>
          <input
            type="checkbox"
            checked={desc3}
            onChange={(e) => setDesc3(e.target.checked)}
            disabled={field3 === "0"}
          />
          По убыванию?
        </label>
      </p>

      <p>
        <button type="button" onClick={applySorting}>Сортировать</button>
        <button type="button" onClick={resetSortForm}>Сбросить сортировку</button>
      </p>
    </form>
  );
};

export default Sort;
