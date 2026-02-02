import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, User, Car, Camera, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/claims/ImageUpload";
import { AIAnalysisPanel } from "@/components/claims/AIAnalysisPanel";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Policy Info", icon: User },
  { id: 2, title: "Vehicle Details", icon: Car },
  { id: 3, title: "Damage Photos", icon: Camera },
  { id: 4, title: "AI Analysis", icon: Sparkles },
];

export default function NewClaim() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    policyNumber: "",
    policyHolderName: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vin: "",
    accidentDate: "",
    accidentDescription: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      if (currentStep + 1 === 4 && images.length > 0) {
        setIsAnalyzing(true);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 -ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">New Insurance Claim</h1>
        <p className="mt-1 text-muted-foreground">
          Submit a new claim for AI-powered damage assessment
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isAIStep = step.id === 4;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
                      isCompleted && "border-success bg-success text-success-foreground",
                      isActive && !isAIStep && "border-primary bg-primary text-primary-foreground",
                      isActive && isAIStep && "border-accent bg-gradient-ai text-accent-foreground shadow-ai",
                      !isActive && !isCompleted && "border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-sm font-medium",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "mx-4 h-0.5 w-24 transition-all duration-300",
                      isCompleted ? "bg-success" : "bg-muted-foreground/20"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="rounded-xl border bg-card shadow-card">
        {/* Step 1: Policy Info */}
        {currentStep === 1 && (
          <div className="animate-fade-in p-8">
            <h2 className="mb-6 text-xl font-semibold text-card-foreground">Policy Holder Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  placeholder="e.g., POL-2024-123456"
                  value={formData.policyNumber}
                  onChange={(e) => updateForm("policyNumber", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyHolderName">Policy Holder Name</Label>
                <Input
                  id="policyHolderName"
                  placeholder="Full name"
                  value={formData.policyHolderName}
                  onChange={(e) => updateForm("policyHolderName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Vehicle Details */}
        {currentStep === 2 && (
          <div className="animate-fade-in p-8">
            <h2 className="mb-6 text-xl font-semibold text-card-foreground">Vehicle Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vehicleMake">Vehicle Make</Label>
                <Select
                  value={formData.vehicleMake}
                  onValueChange={(value) => updateForm("vehicleMake", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="chevrolet">Chevrolet</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                    <SelectItem value="tesla">Tesla</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicleModel">Vehicle Model</Label>
                <Input
                  id="vehicleModel"
                  placeholder="e.g., Camry, Civic, F-150"
                  value={formData.vehicleModel}
                  onChange={(e) => updateForm("vehicleModel", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicleYear">Vehicle Year</Label>
                <Select
                  value={formData.vehicleYear}
                  onValueChange={(value) => updateForm("vehicleYear", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 15 }, (_, i) => 2024 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vin">VIN (Optional)</Label>
                <Input
                  id="vin"
                  placeholder="17-character VIN"
                  value={formData.vin}
                  onChange={(e) => updateForm("vin", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="accidentDate">Date of Accident</Label>
                <Input
                  id="accidentDate"
                  type="date"
                  value={formData.accidentDate}
                  onChange={(e) => updateForm("accidentDate", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="accidentDescription">Accident Description</Label>
                <Textarea
                  id="accidentDescription"
                  placeholder="Briefly describe what happened..."
                  rows={4}
                  value={formData.accidentDescription}
                  onChange={(e) => updateForm("accidentDescription", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Damage Photos */}
        {currentStep === 3 && (
          <div className="animate-fade-in p-8">
            <h2 className="mb-2 text-xl font-semibold text-card-foreground">Upload Damage Photos</h2>
            <p className="mb-6 text-muted-foreground">
              Upload clear photos of all visible damage. Our AI will analyze these images to assess the damage and estimate repair costs.
            </p>
            <ImageUpload onImagesChange={setImages} maxImages={5} />
          </div>
        )}

        {/* Step 4: AI Analysis */}
        {currentStep === 4 && (
          <div className="animate-fade-in p-8">
            <AIAnalysisPanel
              isAnalyzing={isAnalyzing}
              images={images}
              onAnalysisComplete={handleAnalysisComplete}
            />
            {!isAnalyzing && !analysisComplete && images.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No Images Uploaded</h3>
                <p className="mt-2 text-muted-foreground">
                  Please go back and upload damage photos to run AI analysis.
                </p>
                <Button variant="outline" className="mt-4" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Upload Photos
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between border-t bg-muted/30 p-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={nextStep} disabled={currentStep === 3 && images.length === 0}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="bg-gradient-ai shadow-ai hover:opacity-90"
              disabled={!analysisComplete}
              onClick={() => navigate("/")}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Submit Claim
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
