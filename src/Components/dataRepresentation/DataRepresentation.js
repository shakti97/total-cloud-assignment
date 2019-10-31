import React, { Component } from "react";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import { Api, apidata } from "../../Utils/constant";

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
      this.setState({
        data,
        submit: true,
      });
    } catch (error) {
      console.log("error");
      //   alert("Error is " + error + "So using saved Data ");
      this.setState({
        data: apidata,
        submit: true,
      });
    }
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
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">S. No.</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
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
        </LoadingOverlay>
      </>
    );
  }
}

export default DataRepresentation;
