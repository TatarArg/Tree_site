let createSortArr = (data) => {
    let sortArr = [];
    
    let sortSelects = data.getElementsByTagName('select');
    
    for (let i = 0; i < sortSelects.length; i++) {   
        let keySort = sortSelects[i].value;

        if (keySort == 0) {
            break;
        }

        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push(
          {column: keySort - 1, 
           order: desc}
        ); 
    }
    return sortArr; 
};

let sortTable = (idTable, data) => {
    
    let sortArr = createSortArr(data);
    
    if (sortArr.length === 0) {
        return false;
    }
    let table = document.getElementById(idTable);

    let rowData = Array.from(table.rows);
    
    rowData.shift();
    
    rowData.sort((first, second) => {
        for(let i in sortArr) {
            let key = sortArr[i].column;
            let theNewOrder = sortArr[i].order ? -1 : 1;

            let firstVal = first.cells[key].innerHTML;
            let secondVal = second.cells[key].innerHTML;
            
            if (key == first.cells.length - 2 || key == first.cells.length - 1 || key == first.cells.length - 4){
                firstVal = parseFloat(firstVal);
                secondVal = parseFloat(secondVal);
            }

            if (firstVal > secondVal) {
                return theNewOrder;
            } else if (firstVal < secondVal){
                return -theNewOrder;
            }
        }
        return 0;
    });
    

    rowData.forEach(row => table.appendChild(row));
}

function clearSort(data, idTable) {
    let sortForm = document.getElementById('sort');
    let allSelects = sortForm.getElementsByTagName('select');
    
    for (let i = 0; i < allSelects.length; i++) {
        allSelects[i].value = 0; 
        if (i !== 0) {
            allSelects[i].disabled = true;
        }
    }
    
    let allCheckboxes = sortForm.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => checkbox.checked = false); 

    clearTable(idTable);
    createTable(data, idTable);

 
}