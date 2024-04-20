import React from "react";
import ScatterChart from "../../component/ScatterChart";
import { LineChart } from "../../component/LineChart";
import { GroundedChar } from "../../component/GroundedChart";
import faker from "faker";

const Chart = (props) => {

  const { data } = props;

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
