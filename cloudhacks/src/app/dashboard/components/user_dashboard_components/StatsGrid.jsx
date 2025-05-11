// components/StatsGrid.jsx
import { Grid } from "@chakra-ui/react";
import StatCard from "./StatCard";
import LoadingStatCard from "./LoadingStatCard"; // see below

export default function StatsGrid({ stats, isLoading }) {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
      gap={6}
      mb={8}
    >
      {isLoading
        ? Array(4).fill(0).map((_, i) => <LoadingStatCard key={i} />)
        : stats.map((stat, i) => <StatCard key={i} stat={stat} />)
      }
    </Grid>
  );
}