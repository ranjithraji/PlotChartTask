import React from "react";
import ScatterChart from "../../component/ScatterChart";
import { FETCH } from "../../service/utils/Fetch";
import { LineChart } from "../../component/LineChart";
import { GroundedChar } from "../../component/GroundedChart";
import faker from "faker";

const Chart = () => {
  const [arrayX, setArrayX] = React.useState();
  const [arrayY, setArrayY] = React.useState();
  const [data, setData] = React.useState({
    scatter: "",
    line: "",
    ground: ""
  });

  const fetchXdata = async () => {
    try {
      let response = await FETCH({
        url: "https://retoolapi.dev/gDa8uC/data",
        method: "GET",
        authenticate: false,
      });

      if (response) {
        setArrayX(
          response.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
        );
        fetchYdata();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYdata = async () => {
    try {
      let response = await FETCH({
        url: "https://retoolapi.dev/o5zMs5/data",
        method: "GET",
        authenticate: false,
      });

      if (response) {
        await setArrayY(
          response.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
        );

      }
    } catch (error) {
      console.log(error);
    }
  };

  const DataFuc = () => {
    console.log(Array.isArray(arrayX), Array.isArray(arrayY));
    if (Array.isArray(arrayX) && Array.isArray(arrayY)) {

      let datasets = {
        datasets: [{
          label: "Scatter Plot (X,Y) Chart",
          data: Array.from({ length: 50 }, (data, index) => ({
            x: arrayX[index].RandomNumber,
            y: arrayY[index].RandomNumber,
          })),
          backgroundColor: "rgba(255, 99, 132, 1)",
        }]
      };


      let labels = Array.from({ length: 50 }, (data, index) => arrayX[index].id);

      let linedata = {
        labels,
        datasets: [
          {
            label: 'X axis',
            data: labels.map((i, index) => arrayX[index].RandomNumber),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Y axis',
            data: labels.map((i, index) => arrayY[index].RandomNumber),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };


      let goundeddata = {
        labels,
        datasets: [
          {
            label: 'X axis',
            data: labels.map((i, index) => arrayX[index].RandomNumber),
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0',
          },
          {
            label: 'Y axis',
            data: labels.map((i, index) => arrayY[index].RandomNumber),
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Stack 0',
          },
        ],
      };
      setData({ ...data, ["scatter"]: datasets, ['line']: linedata, ['ground']: goundeddata });
    }

  }


  React.useEffect(() => {
    return () => fetchXdata();
  }, []);

  React.useEffect(() => {
    DataFuc();
  }, [arrayY])

  return <div style={{ padding: "2%" }}>

    <h1>Line Chart</h1>
    <br />
    {data.line && <LineChart data={data.line} />}
    <br />

    <br />
    <hr style={{ width: '90%' }} />
    <br />


    <h1> Grouped Bar Chart</h1>
    <br />
    {data.ground && <GroundedChar data={data.line} />}
    <br />

    <br />
    <hr style={{ width: '90%' }} />
    <br />

    <h1>Scatter Chart</h1>
    <br />
    {data.scatter && <ScatterChart data={data.scatter} />}

  </div>
};

export default Chart;
