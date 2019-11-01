import React, { Component } from "react";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import { Api, apidata } from "../../Utils/constant";
import Timeline from "../Timeline/Timeline";
class DataRepresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      submit: false,
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
          data: data.data,
          submit: true,
        },
        () => {
          this.convertData(this.state.data);
        }
      );
    } catch (error) {
      // console.log("error");
      //   alert("Error is " + error + "So using saved Data ");
      this.setState(
        {
          data: apidata,
          submit: true,
        },
        () => {
          // console.log("data ", this.state.data);
          this.convertData(this.state.data);
        }
      );
    }
  };

  //Convert data into suitable format
  convertData = employeeData => {
    var newEmployeeData = [
      [
        { type: "string", id: "employee" },
        { type: "string", id: "category" },
        { type: "date", id: "start" },
        { type: "date", id: "end" },
      ],
    ];
    employeeData.forEach(data => {
      var startingDate = data.start.split("/");
      var endingDate = data.end.split("/");
      var newData = [
        data.name,
        "Busy",
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
        // console.log("Employee Data ", this.state.employeeData);
      }
    );
  };

  //function to get days in a month
  getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  //function to check for available days
  checkAvailability = () => {
    //building this for only current month otherwise i'm thinking for traversing and getting the list of month its including first then traverse and remove the date from the available month list dates and the date which are left will show them on chart as available date
    const availableMonth = [9]; // 9 for September
    const availableYear = [2019];
    const datesArray = [];
    let noOfDays = this.getDaysInMonth(availableMonth, availableYear);
    for (let i = 1; i <= noOfDays; i++) {
      datesArray.push(i);
    }
    this.state.employeeData.forEach(data => {
      var startingDate = new Date(data[2]).getDate();
      var endingDate = new Date(data[3]).getDate();
      // console.log("before removing", datesArray);
      for (let j = startingDate; j <= endingDate; j++) {
        delete datesArray[datesArray.indexOf(j)];
      }
    });
    // console.log("after removing ", datesArray);
    datesArray.forEach(date => {
      if (date) {
        // console.log(date);
        let empData = [
          this.state.employeeData[1][0],
          "Avl",
          new Date(`${availableMonth[0]}/${date - 1}/${availableYear[0]}`),
          new Date(`${availableMonth[0]}/${date}/${availableYear[0]}`),
        ];
        const { employeeData } = this.state;
        employeeData.push(empData);
        this.setState({
          employeeData: employeeData,
        });
      }
    });
    // console.log("employeeData ", this.state.employeeData);
  };
  render() {
    const { data, submit } = this.state;
    // console.log("data ", data, "submit ", submit);
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
          {submit && (
            <div>
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
                  {data.map((row, index) => (
                    <tr key={row.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{row.name}</td>
                      <td>{row.start}</td>
                      <td>{row.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={this.checkAvailability}
                  >
                    Show Availability
                  </button>
                </div>
                <Timeline employeeData={this.state.employeeData} />
              </div>
            </div>
          )}
        </LoadingOverlay>
      </>
    );
  }
}

export default DataRepresentation;
