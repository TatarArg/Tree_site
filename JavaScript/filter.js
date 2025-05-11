let correspond = {
    "Название": "treeName",
    "Тип": "type",
    "Континент": "continent",
    "Высота, м": ["heightFrom", "heightTo"],
    "Диаметр, м": ["diametrFrom", "diametrTo"],
    "Продолжительность жизни, лет": ["lifespanFrom", "lifespanTo"]
};

let dataFilter = (dataForm) => {
    let dictFilter = {};
    

    for (let j = 0; j < dataForm.elements.length; j++) {

        let item = dataForm.elements[j];
        
        let valInput = item.value;

        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        } 
        
        if (item.type === "number") {
            if (valInput !== "") {
                valInput = Number(valInput);
            } 

            else if (item.id.includes("From")) {
                valInput = -Infinity;  
            } 

            else if (item.id.includes("To")) {
                valInput = Infinity;  
            }
        }
        

        dictFilter[item.id] = valInput;
    }
    
    return dictFilter;
}

let filterTable = (data, idTable, dataForm) => {
    
    let datafilter = dataFilter(dataForm);
    
    let tableFilter = data.filter(item => {


        let result = true;
        
        for (let key in item) {
            
            let val = item[key];
            
            if (typeof val == 'string') {
                val = item[key].toLowerCase() 
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1 
            }

            if (typeof val == 'number') {
                let fromKey = correspond[key][0]; 
                let toKey = correspond[key][1];   

                let minValue = datafilter[fromKey];
                let maxValue = datafilter[toKey];

                if (minValue !== undefined && minValue !== -Infinity && val < minValue) {
                    result = false; 
                }

                if (maxValue !== undefined && maxValue !== Infinity && val > maxValue) {
                    result = false;  
                }
            }
        }
        return result;
    });     

    clearTable(idTable);

    createTable(tableFilter, idTable);  
}

let clearFilter = (data, idTable, dataForm) => {
    let formElements = dataForm.elements;
    for (let i = 0; i < formElements.length; i++) {
        let field = formElements[i];

        if (field.type !== "button") {
            field.value = ''; 
        }
    }

    clearTable(idTable);

    createTable(data, idTable);
}
