
document.addEventListener("DOMContentLoaded", () => {
    drawGraph(trees, "max", "Тип");
  
    document.getElementById("buildGraphButton").addEventListener("click", () => {
      buildGraph();
    });
});
  
function buildGraph() {
    const currentData = getTableData();
    const groupOX = document.querySelector('input[name="groupOX"]:checked').value;
    const maxSel = document.getElementById("maxHeight").checked;
    const minSel = document.getElementById("minHeight").checked;
  
    if (!maxSel && !minSel) {
      document.getElementById("oY").classList.add("errorText");
      return;
    }
    document.getElementById("oY").classList.remove("errorText");
  
    const chartType = document.getElementById("chartType").value;
    let mode = maxSel && minSel ? "both" : (maxSel ? "max" : "min");
  
    if (chartType === "scatter") {
      drawGraph(currentData, mode, groupOX);
    } else if (chartType === "histogram") {
      drawHistogram(currentData, mode, groupOX);
    } else {
      drawGraphFunc(currentData, mode, groupOX)
    }
}

function getTableData() {
    const table = document.getElementById('list');
    if (!table || table.rows.length < 2) return [];
  
    const headers = Array.from(table.rows[0].cells).map(th => th.textContent);
  
    const data = [];
    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
      const obj = {};
      headers.forEach((key, j) => {
        let val = row.cells[j].textContent;
        const num = parseFloat(val);
        obj[key] = isNaN(num) ? val : num;
      });
      data.push(obj);
    }
    return data;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('focus', function() {
            document.getElementById('oY').classList.remove('errorText');
        });
    });
});

