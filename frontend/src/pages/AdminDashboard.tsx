import DashboardLayout from "../components/layout/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";
import SalesOverviewChart from "../components/dashboard/SalesOverviewChart";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1a2e1a", margin: 0 }}>
          Dashboard
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Sales Chart */}
      <div style={{ marginBottom: "24px" }}>
        <SalesOverviewChart />
      </div>

    </DashboardLayout>
  );
}