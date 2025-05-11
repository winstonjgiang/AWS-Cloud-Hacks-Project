import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const renderActiveShape = (props) => {
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;

    const RADIAN = Math.PI / 180;
    const sx = cx + outerRadius * Math.cos(-midAngle * RADIAN);
    const sy = cy + outerRadius * Math.sin(-midAngle * RADIAN);
    const mx = cx + (outerRadius + 45) * Math.cos(-midAngle * RADIAN);
    const my = cy + (outerRadius + 45) * Math.sin(-midAngle * RADIAN);
    const ex = mx + (Math.cos(-midAngle * RADIAN) >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = Math.cos(-midAngle * RADIAN) >= 0 ? 'start' : 'end';

    return (
        <g>
            {/* Background sector */}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            {/* Outer active sector */}
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            {/* Label line starting from outer edge */}
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (Math.cos(-midAngle * RADIAN) >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
                style={{ fontSize: '14px', fontWeight: 500 }}
            >
                {payload.name}
            </text>
            <text
                x={ex + (Math.cos(-midAngle * RADIAN) >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
                style={{ fontSize: '12px' }}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            <text
                x={ex + (Math.cos(-midAngle * RADIAN) >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={36}
                textAnchor={textAnchor}
                fill="#999"
                style={{ fontSize: '12px' }}
            >
                {`(${payload.value[1]} events)`}
            </text>
        </g>
    );
};

export default function CategoryPieChart({ data }) {

    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };
    const transformedData = data.map(item => ({
        ...item,
        pieValue: item.value[1] // Changed from value[0] to value[1] to use event count instead of hours
    }));

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="h-[400px] flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={transformedData}
                            cx="50%"
                            cy="45%"
                            innerRadius={75}
                            outerRadius={110}
                            fill="#8884d8"
                            dataKey="pieValue"
                            onMouseEnter={onPieEnter}
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