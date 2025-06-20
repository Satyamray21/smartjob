import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: 'Sunday A', TotalApplications: 400, AcceptedApplications: 240, RejectedApplications: 120 },
    { name: 'Monday B', TotalApplications: 320, AcceptedApplications: 210, RejectedApplications: 110 },
    { name: 'Tuesday C', TotalApplications: 410, AcceptedApplications: 310, RejectedApplications: 100 },
    { name: 'Wednesday D', TotalApplications: 430, AcceptedApplications: 240, RejectedApplications: 190 },
    { name: 'Thursday E', TotalApplications: 330, AcceptedApplications: 200, RejectedApplications: 130 },
    { name: 'Friday F', TotalApplications: 340, AcceptedApplications: 150, RejectedApplications: 190 },
    { name: 'Saturday G', TotalApplications: 350, AcceptedApplications: 210, RejectedApplications: 140 },
];



class CustomBarChart extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 1,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="TotalApplications" fill="#8884d8" />
                    <Bar dataKey="AcceptedApplications" fill="#82ca9d" />
                    <Bar dataKey="RejectedApplications" fill="#ff6347" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default CustomBarChart;