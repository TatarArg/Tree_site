//выводим таблицу на страницу
let createTable = (data, idTable) => {
	// находим таблицу
	let table = document.getElementById(idTable);
	
	// формируем заголовочную строку из ключей нулевого элемента массива
	let tr = document.createElement('tr');

	for(key in data[0]) {
		let th = document.createElement('th');
		th.innerHTML = key;
		tr.append(th);
	}

	table.append(tr);	
	
	// самостоятельно сформировать строки таблицы на основе массива data
	data.forEach((item) => {
           let tr = document.createElement('tr');
           for (let key in item) {
               let td = document.createElement('td');
               td.innerHTML = item[key];
               tr.append(td);
           }
          table.append(tr);
	});	
}

let clearTable = (idTable) => {
    let table = document.getElementById(idTable);
       
    
    // Удаляем все строки таблицы (включая заголовок)
    while (table.rows.length > 0) {
        table.deleteRow(0); 
    }
}