import React, { PureComponent } from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class CustomizedLabel extends PureComponent {
    render() {
        const { x, y, stroke, value } = this.props;

        return (
            <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
                {value}
            </text>
        );
    }
}

class CustomizedAxisTick extends PureComponent {
    render() {
        const { x, y, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                    {payload.value}
                </text>
            </g>
        );
    }
}

class CustomLineBar extends PureComponent {
    render() {
        const { chartType, data, xAxisKey, linesOrBars } = this.props;
        const ChartComponent = chartType === 'bar' ? BarChart : LineChart;
        const ChartElement = chartType === 'bar' ? Bar : Line;

        return (
            <ResponsiveContainer width="100%" height={300}>
                <ChartComponent
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 1,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} height={60} tick={<CustomizedAxisTick />} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {linesOrBars?.map((lineOrBar, index) => (
                        <ChartElement
                            key={index}
                            type="monotone"
                            dataKey={lineOrBar.dataKey}
                            stroke={lineOrBar.stroke}
                            fill={lineOrBar.fill}
                            label={lineOrBar.label ? <CustomizedLabel /> : null}
                        />
                    ))}
                </ChartComponent>
            </ResponsiveContainer>
        );
    }
}

export default CustomLineBar;
