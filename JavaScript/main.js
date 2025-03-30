document.addEventListener("DOMContentLoaded", function() {
    createTable(trees, 'list');
})

document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById('sort');

    setSortSelects(trees[0], form);  
});

document.addEventListener("DOMContentLoaded", function() {
    let fieldsFirstSelect = document.getElementById('fieldsFirst');
    fieldsFirstSelect.addEventListener('change', ClickFirstSelectChange);

    let fieldsSecondSelect = document.getElementById('fieldsSecond');
    fieldsSecondSelect.addEventListener('change', ClickSecondSelectChange);
});

let ClickFirstSelectChange = (event) => {
    let curSelect = event.target;

    changeNextSelect('fieldsSecond', curSelect);

    if (curSelect.value == 0) {
        let fieldsSecondSelect = document.getElementById('fieldsSecond');
        fieldsSecondSelect.value = "0";
        fieldsSecondSelect.disabled = true;  

        let fieldsThirdSelect = document.getElementById('fieldsThird');
        fieldsThirdSelect.value = "0";
        fieldsThirdSelect.disabled = true; 
    } else {
        let fieldsThirdSelect = document.getElementById('fieldsThird');
        fieldsThirdSelect.value = "0";
        fieldsThirdSelect.disabled = true; 
    }
};

let ClickSecondSelectChange = (event) => {
    let curSelect = event.target;
 
    changeNextSelect('fieldsThird', curSelect );
    

    if (curSelect.value == 0) {
        let fieldsThirdSelect = document.getElementById('fieldsThird');
        fieldsThirdSelect.value = "0";
        fieldsThirdSelect.disabled = true; 
    }
}


