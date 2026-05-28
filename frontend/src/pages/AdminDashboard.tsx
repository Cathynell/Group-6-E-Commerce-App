import DashboardLayout from "../components/layout/DashboardLayout";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1a2e1a",
            margin: 0,
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Placeholder - we'll add sections here soon! */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          border: "1px solid #f0f0f0",
        }}
      >
        <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>
          Dashboard content coming soon...
        </p>
      </div>
    </DashboardLayout>
  );
}