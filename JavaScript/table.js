// создание таблицы 
let showTable = (idTable, data) => {
    let table = d3.select("#" + idTable);
		
    // создание строк таблицы (столько, сколько элементов в массиве)
	let rows = table
        .selectAll("tr")
		.data(data)
		.enter()
		.append('tr')	
		.style("display", "");

	// создание ячеек каждой строки на основе каждого элемента массива 
	let cells = rows
        .selectAll("td")
	    .data(d => Object.values(d))
		.enter()
		.append("td")
		.text(d => d);

	// создание шапки таблицы 	  
	let head = table
        .insert("tr", "tr")
		.selectAll("th")
		.data(d => Object.keys(data[0]))
		.enter()
		.append("th")
		.text(d => d);
}

function toggleTable(button, table) {
	if (button.innerText == "Скрыть таблицу") {
	  table.selectAll("tr").remove();
	  button.innerText = "Показать таблицу";
	} else {
	  showTable("build", buildings);
	  button.innerText = "Скрыть таблицу";
	}
  }


function buildGraph() {
	const groupOX = document.querySelector('input[name="groupOX"]:checked').value;
    const maxSelected = document.getElementById("maxHeight").checked;
    const minSelected = document.getElementById("minHeight").checked;
    const chartType = document.getElementById("chartType").value;

    let mode = "";
    if (maxSelected && minSelected) {
        mode = "both";
    } else if (maxSelected) {
        mode = "max";
    } else if (minSelected) {
        mode = "min";
    } else {
        document.getElementById("oY").classList.add("errorText");
        return;
    }

    document.getElementById('oY').classList.remove("errorText");

    if (chartType === "scatter") {
        drawGraph(buildings, mode, groupOX);
    } else if (chartType === "histogram") {
        drawHistogram(buildings, mode, groupOX);
    }
  }