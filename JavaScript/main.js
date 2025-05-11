document.addEventListener("DOMContentLoaded", function () {
    showTable("build", buildings);
    drawGraph(buildings, "max", "Страна");
  
    const button = document.getElementById("RemoveButton");
    const table = d3.select("#build");
    button.addEventListener("click", function () {
      toggleTable(button, table);
    });
  
    document.getElementById("buildGraphButton").addEventListener("click", function() {
      buildGraph();
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('focus', function() {
            document.getElementById('oY').classList.remove('errorText');
        });
    });
});

