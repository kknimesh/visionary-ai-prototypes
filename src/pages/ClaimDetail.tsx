import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles, Clock, User, Car, Calendar, FileText, CheckCircle, XCircle, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AIAnalysisPanel } from "@/components/claims/AIAnalysisPanel";
import sampleDamage from "@/assets/sample-damage.jpg";

const claimData = {
  id: "1",
  claimNumber: "CLM-2024-0847",
  policyHolder: "Michael Chen",
  email: "michael.chen@email.com",
  phone: "+1 (555) 234-5678",
  vehicleInfo: "2022 Toyota Camry",
  vin: "4T1BF1FK5CU500001",
  dateSubmitted: "2024-01-15",
  accidentDate: "2024-01-14",
  status: "in_review" as const,
  estimatedCost: 3250,
  severity: "moderate" as const,
  description: "Front-end collision at intersection. Vehicle was struck by another car running a red light. Airbags did not deploy. Driver and passengers uninjured.",
};

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

export default function ClaimDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);
  const [notes, setNotes] = useState("");

  const handleRunAnalysis = () => {
    setAnalysisComplete(false);
    setIsAnalyzing(true);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate("/claims")} className="mb-4 -ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Claims
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {claimData.claimNumber}
              </h1>
              <Badge variant="outline" className={statusConfig[claimData.status].className}>
                {statusConfig[claimData.status].label}
              </Badge>
              <Badge variant="outline" className={severityConfig[claimData.severity].className}>
                {severityConfig[claimData.severity].label}
              </Badge>
            </div>
            <p className="mt-1 text-muted-foreground">
              Submitted on {claimData.dateSubmitted}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-success hover:bg-success/90">
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button variant="destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Claim Details */}
        <div className="space-y-6">
          {/* Policy Holder Info */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-card-foreground">
              <User className="h-5 w-5 text-primary" />
              Policy Holder
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{claimData.policyHolder}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{claimData.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{claimData.phone}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-card-foreground">
              <Car className="h-5 w-5 text-primary" />
              Vehicle Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Vehicle</p>
                <p className="font-medium">{claimData.vehicleInfo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">VIN</p>
                <p className="font-mono text-sm">{claimData.vin}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accident Date</p>
                <p className="font-medium">{claimData.accidentDate}</p>
              </div>
            </div>
          </div>

          {/* Accident Description */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-card-foreground">
              <FileText className="h-5 w-5 text-primary" />
              Accident Description
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {claimData.description}
            </p>
          </div>

          {/* Damage Photos */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-semibold text-card-foreground">Damage Photos</h3>
            <div className="grid grid-cols-2 gap-3">
              <img
                src={sampleDamage}
                alt="Damage photo 1"
                className="aspect-square rounded-lg object-cover"
              />
              <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed bg-muted/30">
                <span className="text-sm text-muted-foreground">+3 more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - AI Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Run Analysis Button */}
          {!analysisComplete && !isAnalyzing && (
            <div className="rounded-xl border bg-card p-8 text-center shadow-card">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-ai shadow-ai">
                  <Sparkles className="h-8 w-8 text-accent-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold">Run AI Damage Assessment</h3>
              <p className="mt-2 text-muted-foreground">
                Analyze the uploaded photos to automatically detect damage and estimate repair costs.
              </p>
              <Button
                className="mt-6 bg-gradient-ai shadow-ai hover:opacity-90"
                onClick={handleRunAnalysis}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Start AI Analysis
              </Button>
            </div>
          )}

          {/* AI Analysis Panel */}
          {(isAnalyzing || analysisComplete) && (
            <AIAnalysisPanel
              isAnalyzing={isAnalyzing}
              onAnalysisComplete={() => {
                setIsAnalyzing(false);
                setAnalysisComplete(true);
              }}
            />
          )}

          {/* Agent Notes */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-semibold text-card-foreground">Agent Notes</h3>
            <Textarea
              placeholder="Add notes about this claim..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
            <div className="mt-4 flex justify-end">
              <Button variant="outline">
                <Send className="mr-2 h-4 w-4" />
                Save Notes
              </Button>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-semibold text-card-foreground">Activity Timeline</h3>
            <div className="space-y-4">
              {[
                { time: "Today, 2:45 PM", action: "AI analysis completed", user: "System" },
                { time: "Today, 2:43 PM", action: "AI analysis started", user: "Jane Doe" },
                { time: "Today, 10:30 AM", action: "Claim assigned for review", user: "System" },
                { time: "Yesterday, 4:15 PM", action: "Photos uploaded by policyholder", user: "Michael Chen" },
                { time: "Yesterday, 2:00 PM", action: "Claim submitted", user: "Michael Chen" },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {index < 4 && <div className="h-full w-px bg-border" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.time} • {item.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
