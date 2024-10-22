import React, { useEffect } from 'react';
import * as d3 from 'd3';

const data = [
  { date: "2024-11-08", title: "Blog Post 1", slug: "/blog-post-1" },
  { date: "2024-11-08", title: "Blog Post 2", slug: "/blog-post-2" },
  { date: "2024-11-07", title: "Blog Post 3", slug: "/blog-post-3" },
  { date: "2024-11-06", title: "Blog Post 4", slug: "/blog-post-4" },
  { date: "2024-11-05", title: "Blog Post 5", slug: "/blog-post-5" }
];

const Calendar = () => {
  useEffect(() => {
    const width = 800;
    const height = 200;
    const cellSize = 40;

    const svg = d3.select("#calendar")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(20, 20)");

    const parseDate = d3.timeParse("%Y-%m-%d");

    const processedData = data.map(d => ({
      ...d,
      date: parseDate(d.date)
    }));

    svg.selectAll(".day")
      .data(processedData)
      .enter().append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", (d, i) => (i % 7) * cellSize)
      .attr("y", (d, i) => Math.floor(i / 7) * cellSize)
      .attr("fill", "lightblue")
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    svg.selectAll(".text")
      .data(processedData)
      .enter().append("text")
      .attr("x", (d, i) => (i % 7) * cellSize + 10)
      .attr("y", (d, i) => Math.floor(i / 7) * cellSize + 25)
      .text(d => d.title)
      .attr("font-size", "12px")
      .attr("fill", "black");

  }, []);

  return (
    <div>
      <h1>My Calendar</h1>
      <div id="calendar"></div> 
    </div>
  );
};

export default Calendar;
