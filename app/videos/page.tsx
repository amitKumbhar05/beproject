"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Grid,
  List,
  MoreVertical,
  Play,
  Download,
  Trash2,
  Clock,
  Calendar,
  SortAsc,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: "Convoy Analysis Alpha",
    date: "2023-03-15",
    duration: "12:34",
    size: "245 MB",
    status: "Processed",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 2,
    title: "Tactical Vehicle Movement",
    date: "2023-04-22",
    duration: "08:17",
    size: "189 MB",
    status: "Processed",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 3,
    title: "Surveillance Footage Delta",
    date: "2023-05-10",
    duration: "15:42",
    size: "312 MB",
    status: "Processed",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 4,
    title: "Operation Secure Route",
    date: "2023-06-05",
    duration: "21:08",
    size: "420 MB",
    status: "Processing",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 5,
    title: "Aerial Reconnaissance",
    date: "2023-07-18",
    duration: "06:55",
    size: "156 MB",
    status: "Processed",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 6,
    title: "Field Exercise Recording",
    date: "2023-08-30",
    duration: "18:22",
    size: "378 MB",
    status: "Failed",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

export default function VideosPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVideos = mockVideos.filter((video) => video.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Videos</h1>
          <p className="text-muted-foreground">Manage and view your processed videos</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search videos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              {/* <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button> */}
              {/* <Select defaultValue="newest">
                <SelectTrigger className="h-9 w-[130px] gap-1">
                  <SortAsc className="h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select> */}
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 rounded-none rounded-l-md ${viewMode === "grid" ? "bg-muted" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Separator orientation="vertical" className="h-[20px]" />
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 rounded-none rounded-r-md ${viewMode === "list" ? "bg-muted" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="processed">Processed</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              {filteredVideos.length === 0 ? (
                <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No videos found</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    We couldn't find any videos matching your search. Try adjusting your filters.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                          <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <Badge
                          className="absolute right-2 top-2"
                          variant={
                            video.status === "Processed"
                              ? "default"
                              : video.status === "Processing"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {video.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold line-clamp-1">{video.title}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{video.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(video.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t p-4 pt-3">
                        <span className="text-xs text-muted-foreground">{video.size}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredVideos.map((video) => (
                    <div key={video.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{video.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{video.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(video.date).toLocaleDateString()}</span>
                          </div>
                          <span>{video.size}</span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          video.status === "Processed"
                            ? "default"
                            : video.status === "Processing"
                              ? "outline"
                              : "destructive"
                        }
                        className="ml-auto mr-4 hidden sm:inline-flex"
                      >
                        {video.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="processed">
              {/* Similar content as "all" but filtered for processed videos */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredVideos
                  .filter((video) => video.status === "Processed")
                  .map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                          <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <Badge className="absolute right-2 top-2">{video.status}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold line-clamp-1">{video.title}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{video.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(video.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t p-4 pt-3">
                        <span className="text-xs text-muted-foreground">{video.size}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="processing">
              {/* Content for processing videos */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredVideos
                  .filter((video) => video.status === "Processing")
                  .map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      {/* Similar card content as above */}
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <div className="flex flex-col items-center">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                            <span className="mt-2 text-sm font-medium text-white">Processing...</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="absolute right-2 top-2">
                          {video.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{video.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{video.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(video.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t p-4 pt-3">
                        <span className="text-xs text-muted-foreground">{video.size}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="failed">
              {/* Content for failed videos */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredVideos
                  .filter((video) => video.status === "Failed")
                  .map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="h-full w-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="rounded-full bg-destructive/10 p-3">
                            <Trash2 className="h-6 w-6 text-destructive" />
                          </div>
                        </div>
                        <Badge variant="destructive" className="absolute right-2 top-2">
                          {video.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{video.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(video.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t p-4 pt-3">
                        <span className="text-xs text-muted-foreground">{video.size}</span>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            Retry
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

