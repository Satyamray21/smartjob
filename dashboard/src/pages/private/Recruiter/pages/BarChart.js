import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    ["Year", "37 Rejected", " 45 Application sent", "68 Viewed"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];

export const options = {
    chart: {
        title: "Job Details",
        subtitle: " Rejected, Application sent,  Viewed",
    },
    colors: ['teal', 'grey', 'brown'],
};

export function BarChart() {
    return (
        <Chart
            chartType="Bar"
            width="100%"
            height="290px"
            data={data}
            options={options}
        />
    );
}