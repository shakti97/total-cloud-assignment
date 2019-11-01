import React, { Component } from "react";
import { Chart } from "react-google-charts";
class Timeline extends Component {
  //Working on it to extend the timeline for available dates
  nowLine = div => {
    //get the height of the timeline div
    var height;
    var timeLine = document.querySelectorAll("#" + div + " rect");
    // console.log(timeLine);
    timeLine.forEach((t, index) => {
      // console.log(t.attributes.x);
      var x = parseFloat(t.attributes.x.value);
      var y = parseFloat(t.attributes.y.value);

      if (x === 0 && y === 0) {
        height = parseFloat(t.attributes.height);
        // console.log(height);
      }
    });

    var nowWord = document.querySelectorAll("#" + div + " text");
    var selectedTimeLine = [];
    // console.log(nowWord);
    nowWord.forEach(elem => {
      if (elem.textContent === "Avl") {
        selectedTimeLine.push(elem);
      }
    });
    // console.log(selectedTimeLine);

    nowWord.forEach(elem => {
      // elem.attr("height", height + "px")
      elem.attributes.y.height = "700px";
      elem.attributes.y = 0;
    });
    // this.chart.addEventListener(
    //   "onmouseover",
    //   this.nowLine("reactgooglegraph-1")
    // );
    // this.chart.addEventListener(
    //   "onmouseout",
    //   this.nowLine("reactgooglegraph-1")
    // );
  };

  componentDidMount = () => {
    // setTimeout(() => this.nowLine("reactgooglegraph-1"), 5000);
  };

  render() {
    return (
      <>
        <Chart
          width={"1300px"}
          height={"700px"}
          chartType="Timeline"
          loader={<div>Loading Chart</div>}
          data={this.props.employeeData}
          style={{ margin: "0 auto" }}
          options={{
            showRowNumber: true,
          }}
          rootProps={{ "data-testid": "1" }}
          ref={element => (this.chart = element)}
        />
      </>
    );
  }
}

export default Timeline;
