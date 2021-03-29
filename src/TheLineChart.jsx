import * as d3 from 'd3'
class TheLine {
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
        d3.scaleLinear()
          .domain(d3.extent(this.data,(d)=>{
              return d.year
          }))
          .range([0 ,this.innerWidth])
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
        this.data= data
        this.line = d3.line().x((d)=>{
            return this.xScale(d.year)
        }).y((d) =>{
            return  this.yScale(d.value)
        })

       this.result= this.chart.append('path')
        .attr('d' ,this.line(this.data))
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 3.5)
        .attr('fill', 'none')

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
      this.line = d3.line().x((d)=>{
        return this.xScale(d.year)
    }).y((d) =>{
        return  this.yScale(d.value)
    })
    this.result
    .attr('d',this.line(this.data))

    };
    
  };
  export default TheLine;
  