const Filter = (props) => {
    const handleReset = () => {
        props.filtering(props.fullData);
        if (props.onReset) {
            props.onReset(); // вызов сброса из Table
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Континент": event.target["continent"].value.toLowerCase(),
            "Высота, м": [
                event.target["heightMin"].value !== ""
                    ? Number(event.target["heightMin"].value)
                    : -Infinity,
                event.target["heightMax"].value !== ""
                    ? Number(event.target["heightMax"].value)
                    : Infinity
            ],
            "Диаметр, м": [
                event.target["diametrMin"].value !== ""
                    ? Number(event.target["diametrMin"].value)
                    : -Infinity,
                event.target["diametrMax"].value !== ""
                    ? Number(event.target["diametrMax"].value)
                    : Infinity
            ],
            "Продолжительность жизни, лет": [
                event.target["yearMin"].value !== ""
                    ? Number(event.target["yearMin"].value)
                    : -Infinity,
                event.target["yearMax"].value !== ""
                    ? Number(event.target["yearMax"].value)
                    : Infinity
            ]
        };

        let arr = props.fullData;

        for (const key in filterField) {
            const val = filterField[key];

            if (Array.isArray(val)) {
                arr = arr.filter(item => {
                    const num = Number(item[key]);
                    return num >= val[0] && num <= val[1];
                });
            } else {
                if (val.trim() !== "") {
                    arr = arr.filter(item =>
                        String(item[key]).toLowerCase().includes(val)
                    );
                }
            }
        }

        props.filtering(arr);
    };

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <p><label>Название:</label><input name="structure" type="text" /></p>
            <p><label>Тип:</label><input name="type" type="text" /></p>
            <p><label>Континент:</label><input name="continent" type="text" /></p>
            <p>
                <label>Высота: от</label>
                <input name="heightMin" type="number" />
                <label>до</label>
                <input name="heightMax" type="number" />
            </p>
            <p>
                <label>Диаметр: от</label>
                <input name="diametrMin" type="number" />
                <label>до</label>
                <input name="diametrMax" type="number" />
            </p>
            <p>
                <label>Продолжительность жизни: от</label>
                <input name="yearMin" type="number" />
                <label>до</label>
                <input name="yearMax" type="number" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтр</button>
            </p>
        </form>
    );
};

export default Filter;
