"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface Visitor {
    path: string;
    count: number;
}

interface VisitorProps {
    visitors: Visitor[];
}

const formatPath = (path: string) => {
    if (path === "/") return "Home";
    if (path === "/tours") return "Tours";
    if (path === "/tours/details/:id") return "Tour Details";
    return path;
};

const VisitorCount = ({ visitors }: VisitorProps) => {
    console.log(visitors);
    return (
        <div>
            <h1 className="text-2xl font-bold">Total Visitors</h1>
            <div style={{ width: "100%", height: "400px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={visitors}
                        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="path"
                            tickFormatter={formatPath}
                            interval={0}
                        />
                        <YAxis allowDecimals={false} />
                        <Tooltip
                            formatter={(value) => [`${value}`, "Visitors"]}
                            labelFormatter={formatPath}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="count"
                            name="Visitors"
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default VisitorCount;
