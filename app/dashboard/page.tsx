"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
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
  Loader2,
} from "lucide-react"

// Platform color mapping
const platformColors = {
  "Reddit": "bg-orange-600",
  "Instagram": "bg-pink-500"
};

// Default empty states
const defaultPlatforms = [
  { id: 1, name: "Reddit", color: "bg-orange-600", connected: false, followers: 0, premium: true },
  { id: 3, name: "Instagram", color: "bg-pink-500", connected: false, followers: 0, premium: true }
]

// Types for our data
interface Platform {
  id: number;
  name: string;
  color: string;
  connected: boolean;
  followers: number;
  premium: boolean;
}

interface PostMetrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

interface Post {
  id: number;
  content: string;
  platforms: number[];
  scheduledFor?: string;
  status: "draft" | "scheduled" | "published" | "failed";
  metrics?: PostMetrics;
}

export default function Dashboard() {
  // State
  const [postContent, setPostContent] = useState("")
  const [platforms, setPlatforms] = useState<Platform[]>(defaultPlatforms)
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([])
  const [isPosting, setIsPosting] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState("compose")
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedPostForEdit, setSelectedPostForEdit] = useState<Post | null>(null)

  // Load platforms and posts data
  useEffect(() => {
    fetchPlatforms();
    fetchPosts();
    
    // Only fetch analytics when that tab is selected
    if (currentTab === "analytics") {
      fetchAnalytics();
    }
  }, [currentTab]);

  // Fetch platforms from API
  const fetchPlatforms = async () => {
    try {
      setIsLoading(true);
      
      // Instead of fetching from the API, use our predefined platforms
      const formattedPlatforms = defaultPlatforms.map(p => {
        return {
          ...p,
          color: platformColors[p.name as keyof typeof platformColors] || "bg-gray-500",
          // Both platforms are premium now
          premium: true,
          // Add random follower counts
          followers: Math.floor(Math.random() * 2000) + 500
        };
      });
      
      setPlatforms(formattedPlatforms);
      
      // Get all connected platforms
      const connectedPlatforms = formattedPlatforms
        .filter((p: Platform) => p.connected)
        .map((p: Platform) => p.id);
      
      setSelectedPlatforms(connectedPlatforms);
    } catch (error) {
      console.error("Error fetching platforms:", error);
      toast({
        title: "Error",
        description: "Failed to load platforms. Your premium platforms are still available.",
        variant: "destructive",
      });
    }
  };

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      
      // Instead of fetching from API, create mock posts with our platforms
      const mockPosts = [
        {
          id: 1,
          content: "Excited to share our latest product launch! #innovation #technology",
          platforms: [1, 3], // Reddit, Instagram
          scheduled_for: null,
          status: "published",
          analytics: [
            { views: 1250, likes: 89, comments: 14, shares: 23 }
          ]
        },
        {
          id: 2,
          content: "Join our webinar next week on industry best practices.",
          platforms: [1], // Reddit only
          scheduled_for: null,
          status: "published",
          analytics: [
            { views: 3420, likes: 245, comments: 53, shares: 78 }
          ]
        },
        {
          id: 3,
          content: "Check out our team's presentation at the recent conference!",
          platforms: [3], // Instagram only
          scheduled_for: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
          status: "scheduled",
          analytics: []
        }
      ];
      
      // Format posts for display
      const formattedPosts = mockPosts.map((post) => ({
        id: post.id,
        content: post.content,
        platforms: post.platforms,
        scheduledFor: post.scheduled_for ? new Date(post.scheduled_for).toLocaleString() : undefined,
        status: post.status as "published" | "scheduled" | "draft" | "failed",
        metrics: post.analytics.length > 0 ? {
          views: post.analytics.reduce((sum: number, a: any) => sum + a.views, 0),
          likes: post.analytics.reduce((sum: number, a: any) => sum + a.likes, 0),
          comments: post.analytics.reduce((sum: number, a: any) => sum + a.comments, 0),
          shares: post.analytics.reduce((sum: number, a: any) => sum + a.shares, 0),
        } : { views: 0, likes: 0, comments: 0, shares: 0 }
      }));
      
      setRecentPosts(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load posts. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast({
        title: "Error",
        description: "Failed to load analytics. Please refresh the page.",
        variant: "destructive",
      });
    }
  };

  const handlePlatformToggle = (platformId: number) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]
    )
  }
  
  // Handle platform connection/disconnection
  const handlePlatformConnection = async (platformId: number) => {
    try {
      // All platforms can be connected/disconnected
      setIsConnecting(true);
      
      // Get current platform state before changing it
      const platform = platforms.find(p => p.id === platformId);
      if (!platform) {
        throw new Error("Platform not found");
      }
      
      const platformName = platform.name;
      const willBeConnected = !platform.connected;
      
      // Simulate connection for demo purposes
      setTimeout(() => {
        // Update local state directly for all platforms
        setPlatforms(prev => 
          prev.map(p => {
            if (p.id === platformId) {
              // Toggle connection state
              return {
                ...p,
                connected: !p.connected,
                // Generate random followers if connecting
                followers: !p.connected ? Math.floor(Math.random() * 1000) + 100 : p.followers
              };
            }
            return p;
          })
        );
        
        // Also update selected platforms if connecting
        if (willBeConnected) {
          setSelectedPlatforms(prev => 
            prev.includes(platformId) ? prev : [...prev, platformId]
          );
        } else {
          setSelectedPlatforms(prev => 
            prev.filter(id => id !== platformId)
          );
        }
        
        setIsConnecting(false);
        
        toast({
          title: "Success!",
          description: `${platformName} ${willBeConnected ? 'connected' : 'disconnected'} successfully`,
        });
      }, 1000);
      
      // Fake a delayed refresh for better UX
      setTimeout(() => {
        fetchPlatforms();
      }, 1200);
    } catch (error) {
      console.error('Platform connection error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to update platform connection',
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }
  
  // Handle post deletion
  const handleDeletePost = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts?id=${postId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete post');
      }
      
      // Refresh posts
      fetchPosts();
      
      toast({
        title: "Success!",
        description: "Post deleted successfully",
      });
      
    } catch (error) {
      console.error('Post deletion error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to delete post',
        variant: "destructive",
      });
    }
  }

  const handlePost = async () => {
    if (!postContent.trim()) {
      toast({
        title: "Missing Content",
        description: "Please enter some content for your post",
        variant: "destructive",
      });
      return;
    }
    
    // Check if at least one platform is selected
    if (selectedPlatforms.length === 0) {
      toast({
        title: "Platform Required",
        description: "Please select at least one platform to post to",
        variant: "destructive",
      });
      return;
    }
    
    setIsPosting(true);
    
    try {
      // Create post data with TypeScript interface
      interface PostData {
        content: string;
        platforms: number[];
        media_urls: any[];
        status?: string;
        scheduledFor?: string;
        published_at?: string;
      }
      
      const postData: PostData = {
        content: postContent,
        // Use all selected platforms
        platforms: selectedPlatforms,
        media_urls: [], // Add media URLs if needed
      };
      
      // Add scheduling data if enabled
      if (isScheduled && scheduledDate) {
        postData.status = "scheduled";
        postData.scheduledFor = new Date(scheduledDate).toISOString();
      } else {
        postData.status = "published";
        postData.published_at = new Date().toISOString();
      }
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }
      
      setPostSuccess(true);
      setPostContent("");
      setIsScheduled(false);
      setScheduledDate("");
      
      // Refresh posts to show the new post
      fetchPosts();
      
      // Show success message
      toast({
        title: "Success!",
        description: "Your post has been published successfully",
        variant: "default",
      });
      
      setTimeout(() => setPostSuccess(false), 3000);
    } catch (error) {
      console.error('Post creation error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to create post. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Zap className="h-8 w-8 text-purple-600" />
                  <h1 className="text-2xl font-bold text-gray-900">SocialSync Pro</h1>
                </div>
              </Link>
              <Badge className="bg-purple-700 ml-2">Subscription Active</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  toast({
                    title: "Notifications",
                    description: "No new notifications",
                    duration: 2000,
                  });
                }}
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Link href="/settings">
                <Button 
                  variant="ghost" 
                  size="sm"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Badge 
                variant="secondary" 
                className="cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => {
                  toast({
                    title: "Pro Plan",
                    description: "You're on the Pro Plan with Instagram and Reddit. Enjoy all premium features!",
                    duration: 2000,
                  });
                }}
              >
                Pro Plan
              </Badge>
              <Link href="/profile">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors">
                  JD
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
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
                      Your Social Media Professional Publishing Solution. Optimize your social presence with our premium tools.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="content">Post Content</Label>
                      <Textarea
                        id="content"
                        placeholder="What's on your mind? Post to Reddit and Instagram..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="min-h-[120px] mt-2 focus:border-purple-500 transition-colors"
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
                            } ${platform.premium ? "ring-2 ring-blue-400" : ""}`}
                            onClick={() => {
                              // Allow toggling all platforms
                              handlePlatformToggle(platform.id);
                            }}
                          >
                            <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{platform.name}</span>
                              {platform.premium && (
                                <span className="text-xs text-purple-600 font-semibold">Premium</span>
                              )}
                            </div>
                            <Switch 
                              checked={selectedPlatforms.includes(platform.id)} 
                              className="ml-auto" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule Options */}
                    <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">Schedule for later</span>
                        </div>
                        <Switch 
                          checked={isScheduled}
                          onCheckedChange={setIsScheduled}
                        />
                      </div>
                      
                      {isScheduled && (
                        <div className="mt-2">
                          <Label htmlFor="scheduled-date">Date and time</Label>
                          <Input
                            id="scheduled-date"
                            type="datetime-local"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      )}
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
                          {/* Display platform indicators */}
                          {post.platforms.map(platformId => {
                            const platform = platforms.find(p => p.id === platformId);
                            if (platform) {
                              return (
                                <div key={platformId} className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${platform.color}`}></div>
                                  <span className={`text-xs font-medium`}>
                                    {platform.name} {platform.premium && "(Premium)"}
                                  </span>
                                </div>
                              );
                            }
                            return null;
                          })}
                          <span className="text-xs text-gray-500">{post.scheduledFor}</span>
                        </div>

                        {post.status === "published" && post.metrics && (
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {post.metrics?.views || 0}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {post.metrics?.likes || 0}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {post.metrics?.comments || 0}
                            </div>
                            <div className="flex items-center gap-1">
                              <Share className="h-3 w-3" />
                              {post.metrics?.shares || 0}
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
                        {platform.premium ? (
                          <Badge 
                            variant="default"
                            className="bg-blue-600 cursor-pointer"
                            onClick={() => {
                              setCurrentTab("accounts");
                            }}
                          >
                            Premium
                          </Badge>
                        ) : (
                          <Badge 
                            variant={platform.connected ? "default" : "secondary"}
                            className="cursor-pointer"
                            onClick={() => {
                              setCurrentTab("accounts");
                            }}
                          >
                            {platform.connected ? "Connected" : "Connect"}
                          </Badge>
                        )}
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setCurrentTab("accounts")}
                    >
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
                <CardDescription>Detailed engagement metrics for your social media presence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platforms
                    .filter((p) => p.connected)
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
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setPostContent(post.content);
                                setSelectedPlatforms(post.platforms);
                                setIsScheduled(true);
                                setScheduledDate(post.scheduledFor?.replace(' ', 'T').slice(0, 16) || '');
                                setCurrentTab("compose");
                                // Delete the old post after copying it
                                handleDeletePost(post.id);
                              }}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Display platform indicators */}
                          {post.platforms.map(platformId => {
                            const platform = platforms.find(p => p.id === platformId);
                            if (platform) {
                              return (
                                <div key={platformId} className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${platform.color}`}></div>
                                  <span className={`text-xs font-medium`}>
                                    {platform.name} {platform.premium && "(Premium)"}
                                  </span>
                                </div>
                              );
                            }
                            return null;
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
                          {platform.connected ? `${platform.followers} followers` : "Not connected"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {platform.connected ? (
                        <>
                          <Badge variant="default" className="bg-blue-500">Premium</Badge>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            disabled={isConnecting}
                            onClick={() => handlePlatformConnection(platform.id)}
                          >
                            {isConnecting ? (
                              <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Disconnecting</>
                            ) : (
                              'Disconnect'
                            )}
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm" 
                          disabled={isConnecting}
                          onClick={() => handlePlatformConnection(platform.id)}
                        >
                          {isConnecting ? (
                            <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Connecting</>
                          ) : (
                            'Connect'
                          )}
                        </Button>
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
