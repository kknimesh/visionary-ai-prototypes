import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Claim {
  id: string;
  claimNumber: string;
  policyHolder: string;
  vehicleInfo: string;
  dateSubmitted: string;
  status: "pending" | "in_review" | "approved" | "rejected";
  estimatedCost: number;
  severity: "minor" | "moderate" | "severe";
}

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

interface RecentClaimsTableProps {
  claims: Claim[];
}

export function RecentClaimsTable({ claims }: RecentClaimsTableProps) {
  return (
    <div className="rounded-xl border bg-card shadow-card">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Recent Claims</h3>
            <p className="text-sm text-muted-foreground">Review and manage recent claim submissions</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/claims">View All</Link>
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Claim #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Policy Holder
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Estimated Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {claims.map((claim) => (
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
      </div>
    </div>
  );
}
