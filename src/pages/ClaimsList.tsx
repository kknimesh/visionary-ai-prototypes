import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Claim } from "@/components/dashboard/RecentClaimsTable";

const statusConfig = {
  pending: { label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  in_review: { label: "In Review", className: "bg-info/10 text-info border-info/20" },
  approved: { label: "Approved", className: "bg-success/10 text-success border-success/20" },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const severityConfig = {
  minor: { label: "Minor", className: "bg-damage-minor/10 text-damage-minor" },
  moderate: { label: "Moderate", className: "bg-damage-moderate/10 text-damage-moderate" },
  severe: { label: "Severe", className: "bg-damage-severe/10 text-damage-severe" },
};

const allClaims: Claim[] = [
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
  {
    id: "6",
    claimNumber: "CLM-2024-0842",
    policyHolder: "Lisa Anderson",
    vehicleInfo: "2021 Chevrolet Malibu",
    dateSubmitted: "2024-01-13",
    status: "approved",
    estimatedCost: 2100,
    severity: "minor",
  },
  {
    id: "7",
    claimNumber: "CLM-2024-0841",
    policyHolder: "Robert Taylor",
    vehicleInfo: "2023 Audi Q5",
    dateSubmitted: "2024-01-12",
    status: "in_review",
    estimatedCost: 5600,
    severity: "moderate",
  },
  {
    id: "8",
    claimNumber: "CLM-2024-0840",
    policyHolder: "Jennifer Martinez",
    vehicleInfo: "2022 Subaru Outback",
    dateSubmitted: "2024-01-12",
    status: "pending",
    estimatedCost: 3800,
    severity: "moderate",
  },
];

export default function ClaimsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const filteredClaims = allClaims.filter((claim) => {
    const matchesSearch =
      claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.policyHolder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.vehicleInfo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || claim.severity === severityFilter;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Claims</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and review all insurance claims
          </p>
        </div>
        <Button className="bg-gradient-ai shadow-ai hover:opacity-90" asChild>
          <Link to="/new-claim">
            <Plus className="mr-2 h-4 w-4" />
            New Claim
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by claim number, policy holder, or vehicle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="minor">Minor</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="severe">Severe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Claims Table */}
      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Claim #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Policy Holder
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Vehicle
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Severity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Estimated Cost
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredClaims.map((claim) => (
              <tr key={claim.id} className="transition-colors hover:bg-muted/20">
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="font-mono text-sm font-semibold text-primary">{claim.claimNumber}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm font-medium text-card-foreground">{claim.policyHolder}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm text-muted-foreground">{claim.vehicleInfo}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm text-muted-foreground">{claim.dateSubmitted}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Badge variant="outline" className={severityConfig[claim.severity].className}>
                    {severityConfig[claim.severity].label}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm font-semibold text-card-foreground">
                    ${claim.estimatedCost.toLocaleString()}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Badge variant="outline" className={statusConfig[claim.status].className}>
                    {statusConfig[claim.status].label}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <Link to={`/claims/${claim.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Run AI Analysis</DropdownMenuItem>
                        <DropdownMenuItem>Approve Claim</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Reject Claim</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredClaims.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium text-foreground">No claims found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Pagination placeholder */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredClaims.length} of {allClaims.length} claims
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
