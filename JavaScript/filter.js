// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}

let dataFilter = (dataForm) => {
    let dictFilter = {};
    
    // перебираем все элементы формы с фильтрами
    for (let j = 0; j < dataForm.elements.length; j++) {
        // выделяем очередной элемент формы
        let item = dataForm.elements[j];
        
        // получаем значение элемента
        let valInput = item.value;

        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        } 
        
        // обрабатываем значения числовых полей
        if (item.type === "number") {
            // если поле заполнено, преобразуем значение в число
            if (valInput !== "") {
                valInput = Number(valInput);
            } 
            // если поле пусто и id включает "From", ставим значение +бесконечность
            else if (item.id.includes("From")) {
                valInput = -Infinity;  
            } 
            // если поле пусто и id включает "To", ставим значение +бесконечность
            else if (item.id.includes("To")) {
                valInput = Infinity;  
            }
        }
        
        // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }
    
    return dictFilter;
}

// фильтрация таблицы
let filterTable = (data, idTable, dataForm) => {
    
    // получаем данные из полей формы
    let datafilter = dataFilter(dataForm);
    
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
        let result = true;
        
        // строка соответствует фильтру, если сравнение всех значений из input 
        // со значением ячейки очередной строки - истина
        for (let key in item) {
            
            let val = item[key];
            
            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                val = item[key].toLowerCase() 
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1 
            }

            // проверка числовых полей на принадлежность интервалу
            if (typeof val == 'number') {
                // проверяем, если поле для "от"
                let fromKey = correspond[key][0]; // "yearFrom" или "heightFrom"
                let toKey = correspond[key][1];   // "yearTo" или "heightTo"

                // Получаем минимальное и максимальное значение из фильтра
                let minValue = datafilter[fromKey];
                let maxValue = datafilter[toKey];

                // Если задано значение "от", проверяем, что оно не меньше значения поля
                if (minValue !== undefined && minValue !== -Infinity && val < minValue) {
                    result = false;  // Значение меньше минимального
                }

                // Если задано значение "до", проверяем, что оно не больше значения поля
                if (maxValue !== undefined && maxValue !== Infinity && val > maxValue) {
                    result = false;  // Значение больше максимального
                }
            }
        }
        return result;
    });     

    // удаляем все строки таблицы с id=idTable
    clearTable(idTable);

    // показываем на странице таблицу с отфильтрованными строками
    createTable(tableFilter, idTable);  
}

let clearFilter = (data, idTable, dataForm) => {
    // Проходим по всем полям формы
    let formElements = dataForm.elements;
    for (let i = 0; i < formElements.length; i++) {
        let field = formElements[i];

        // Очищаем только элементы, которые не являются кнопками
        if (field.type !== "button") {
            field.value = ''; // Очищаем значение каждого поля
        }
    }

    // Очищаем таблицу (удаляем все строки, включая заголовок)я
    clearTable(idTable);

    // Показываем все данные без фильтрации (исходные данные)
    createTable(data, idTable);
}
