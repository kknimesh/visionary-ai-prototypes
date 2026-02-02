import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

export function ImageUpload({ onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newFiles = Array.from(files).filter(
        (file) => file.type.startsWith("image/") && images.length + 1 <= maxImages
      );

      const newImages = [...images, ...newFiles].slice(0, maxImages);
      setImages(newImages);
      onImagesChange(newImages);

      // Create previews
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews((prev) => [...prev, e.target?.result as string].slice(0, maxImages));
        };
        reader.readAsDataURL(file);
      });
    },
    [images, maxImages, onImagesChange]
  );

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
    onImagesChange(newImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-300",
          isDragging
            ? "border-accent bg-accent/5 shadow-ai"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30",
          images.length >= maxImages && "pointer-events-none opacity-50"
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div className={cn(
            "mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300",
            isDragging ? "bg-gradient-ai shadow-ai" : "bg-muted"
          )}>
            <Upload className={cn("h-7 w-7", isDragging ? "text-accent-foreground" : "text-muted-foreground")} />
          </div>
          <p className="mb-2 text-lg font-semibold text-foreground">
            {isDragging ? "Drop images here" : "Upload vehicle damage photos"}
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            Drag and drop or click to select up to {maxImages} images
          </p>
          <Button
            variant="outline"
            onClick={() => document.getElementById("image-input")?.click()}
            disabled={images.length >= maxImages}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Select Images
          </Button>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
            >
              <img
                src={preview}
                alt={`Upload ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-success px-2 py-1 text-xs font-medium text-success-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <CheckCircle className="h-3 w-3" />
                Ready
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {images.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {images.length} of {maxImages} images uploaded
        </p>
      )}
    </div>
  );
}
