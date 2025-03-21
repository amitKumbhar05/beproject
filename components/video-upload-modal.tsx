"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type VideoUploadModalProps = {
  children: React.ReactNode
}

type UploadStatus = "idle" | "uploading" | "processing" | "success" | "error"

export default function VideoUploadModal({ children }: VideoUploadModalProps) {
  const [open, setOpen] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith("video/")) {
      setSelectedFile(file)
    } else {
      alert("Please upload a video file")
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    setUploadStatus("uploading")

    // Simulate upload progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setUploadStatus("processing")

        // Simulate processing time
        setTimeout(() => {
          setUploadStatus("success")
        }, 3000)
      }
    }, 200)
  }

  const resetUpload = () => {
    setSelectedFile(null)
    setUploadStatus("idle")
    setProgress(0)
  }

  const closeModal = () => {
    setOpen(false)
    setTimeout(() => {
      resetUpload()
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
          <DialogDescription>Upload a video for object detection and blurring processing</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-4">
            {uploadStatus === "idle" && (
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="mx-auto h-8 w-8 text-primary" />
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={resetUpload}>
                      <X className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-semibold">Drag & Drop</h3>
                    <p className="text-sm text-muted-foreground mb-2">or click to browse files</p>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleFileChange}
                    />
                    <Button asChild variant="outline" size="sm">
                      <label htmlFor="file-upload">Select Video</label>
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">Supported formats: MP4, MOV, AVI (Max 500MB)</p>
                  </>
                )}
              </div>
            )}

            {(uploadStatus === "uploading" || uploadStatus === "processing") && (
              <div className="space-y-4 p-4">
                <div className="flex items-center justify-center">
                  {uploadStatus === "uploading" ? (
                    <div className="text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                      <h3 className="mt-2 font-medium">Uploading video...</h3>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                      <h3 className="mt-2 font-medium">Processing video...</h3>
                      <p className="text-sm text-muted-foreground">Detecting and blurring objects</p>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <Progress value={progress} className="h-2 w-full" />
                  <p className="text-xs text-right text-muted-foreground">{progress}%</p>
                </div>
              </div>
            )}

            {uploadStatus === "success" && (
              <div className="space-y-4 p-4 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <div>
                  <h3 className="text-lg font-medium">Processing Complete!</h3>
                  <p className="text-sm text-muted-foreground">Your video has been successfully processed.</p>
                </div>
                <div className="pt-2">
                  <Button className="w-full">Download Processed Video</Button>
                </div>
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="space-y-4 p-4 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
                <div>
                  <h3 className="text-lg font-medium">Processing Failed</h3>
                  <p className="text-sm text-muted-foreground">
                    There was an error processing your video. Please try again.
                  </p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" onClick={resetUpload}>
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Detection Settings</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="detect-people" className="rounded" defaultChecked />
                  <label htmlFor="detect-people" className="text-sm">
                    People
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="detect-vehicles" className="rounded" defaultChecked />
                  <label htmlFor="detect-vehicles" className="text-sm">
                    Vehicles
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="detect-weapons" className="rounded" defaultChecked />
                  <label htmlFor="detect-weapons" className="text-sm">
                    Weapons
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="detect-equipment" className="rounded" defaultChecked />
                  <label htmlFor="detect-equipment" className="text-sm">
                    Equipment
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Blurring Options</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="blur-intensity" className="text-sm">
                    Blur Intensity
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">Low</span>
                    <input type="range" id="blur-intensity" min="1" max="10" defaultValue="5" className="flex-1" />
                    <span className="text-xs">High</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm">Blur Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="blur-gaussian" name="blur-method" defaultChecked />
                      <label htmlFor="blur-gaussian" className="text-sm">
                        Gaussian
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="blur-pixelate" name="blur-method" />
                      <label htmlFor="blur-pixelate" className="text-sm">
                        Pixelate
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          {uploadStatus === "idle" && (
            <>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!selectedFile}>
                Upload & Process
              </Button>
            </>
          )}

          {(uploadStatus === "uploading" || uploadStatus === "processing") && (
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          )}

          {(uploadStatus === "success" || uploadStatus === "error") && <Button onClick={closeModal}>Close</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

