function createArrGraph(data, key) {  
  
    groupObj = d3.group(data, d => d[key]);

    let arrGraph =[];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d['Высота']));
        arrGraph.push({labelX : entry[0], values : minMax});
     }

     return arrGraph;
}

function drawGraph(data, mode, keyX) {
    
    // создаем массив для построения графика
    const arrGraph = createArrGraph(data, keyX);

    // значения по оси ОХ    
    if (keyX  === "Год") {
        arrGraph.sort((a, b) => (a.labelX) - (b.labelX));
    }
        
    let svg = d3.select("svg")  
    svg.selectAll('*').remove();

   // создаем словарь с атрибутами области вывода графика
   attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
   }
       
    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, mode);
    
    // рисуем график
    createChart(svg, arrGraph, scX, scY, attr_area, "red", mode)        
}

function drawHistogram(data, mode, keyX) {
    
    // создаем массив для построения графика
    const arrGraph = createArrGraph(data, keyX);

    // значения по оси ОХ    
    if (keyX  === "Год") {
        arrGraph.sort((a, b) => (a.labelX) - (b.labelX));
    }
        
    let svg = d3.select("svg")  
    svg.selectAll('*').remove();

   // создаем словарь с атрибутами области вывода графика
   attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
   }
       
    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, mode);
    
    // рисуем график
    createHistogram(svg, arrGraph, scX, scY, attr_area, "red", mode)        
}

function createAxis(svg, data, attr_area, mode) {
    let allValues = [];

    if (mode === "min") {
        allValues = data.map(d => d.values[0]); // только минимальные
    } else if (mode === "max") {
        allValues = data.map(d => d.values[1]); // только максимальные
    } else if (mode === "both") {
        allValues = [];
        data.forEach(d => {
            allValues.push(d.values[0]); // минимальная
            allValues.push(d.values[1]); // максимальная
        });
    }

    const [min, max] = d3.extent(allValues);

    // шкала по оси X
    let scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX]);

    // шкала по оси Y
    let scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    // создание осей
    let axisX = d3.axisBottom(scaleX);
    let axisY = d3.axisLeft(scaleY);

    // ось X
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    // ось Y
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, mode = "max") {
    const r = 4; 
    const shift = 1; 

    if (mode === "max" || mode === "both") {
        const maxPoints = data.map(d => ({ x: d.labelX, y: d.values[1] }));

        svg.selectAll(".dot-max")
            .data(maxPoints)
            .enter()
            .append("circle")
            .attr("class", "dot-max")
            .attr("r", r)
            .attr("cx", d => scaleX(d.x) + scaleX.bandwidth() / 2 + (mode === "both" ? shift : 0))
            .attr("cy", d => scaleY(d.y))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "red");
    }

    if (mode === "min" || mode === "both") {
        const minPoints = data.map(d => ({ x: d.labelX, y: d.values[0] }));

        svg.selectAll(".dot-min")
            .data(minPoints)
            .enter()
            .append("circle")
            .attr("class", "dot-min")
            .attr("r", r)
            .attr("cx", d => scaleX(d.x) + scaleX.bandwidth() / 2 - (mode === "both" ? shift : 0))
            .attr("cy", d => scaleY(d.y))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "blue");
    }
}

function createHistogram(svg, data, scaleX, scaleY, attr_area, color, mode = "max") {
    const bandwidth = scaleX.bandwidth();
    const barWidth = (mode === "both") ? (bandwidth * 0.2) : (bandwidth * 0.6);
    const gap = 1; 

    if (mode === "max" || mode === "both") {
        const maxBars = data.map(d => ({ x: d.labelX, y: d.values[1] }));

        svg.selectAll(".bar-max")
            .data(maxBars)
            .enter()
            .append("rect")
            .attr("class", "bar-max")
            .attr("x", d => {
                const center = scaleX(d.x) + bandwidth / 2;
                return (mode === "both")
                    ? center + gap + attr_area.marginX
                    : center - barWidth / 2 + attr_area.marginX;
            })
            .attr("y", d => scaleY(d.y) + attr_area.marginY)
            .attr("width", barWidth)
            .attr("height", d => (attr_area.height - 2 * attr_area.marginY) - scaleY(d.y))
            .style("fill", "red");
    }

    if (mode === "min" || mode === "both") {
        const minBars = data.map(d => ({ x: d.labelX, y: d.values[0] }));

        svg.selectAll(".bar-min")
            .data(minBars)
            .enter()
            .append("rect")
            .attr("class", "bar-min")
            .attr("x", d => {
                const center = scaleX(d.x) + bandwidth / 2;
                return (mode === "both")
                    ? center - barWidth - gap + attr_area.marginX
                    : center - barWidth / 2 + attr_area.marginX;
            })
            .attr("y", d => scaleY(d.y) + attr_area.marginY)
            .attr("width", barWidth)
            .attr("height", d => (attr_area.height - 2 * attr_area.marginY) - scaleY(d.y))
            .style("fill", "blue");
    }
}