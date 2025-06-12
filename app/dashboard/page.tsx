"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  ImageIcon,
  BarChart3,
  Users,
  Zap,
  CheckCircle,
  Settings,
  Bell,
  Plus,
  Clock,
  TrendingUp,
  Heart,
  MessageCircle,
  Share,
  Eye,
} from "lucide-react"

const platforms = [
  { id: "twitter", name: "Twitter/X", color: "bg-black", enabled: true, followers: "12.5K" },
  { id: "facebook", name: "Facebook", color: "bg-blue-600", enabled: true, followers: "8.2K" },
  { id: "instagram", name: "Instagram", color: "bg-pink-500", enabled: true, followers: "15.8K" },
  { id: "linkedin", name: "LinkedIn", color: "bg-blue-700", enabled: true, followers: "5.1K" },
  { id: "tiktok", name: "TikTok", color: "bg-black", enabled: false, followers: "0" },
  { id: "youtube", name: "YouTube", color: "bg-red-600", enabled: false, followers: "0" },
]

const recentPosts = [
  {
    id: 1,
    content: "Just launched our new feature! 🚀 What do you think?",
    platforms: ["twitter", "facebook", "linkedin"],
    scheduledFor: "2024-01-15 10:00 AM",
    status: "published",
    metrics: { views: 1250, likes: 89, comments: 12, shares: 5 },
  },
  {
    id: 2,
    content: "Behind the scenes of our latest project. The team worked incredibly hard!",
    platforms: ["instagram", "facebook"],
    scheduledFor: "2024-01-14 2:30 PM",
    status: "published",
    metrics: { views: 2100, likes: 156, comments: 23, shares: 8 },
  },
  {
    id: 3,
    content: "Tips for better social media engagement - thread coming soon!",
    platforms: ["twitter", "linkedin"],
    scheduledFor: "2024-01-16 9:00 AM",
    status: "scheduled",
    metrics: { views: 0, likes: 0, comments: 0, shares: 0 },
  },
]

export default function Dashboard() {
  const [postContent, setPostContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms.filter((p) => p.enabled).map((p) => p.id))
  const [isPosting, setIsPosting] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  const handlePost = async () => {
    setIsPosting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsPosting(false)
    setPostSuccess(true)
    setPostContent("")
    setTimeout(() => setPostSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">SocialSync Pro</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Badge variant="secondary">Pro Plan</Badge>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="compose" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
          </TabsList>

          {/* Compose Tab */}
          <TabsContent value="compose" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Posting Area */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Create New Post
                    </CardTitle>
                    <CardDescription>
                      Write once, post everywhere. Reach all your audiences simultaneously.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="content">Post Content</Label>
                      <Textarea
                        id="content"
                        placeholder="What's on your mind? Share your thoughts with the world..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="min-h-[120px] mt-2"
                      />
                      <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                        <span>{postContent.length}/280 characters</span>
                        <Button variant="ghost" size="sm">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Add Media
                        </Button>
                      </div>
                    </div>

                    {/* Platform Selection */}
                    <div>
                      <Label>Select Platforms</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {platforms.map((platform) => (
                          <div
                            key={platform.id}
                            className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedPlatforms.includes(platform.id)
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handlePlatformToggle(platform.id)}
                          >
                            <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                            <span className="text-sm font-medium">{platform.name}</span>
                            <Switch checked={selectedPlatforms.includes(platform.id)} className="ml-auto" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule Options */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">Schedule for later</span>
                      </div>
                      <Switch />
                    </div>

                    {/* Post Button */}
                    <Button
                      onClick={handlePost}
                      disabled={!postContent.trim() || selectedPlatforms.length === 0 || isPosting}
                      className="w-full"
                      size="lg"
                    >
                      {isPosting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Posting to {selectedPlatforms.length} platforms...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Post to {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? "s" : ""}
                        </>
                      )}
                    </Button>

                    {postSuccess && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        Successfully posted to all selected platforms!
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Posts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                    <CardDescription>Your latest social media activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <p className="text-sm text-gray-900">{post.content}</p>
                          <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          {post.platforms.map((platformId) => {
                            const platform = platforms.find((p) => p.id === platformId)
                            return platform ? (
                              <div key={platformId} className={`w-2 h-2 rounded-full ${platform.color}`} />
                            ) : null
                          })}
                          <span className="text-xs text-gray-500">{post.scheduledFor}</span>
                        </div>

                        {post.status === "published" && (
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {post.metrics.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {post.metrics.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {post.metrics.comments}
                            </div>
                            <div className="flex items-center gap-1">
                              <Share className="h-3 w-3" />
                              {post.metrics.shares}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Today's Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">1.2K</div>
                        <div className="text-xs text-gray-500">Total Reach</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">89</div>
                        <div className="text-xs text-gray-500">Engagements</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">12</div>
                        <div className="text-xs text-gray-500">Shares</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">4.2%</div>
                        <div className="text-xs text-gray-500">Engagement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Connected Accounts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Connected Accounts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {platforms.slice(0, 4).map((platform) => (
                      <div key={platform.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${platform.color}`} />
                          <div>
                            <div className="text-sm font-medium">{platform.name}</div>
                            <div className="text-xs text-gray-500">{platform.followers} followers</div>
                          </div>
                        </div>
                        <Badge variant={platform.enabled ? "default" : "secondary"}>
                          {platform.enabled ? "Connected" : "Connect"}
                        </Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect More Platforms
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">41.6K</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2.1%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Posts This Month</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8.2%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89.2K</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15.3%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Engagement metrics across all connected platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platforms
                    .filter((p) => p.enabled)
                    .map((platform) => (
                      <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                          <div>
                            <div className="font-medium">{platform.name}</div>
                            <div className="text-sm text-gray-500">{platform.followers} followers</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">4.2% engagement</div>
                          <div className="text-sm text-green-600">+0.8% this week</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Scheduled Posts
                </CardTitle>
                <CardDescription>Manage your upcoming social media posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts
                    .filter((post) => post.status === "scheduled")
                    .map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <p className="text-sm text-gray-900">{post.content}</p>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Delete
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {post.platforms.map((platformId) => {
                            const platform = platforms.find((p) => p.id === platformId)
                            return platform ? (
                              <div key={platformId} className={`w-2 h-2 rounded-full ${platform.color}`} />
                            ) : null
                          })}
                          <span className="text-xs text-gray-500">Scheduled for {post.scheduledFor}</span>
                        </div>
                      </div>
                    ))}

                  {recentPosts.filter((post) => post.status === "scheduled").length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No scheduled posts yet</p>
                      <p className="text-sm">Create a post and schedule it for later</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Social Media Accounts
                </CardTitle>
                <CardDescription>Manage your connected social media platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${platform.color}`} />
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-sm text-gray-500">
                          {platform.enabled ? `${platform.followers} followers` : "Not connected"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {platform.enabled ? (
                        <>
                          <Badge variant="default">Connected</Badge>
                          <Button variant="outline" size="sm">
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button size="sm">Connect</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
