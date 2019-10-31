import React, { Component } from "react";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import { Api, apidata } from "../../Utils/constant";
import Timeline from "../TImeline/Timeline";
class DataRepresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      submit: "",
    };
  }
  componentDidMount() {
    this.setState({
      submit: false,
    });
    this.fetchData();
  }
  fetchData = async () => {
    try {
      const data = await Axios.get(Api.fetchDataUrl, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        crossdomain: true,
      });
      this.setState(
        {
          data,
          submit: true,
        },
        () => {
          this.convertData(this.state.data);
        }
      );
    } catch (error) {
      console.log("error");
      //   alert("Error is " + error + "So using saved Data ");
      this.setState(
        {
          data: apidata,
          submit: true,
        },
        () => {
          console.log("data ", this.state.data);
          this.convertData(this.state.data);
        }
      );
    }
  };
  convertData = employeeData => {
    var newEmployeeData = [
      [
        { type: "string", id: "employee" },
        { type: "date", id: "start" },
        { type: "date", id: "end" },
      ],
    ];
    employeeData.forEach(data => {
      var startingDate = data.start.split("/");
      var endingDate = data.end.split("/");
      var newData = [
        data.name,
        new Date(`${startingDate[1]}/${startingDate[0]}/${startingDate[2]}`),
        new Date(`${endingDate[1]}/${endingDate[0]}/${endingDate[2]}`),
      ];
      newEmployeeData.push(newData);
    });
    this.setState(
      {
        employeeData: newEmployeeData,
      },
      () => {
        console.log("Employee Data ", this.state.employeeData);
      }
    );
  };
  render() {
    const { data, submit } = this.state;
    return (
      <>
        <LoadingOverlay
          active={!submit}
          spinner={<BounceLoader />}
          styles={{
            overlay: base => ({
              ...base,
              background: "rgba(237, 247, 248, 0.3)",
            }),
          }}
        >
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">S. No.</th>
                <th scope="col">First</th>
                <th scope="col">Start</th>
                <th scope="col">End</th>
              </tr>
            </thead>
            <tbody>
              {submit &&
                data.map((row, index) => (
                  <tr key={row.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.name}</td>
                    <td>{row.start}</td>
                    <td>{row.end}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="chart">
            <Timeline employeeData={this.state.employeeData} />
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

export default DataRepresentation;
