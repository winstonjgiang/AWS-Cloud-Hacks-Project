"use client";
import CategoryPieChart from "./CategoryPieChart";

export default function UserDashboard({ categoryData }) {
  return (
    <>
      <div>
        <h1>User Dashboard</h1>
        {categoryData ? (
          <CategoryPieChart data={categoryData} />
        ) : (
          <div>Loading category data...</div>
        )}
      </div>
    </>
  );
}
