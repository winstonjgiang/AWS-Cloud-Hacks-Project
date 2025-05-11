// components/UserDashboard.jsx
"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import DashboardHeader from "./user_dashboard_components/DashboardHeader";
import StatsGrid from "./user_dashboard_components/StatsGrid";
import SummarySection from "./user_dashboard_components/SummarySection";
import VisualizationSection from "./user_dashboard_components/VisualizationSection";
import { FaBook, FaRunning, FaHeart, FaClock } from "react-icons/fa";

export default function UserDashboard({ categoryData, summary, recurringEvents }) {
  // Build stats array exactly as before
  const stats = React.useMemo(() => {
    if (!categoryData) return null;
    const total = categoryData.reduce((sum, item) => sum + Number(item.value[0]), 0);
    return [
      {
        title: "Academic Time",
        value: Number(categoryData[0]?.value[0] || 0),
        progress: Math.round((Number(categoryData[0]?.value[0] || 0) / total) * 100) || 0,
        icon: FaBook,
        color: "blue.400",
      },
      {
        title: "Exercise Time",
        value: Number(categoryData[1]?.value[0] || 0),
        progress: Math.round((Number(categoryData[1]?.value[0] || 0) / total) * 100) || 0,
        icon: FaRunning,
        color: "green.400",
      },
      {
        title: "Personal Time",
        value: Number(categoryData[2]?.value[0] || 0),
        progress: Math.round((Number(categoryData[2]?.value[0] || 0) / total) * 100) || 0,
        icon: FaHeart,
        color: "yellow.400",
      },
      {
        title: "Total Time",
        value: total,
        progress: 100,
        icon: FaClock,
        color: "purple.400",
      },
    ];
  }, [categoryData]);

  const isLoading = !categoryData;

  return (
    <Box p={8} maxW="1400px" mx="auto">
      <DashboardHeader />
      <StatsGrid stats={stats} isLoading={isLoading} />
      <SummarySection summary={summary} isLoading={isLoading} />
      <VisualizationSection categoryData={categoryData} isLoading={isLoading} recurringEvents={recurringEvents} />
    </Box>
  );
}