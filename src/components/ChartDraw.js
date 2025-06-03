import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
  const chartRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    setWidth(parseFloat(svg.style("width")));
    setHeight(parseFloat(svg.style("height")));
  }, []);

  const margin = { top: 10, bottom: 60, left: 40, right: 10 };
  const boundsWidth = width - margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom;

  const allY = props.data.flatMap(d => d.values);
  const [min, max] = d3.extent(allY);

  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(props.data.map(d => d.labelX))
      .range([0, boundsWidth])
      .padding(0.2);
  }, [props.data, boundsWidth]);

  const scaleY = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([min * 0.85, max * 1.1])
      .range([boundsHeight, 0]);
  }, [min, max, boundsHeight]);

  useEffect(() => {
    if (!width || !height) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(d3.axisBottom(scaleX))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-30)");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(scaleY));

    const bounds = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    if (props.chartType === "Точечная диаграмма") {
      if (props.oy[1]) {
        bounds
          .selectAll(".dot-min")
          .data(props.data)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
          .attr("cy", d => scaleY(d.values[0]) + 2) 
          .style("fill", "blue");
      }

      if (props.oy[0]) {
        bounds
          .selectAll(".dot-max")
          .data(props.data)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
          .attr("cy", d => scaleY(d.values[1]))
          .style("fill", "red");
      }
    }

    if (props.chartType === "Гистограмма") {
      const totalBars = props.oy.filter(Boolean).length;
      const barWidth = scaleX.bandwidth() / (totalBars || 1);

      let offset = 0;

      if (props.oy[1]) {
        bounds
          .selectAll(".bar-min")
          .data(props.data)
          .enter()
          .append("rect")
          .attr("x", d => scaleX(d.labelX) + (totalBars === 2 ? 0 : offset))
          .attr("width", barWidth)
          .attr("y", d => scaleY(d.values[0]))
          .attr("height", d => boundsHeight - scaleY(d.values[0]))
          .style("fill", "blue");

        if (totalBars === 2) offset += barWidth;
      }

      if (props.oy[0]) {
        bounds
          .selectAll(".bar-max")
          .data(props.data)
          .enter()
          .append("rect")
          .attr("x", d => scaleX(d.labelX) + (totalBars === 2 ? barWidth : 0))
          .attr("width", barWidth)
          .attr("y", d => scaleY(d.values[1]))
          .attr("height", d => boundsHeight - scaleY(d.values[1]))
          .style("fill", "red");
      }
    }
  }, [width, height, props.data, props.oy, props.chartType, scaleX, scaleY, boundsHeight, margin]);

  return <svg ref={chartRef} width="500" height="400" />;
};

export default ChartDraw;
