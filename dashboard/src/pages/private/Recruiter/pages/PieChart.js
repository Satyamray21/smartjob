import { Box } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    ["Task", "Hours per Day"],
    ["Application answered", 90],
    ["Interviewed", 60],
    ["Hired", 40],

];

export const options = {
    title: "Profile Strenght",
    colors: ['teal', 'grey', 'brown'],
};

export function PieChart() {
    return (
        <Box sx={{ height: '225px', }}>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"290px"}
            />
        </Box>
    );
}