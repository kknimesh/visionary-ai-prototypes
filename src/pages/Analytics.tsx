import { TrendingUp, TrendingDown, DollarSign, Clock, FileText, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const claimsOverTime = [
  { month: "Jan", claims: 45, approved: 38, rejected: 7 },
  { month: "Feb", claims: 52, approved: 44, rejected: 8 },
  { month: "Mar", claims: 61, approved: 51, rejected: 10 },
  { month: "Apr", claims: 58, approved: 49, rejected: 9 },
  { month: "May", claims: 72, approved: 62, rejected: 10 },
  { month: "Jun", claims: 68, approved: 58, rejected: 10 },
  { month: "Jul", claims: 85, approved: 73, rejected: 12 },
  { month: "Aug", claims: 91, approved: 79, rejected: 12 },
  { month: "Sep", claims: 78, approved: 67, rejected: 11 },
  { month: "Oct", claims: 95, approved: 82, rejected: 13 },
  { month: "Nov", claims: 102, approved: 89, rejected: 13 },
  { month: "Dec", claims: 142, approved: 124, rejected: 18 },
];

const severityDistribution = [
  { name: "Minor", value: 45, color: "hsl(142 71% 45%)" },
  { name: "Moderate", value: 35, color: "hsl(38 92% 50%)" },
  { name: "Severe", value: 20, color: "hsl(0 84% 60%)" },
];

const processingTime = [
  { category: "Manual Only", time: 4.5 },
  { category: "AI Assisted", time: 2.4 },
  { category: "AI + Manual Review", time: 3.1 },
];

const costSavings = [
  { month: "Q1", savings: 45000 },
  { month: "Q2", savings: 62000 },
  { month: "Q3", savings: 78000 },
  { month: "Q4", savings: 95000 },
];

export default function Analytics() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="mt-1 text-muted-foreground">
          Track performance metrics and AI efficiency insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Claims (YTD)
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">949</div>
            <p className="mt-1 flex items-center text-sm text-success">
              <TrendingUp className="mr-1 h-4 w-4" />
              +23% from last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approval Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87.4%</div>
            <p className="mt-1 flex items-center text-sm text-success">
              <TrendingUp className="mr-1 h-4 w-4" />
              +2.1% improvement
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Processing Time
            </CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.4h</div>
            <p className="mt-1 flex items-center text-sm text-success">
              <TrendingDown className="mr-1 h-4 w-4" />
              -47% with AI assist
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cost Savings (YTD)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$280K</div>
            <p className="mt-1 flex items-center text-sm text-success">
              <TrendingUp className="mr-1 h-4 w-4" />
              From AI automation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Claims Over Time */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Claims Volume Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={claimsOverTime}>
                  <defs>
                    <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217 91% 30%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(217 91% 30%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="claims"
                    stroke="hsl(217 91% 30%)"
                    fillOpacity={1}
                    fill="url(#colorClaims)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="approved"
                    stroke="hsl(142 71% 45%)"
                    fillOpacity={1}
                    fill="url(#colorApproved)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Damage Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {severityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              {severityDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Processing Time Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Processing Time Comparison (Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processingTime} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs fill-muted-foreground" />
                  <YAxis
                    dataKey="category"
                    type="category"
                    className="text-xs fill-muted-foreground"
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="time" fill="hsl(187 85% 43%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Performance */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>AI Model Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-muted/30 p-6 text-center">
              <p className="text-sm font-medium text-muted-foreground">Detection Accuracy</p>
              <p className="mt-2 text-4xl font-bold text-success">94.7%</p>
              <p className="mt-1 text-sm text-muted-foreground">+1.2% this month</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-6 text-center">
              <p className="text-sm font-medium text-muted-foreground">Estimate Accuracy</p>
              <p className="mt-2 text-4xl font-bold text-info">91.3%</p>
              <p className="mt-1 text-sm text-muted-foreground">Within 10% of actual</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-6 text-center">
              <p className="text-sm font-medium text-muted-foreground">Human Override Rate</p>
              <p className="mt-2 text-4xl font-bold text-warning">8.2%</p>
              <p className="mt-1 text-sm text-muted-foreground">-3.1% improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
