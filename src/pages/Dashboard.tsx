import { FileText, Clock, CheckCircle, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentClaimsTable, Claim } from "@/components/dashboard/RecentClaimsTable";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { Link } from "react-router-dom";

const mockClaims: Claim[] = [
  {
    id: "1",
    claimNumber: "CLM-2024-0847",
    policyHolder: "Michael Chen",
    vehicleInfo: "2022 Toyota Camry",
    dateSubmitted: "2024-01-15",
    status: "in_review",
    estimatedCost: 3250,
    severity: "moderate",
  },
  {
    id: "2",
    claimNumber: "CLM-2024-0846",
    policyHolder: "Sarah Johnson",
    vehicleInfo: "2023 Honda CR-V",
    dateSubmitted: "2024-01-15",
    status: "pending",
    estimatedCost: 8500,
    severity: "severe",
  },
  {
    id: "3",
    claimNumber: "CLM-2024-0845",
    policyHolder: "David Williams",
    vehicleInfo: "2021 Ford F-150",
    dateSubmitted: "2024-01-14",
    status: "approved",
    estimatedCost: 1200,
    severity: "minor",
  },
  {
    id: "4",
    claimNumber: "CLM-2024-0844",
    policyHolder: "Emily Brown",
    vehicleInfo: "2020 BMW X3",
    dateSubmitted: "2024-01-14",
    status: "approved",
    estimatedCost: 4800,
    severity: "moderate",
  },
  {
    id: "5",
    claimNumber: "CLM-2024-0843",
    policyHolder: "James Miller",
    vehicleInfo: "2022 Tesla Model 3",
    dateSubmitted: "2024-01-13",
    status: "rejected",
    estimatedCost: 12000,
    severity: "severe",
  },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back, Jane. Here's what's happening with your claims.
          </p>
        </div>
        <Button className="bg-gradient-ai shadow-ai hover:opacity-90 transition-opacity" asChild>
          <Link to="/new-claim">
            <FileText className="mr-2 h-4 w-4" />
            New Claim
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Claims"
          value={142}
          change="+12% from last month"
          changeType="positive"
          icon={FileText}
        />
        <StatsCard
          title="Pending Review"
          value={23}
          change="8 urgent cases"
          changeType="negative"
          icon={Clock}
          iconColor="bg-warning"
        />
        <StatsCard
          title="Approved Today"
          value={8}
          change="+3 from yesterday"
          changeType="positive"
          icon={CheckCircle}
          iconColor="bg-success"
        />
        <StatsCard
          title="Avg. Processing Time"
          value="2.4h"
          change="-47% with AI assist"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-gradient-ai"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentClaimsTable claims={mockClaims} />
        </div>
        <div>
          <AIInsightCard />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-xl border bg-card p-6 shadow-card">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link to="/new-claim">
              <FileText className="h-5 w-5 text-primary" />
              <span>New Claim</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link to="/claims?status=pending">
              <Clock className="h-5 w-5 text-warning" />
              <span>Pending Review</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link to="/claims?status=approved">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>Approved</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link to="/analytics">
              <TrendingUp className="h-5 w-5 text-info" />
              <span>Analytics</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
