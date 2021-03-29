import * as d3 from 'd3'
class TheBarChart {
    constructor(domNodeCurrent){
      this.svg = d3.select(domNodeCurrent).append('svg');
      this.svg
      .attr('width', '100%')
      .attr('height', '100%')
      .style('background-color', 'lightgrey')
      .style('padding','1rem')
      this.margin = { top: 20, left: 20, bottom: 20, right: 20 };
    };

    init =( data,dimensions) =>{
      this.data=data
      this.setDimension(dimensions)
      this.setScales(data)
      this.chart= this.svg.append('g')
      this.chart
      .attr('transform', `translate(${this.margin.left},   ${this.margin.top})`);
      this.createAxes()
      this.updateData(data)

    }
    setDimension =(dimensions) =>{
      this.dimensions =dimensions
      this.innerWidth = this.dimensions.width - (this.margin.left+ this.margin.right)
      this.innerHeight = this.dimensions.height - (this.margin.top + this.margin.bottom)
    }
    setScales=(data,dimensions)=>{
      this.xScale =
        d3.scaleBand()
          .domain(data.map(function(d) { return d.year; }))
          .range([0, this.innerWidth]).padding(.5)
      this.yScale =
        d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return d.value; })])
          .range([this.innerHeight, 0])
    };
    
    createAxes =() =>{
       this.xAxis=this.chart.append('g')
      .attr('transform', `translate(0, ${this.innerHeight})`)
      .call(d3.axisBottom(this.xScale))

      this.yAxis=this.chart.append('g')
      .call(d3.axisLeft(this.yScale).tickFormat((d)=>{
            return d;
      }).ticks(this.data.length))
    }
    updateData=(data)=>{
      this.data = data
      this.bar = this.chart.selectAll('.bar').data(this.data)

      this.bar
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d)=>this.xScale(d.year))
        .attr('y', (d)=>this.yScale(d.value))
        .attr('fill', 'steelblue')
        .attr("width" ,this.xScale.bandwidth())
        .attr('height' ,(d) =>{
          return this.innerHeight - this.yScale(d.value)
        })

    };
    updateAxes=()=>{
      this.xAxis
        .attr('transform', `translate(0, ${this.innerHeight})`)
        .call(d3.axisBottom(this.xScale))
      this.yAxis
      .call(d3.axisLeft(this.yScale).tickFormat((d)=>{
        return d;
  }).ticks(7))
    };
  
    updateDimensions=(dimensions)=>{
      this.setDimension(dimensions)
      this.setScales(this.data,this.dimensions)
      this.updateAxes()
      this.bar = 
      this.chart.selectAll('.bar')
          .attr('x', (d)=>this.xScale(d.year))
          .attr('y', (d)=>this.yScale(d.value))
          .attr("width" ,this.xScale.bandwidth())
          .attr('height' ,(d) =>{
          return this.innerHeight - this.yScale(d.value)
        })

    };
    
  };
  export default TheBarChart;
  