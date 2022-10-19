// var svg = d3.select("#barchart")
            // margin = 200,
            // width = svg.attr("width") - margin,
            // height = svg.attr("height") - margin
            var dd = {
                width: 1500,
                height: 800,
                margin:{
                    top: 20,
                    bottom: 50,
                    right: 10,
                    left: 40
                }
            }
    
            var svg = d3.select("#barchart")
            .style("width", dd.width)
            .style("height", dd.height)
            .append("g")
            .attr("transform", "translate(" + dd.margin.left + "," + dd.margin.top + ")")
                        
    
                
                
    var xScale = d3.scaleBand().range([dd.margin.left, dd.width- dd.margin.right]).padding(0.2),
                yScale = d3.scaleLinear().range([dd.height-dd.margin.bottom, dd.margin.top]);
    
                
             
    
        d3.csv("name-data.csv", function( data) {
            
            console.log(d3.max(data, function(d) { return +d.Betty; }))
            xScale.domain(data.map(function(d) { return d.year; }));
            yScale.domain([0, d3.max(data, function(d) { return +d.Betty; })]);

            var keys = data.columns.slice(1)
                console.log(keys)
    
           
           
    
    
            svg.selectAll(".g")
             .data(data)
             .enter().append("rect")
             .attr("class", "g").style("fill", "#fdcdac")
             .attr("x", function(d) { return xScale(d.year); })
             .attr("y", function(d) { return yScale(+d.Betty); })
             .attr("width", xScale.bandwidth())
             .attr("height", function(d) { return dd.height-dd.margin.bottom - yScale(+d.Betty); });

             var xAxisGen = d3.axisBottom().scale(xScale)
             var xAxis = svg.append("g")
                            .call(xAxisGen)
                            .style("transform", `translateY(${dd.height-dd.margin.bottom}px)`)
                            .selectAll("text")  
                             .style("text-anchor", "end")
                             .attr("dx", "-.8em")
                             .attr("dy", ".15em")
                             .attr("transform", "rotate(-65)" )
                             
     
             var yAxisGen = d3.axisLeft().scale(yScale)
             var yAxis = svg.append("g")
                             .call(yAxisGen)
                             .style("transform", `translateX(${dd.margin.left}px)`)
                             


                             var tooltip = d3.select("#barchart")
                             .append("div")
                             .style("opacity", 0)
                             .attr("class", "tooltip")
                             .style("background-color", "white")
                             .style("border", "solid")
                             .style("border-width", "1px")
                             .style("border-radius", "5px")
                             .style("padding", "10px")
                         
                             var div = d3.select("#barchart").append("div")
                             .attr("class", "tooltip-donut")
                             .style("opacity", 0);
                             console.log(div)

                             var legend = svg.append("g")
                             .attr("font-family", "sans-serif")
                             .attr("font-size", 10)
                             .attr("text-anchor", "end")
                             .selectAll("g")
                             .data(keys[2])
                             .enter().append("g")
                             .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

                             legend.append("rect")
                             .attr("xScale", dd.width - 19)
                             .style("transform", `translateX(${dd.width-dd.margin.right-140}px)`)
                             .attr("width", 19)
                             .attr("height", 19)
                             .attr("fill", "#fdcdac");
                         
                             legend.append("text")
                                 .attr("xScale", dd.width - 30)
                                 .style("transform", `translateX(${dd.width-dd.margin.right-150}px)`)
                                 
                                 .attr("yScale", 9.5)
                                 .attr("dy", "1em")
                                 .text(function(d) { return d; });
                             
                             
                             // Prep the tooltip bits, initial display is hidden
                             var tooltip = svg.append("g")
                                 .attr("class", "tooltip")
                                 .style("display", "none");
                                 
                             tooltip.append("rect")
                                 .attr("width", 60)
                                 .attr("height", 20)
                                 .attr("fill", "white")
                                 .style("opacity", 0.5);
                             
                             tooltip.append("text")
                                 .attr("xScale", 30)
                                 .attr("dy", "1.2em")
                                 .style("text-anchor", "middle")
                                 .attr("font-size", "12px")
                                 .attr("font-weight", "bold");
                 
        });