import React, { Component } from "react";
import { Chart } from "react-google-charts";
class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Chart
          width={"1100px"}
          height={"700px"}
          chartType="Timeline"
          loader={<div>Loading Chart</div>}
          data={this.props.employeeData}
          options={{
            showRowNumber: true,
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </>
    );
  }
}

export default Timeline;
