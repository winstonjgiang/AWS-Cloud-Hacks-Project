import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    // Calculate position for label
    // Reduce radius to ensure label is inside the slice
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6; // Adjusted from 0.5 to 0.6 to move more towards outer edge
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Calculate if we're on the left or right half of the pie
    const isLeftSide = x < cx;

    return (
        <g>
            {/* Add a white background to improve readability */}
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={16}
            >
                {`${name}`}
            </text>
            <text
                x={x}
                y={y + 15} // Position percentage below the name
                fill="black"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={16}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        </g>
    );
};

export default function CategoryPieChart({ data }) {
    // Transform the data to use hours (first element of value array) for the pie chart
    const transformedData = data.map(item => ({
        ...item,
        pieValue: item.value[0] // Use the hours value for the pie chart
    }));

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="h-[400px] flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={transformedData}
                            cx="50%"
                            cy="45%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={150}
                            innerRadius={75} // Added inner radius to create a donut chart
                            fill="#8884d8"
                            dataKey="pieValue"
                            paddingAngle={2} // Added small padding between slices
                        >
                            {transformedData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
} 