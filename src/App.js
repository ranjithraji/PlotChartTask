import Chart from "./page/Chart";
import React from "react";
import "./styles.css";
import { FETCH } from "./service/utils/Fetch";

export default function App() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [arrayX, setArrayX] = React.useState();
  const [arrayY, setArrayY] = React.useState();
  const [data, setData] = React.useState({
    scatter: "",
    line: "",
    ground: ""
  });


  React.useEffect(() => {
    fetchXdata()
  }, []);

  const fetchXdata = async () => {
    setIsLoading(true);
    try {
      let response = await FETCH({
        url: `gDa8uC/data`,
        method: "GET",
        authenticate: false,
      });

      if (response) {
        setArrayX(
          response.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
        );
        fetchYdata();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setIsLoading(false)
    }
  };

  const fetchYdata = async () => {
    try {
      let response = await FETCH({
        url: "o5zMs5/data",
        method: "GET",
        authenticate: false,
      });

      if (response) {
        await setArrayY(
          response.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
        );

      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
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
      setIsLoading(false);
    }

  }

  React.useEffect(() => {
    DataFuc();
  }, [arrayY]);

  return (
    <div className="App">
      {isLoading ? <h1>Loading!....</h1> : <Chart data={data} />}
    </div>
  );
}
