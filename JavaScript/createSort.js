let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

let setSortSelect = (arr, sortSelect) => {
    
    sortSelect.append(createOption('Нет', 0));
    
    for (let i in arr) {
        sortSelect.append(createOption(arr[i], Number(i) + 1));
    }
}

let setSortSelects = (data, dataForm) => { 

    let head = Object.keys(data);

    let allSelect = dataForm.getElementsByTagName('select');
    
    for(let j = 0; j < allSelect.length; j++) {
        setSortSelect(head, allSelect[j]);

        if (j !== 0) {
            allSelect[j].disabled = true;
        }
    }
}

let changeNextSelect = (nextSelectId, curSelect) => {
    
    let nextSelect = document.getElementById(nextSelectId);
    
    nextSelect.disabled = false;
    
    nextSelect.innerHTML = curSelect.innerHTML;
    
    if (curSelect.value != 0) {
        deleteByValue(nextSelect, curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
}

let deleteByValue = (selectElement, valueToRemove) => {
    let options = selectElement.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value == valueToRemove) {
            selectElement.remove(i);  
            break;  
        }
    }
};