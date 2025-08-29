"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import {
  Zap,
  Settings,
  Bell,
  User,
  Briefcase,
  Globe,
  MapPin,
  Calendar,
  Share2,
  Linkedin,
  Instagram,
  Loader2,
  ChevronLeft,
  Edit,
  Save,
  Plus,
  Trash,
  MessageSquare,
  BarChart3,
  Eye,
  Heart
} from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [editMode, setEditMode] = useState(false)
  const [saving, setSaving] = useState(false)
  
  // Mock user profile data
  const [profile, setProfile] = useState({
    name: "John Doe",
    jobTitle: "Marketing Manager",
    company: "SocialSync Corp",
    location: "San Francisco, CA",
    bio: "Digital marketing professional with over 8 years of experience in social media management and content strategy. Passionate about creating engaging content and building meaningful connections across platforms.",
    skills: ["Social Media Strategy", "Content Creation", "Analytics", "Campaign Management", "SEO/SEM", "Community Management"],
    experience: [
      {
        id: 1,
        title: "Marketing Manager",
        company: "SocialSync Corp",
        location: "San Francisco, CA",
        startDate: "January 2023",
        endDate: "Present",
        description: "Leading social media strategies and digital marketing campaigns for enterprise clients."
      },
      {
        id: 2,
        title: "Social Media Specialist",
        company: "TechGrowth Inc",
        location: "New York, NY",
        startDate: "March 2020",
        endDate: "December 2022",
        description: "Managed social media presence across multiple platforms for a growing tech startup."
      }
    ],
    education: [
      {
        id: 1,
        school: "University of California, Berkeley",
        degree: "Bachelor of Arts in Communications",
        fieldOfStudy: "Digital Marketing",
        startDate: "2016",
        endDate: "2020"
      }
    ]
  })
  
  const handleSaveProfile = () => {
    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setEditMode(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    }, 1000)
  }
  
  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now(),
      title: "New Position",
      company: "Company Name",
      location: "Location",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Job description"
    }
    
    setProfile({
      ...profile,
      experience: [...profile.experience, newExperience]
    })
  }
  
  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      school: "School Name",
      degree: "Degree",
      fieldOfStudy: "Field of Study",
      startDate: "Start Year",
      endDate: "End Year"
    }
    
    setProfile({
      ...profile,
      education: [...profile.education, newEducation]
    })
  }
  
  const handleRemoveExperience = (id: number) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter(exp => exp.id !== id)
    })
  }
  
  const handleRemoveEducation = (id: number) => {
    setProfile({
      ...profile,
      education: profile.education.filter(edu => edu.id !== id)
    })
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
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toast({
                  title: "Notifications",
                  description: "No new notifications",
                })}
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Badge variant="secondary">Pro Plan</Badge>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Profile Header */}
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <CardContent className="pt-0 relative">
              <div className="absolute -top-12 left-4 flex justify-between w-full pr-8">
                <div className="w-24 h-24 bg-purple-600 rounded-full border-4 border-white flex items-center justify-center text-white text-2xl font-medium">
                  JD
                </div>
                <div className="flex items-center gap-2">
                  {editMode ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={saving}
                        size="sm"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => setEditMode(true)}
                      size="sm"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="pt-14 pb-4">
                {editMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={profile.name} 
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input 
                          id="jobTitle" 
                          value={profile.jobTitle} 
                          onChange={(e) => setProfile({...profile, jobTitle: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input 
                          id="company" 
                          value={profile.company} 
                          onChange={(e) => setProfile({...profile, company: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          value={profile.location} 
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={profile.bio} 
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-gray-600">{profile.jobTitle} at {profile.company}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <MapPin className="h-4 w-4" /> 
                      {profile.location}
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-gray-700">{profile.bio}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Experience Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Experience</CardTitle>
                    <CardDescription>Your professional experience</CardDescription>
                  </div>
                  {editMode && (
                    <Button variant="outline" size="sm" onClick={handleAddExperience}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.experience.map((experience, index) => (
                    <div key={experience.id} className="space-y-3">
                      {index > 0 && <Separator className="my-4" />}
                      
                      {editMode ? (
                        <div className="space-y-4">
                          <div className="flex justify-end">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleRemoveExperience(experience.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`title-${experience.id}`}>Job Title</Label>
                              <Input 
                                id={`title-${experience.id}`} 
                                value={experience.title} 
                                onChange={(e) => {
                                  const updatedExperience = profile.experience.map(exp => {
                                    if (exp.id === experience.id) {
                                      return { ...exp, title: e.target.value };
                                    }
                                    return exp;
                                  });
                                  setProfile({...profile, experience: updatedExperience});
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`company-${experience.id}`}>Company</Label>
                              <Input 
                                id={`company-${experience.id}`} 
                                value={experience.company}
                                onChange={(e) => {
                                  const updatedExperience = profile.experience.map(exp => {
                                    if (exp.id === experience.id) {
                                      return { ...exp, company: e.target.value };
                                    }
                                    return exp;
                                  });
                                  setProfile({...profile, experience: updatedExperience});
                                }}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`location-${experience.id}`}>Location</Label>
                            <Input 
                              id={`location-${experience.id}`} 
                              value={experience.location}
                              onChange={(e) => {
                                const updatedExperience = profile.experience.map(exp => {
                                  if (exp.id === experience.id) {
                                    return { ...exp, location: e.target.value };
                                  }
                                  return exp;
                                });
                                setProfile({...profile, experience: updatedExperience});
                              }}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                              <Input 
                                id={`startDate-${experience.id}`} 
                                value={experience.startDate}
                                onChange={(e) => {
                                  const updatedExperience = profile.experience.map(exp => {
                                    if (exp.id === experience.id) {
                                      return { ...exp, startDate: e.target.value };
                                    }
                                    return exp;
                                  });
                                  setProfile({...profile, experience: updatedExperience});
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                              <Input 
                                id={`endDate-${experience.id}`} 
                                value={experience.endDate}
                                onChange={(e) => {
                                  const updatedExperience = profile.experience.map(exp => {
                                    if (exp.id === experience.id) {
                                      return { ...exp, endDate: e.target.value };
                                    }
                                    return exp;
                                  });
                                  setProfile({...profile, experience: updatedExperience});
                                }}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`description-${experience.id}`}>Description</Label>
                            <Textarea 
                              id={`description-${experience.id}`} 
                              value={experience.description}
                              onChange={(e) => {
                                const updatedExperience = profile.experience.map(exp => {
                                  if (exp.id === experience.id) {
                                    return { ...exp, description: e.target.value };
                                  }
                                  return exp;
                                });
                                setProfile({...profile, experience: updatedExperience});
                              }}
                              className="min-h-[80px]"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{experience.title}</h3>
                              <p className="text-gray-600">{experience.company} • {experience.location}</p>
                              <p className="text-sm text-gray-500">{experience.startDate} - {experience.endDate}</p>
                            </div>
                          </div>
                          <p className="text-gray-700">{experience.description}</p>
                        </>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* Education Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Your educational background</CardDescription>
                  </div>
                  {editMode && (
                    <Button variant="outline" size="sm" onClick={handleAddEducation}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.education.map((education, index) => (
                    <div key={education.id} className="space-y-3">
                      {index > 0 && <Separator className="my-4" />}
                      
                      {editMode ? (
                        <div className="space-y-4">
                          <div className="flex justify-end">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleRemoveEducation(education.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`school-${education.id}`}>School</Label>
                            <Input 
                              id={`school-${education.id}`} 
                              value={education.school}
                              onChange={(e) => {
                                const updatedEducation = profile.education.map(edu => {
                                  if (edu.id === education.id) {
                                    return { ...edu, school: e.target.value };
                                  }
                                  return edu;
                                });
                                setProfile({...profile, education: updatedEducation});
                              }}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                            <Input 
                              id={`degree-${education.id}`} 
                              value={education.degree}
                              onChange={(e) => {
                                const updatedEducation = profile.education.map(edu => {
                                  if (edu.id === education.id) {
                                    return { ...edu, degree: e.target.value };
                                  }
                                  return edu;
                                });
                                setProfile({...profile, education: updatedEducation});
                              }}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`fieldOfStudy-${education.id}`}>Field of Study</Label>
                            <Input 
                              id={`fieldOfStudy-${education.id}`} 
                              value={education.fieldOfStudy}
                              onChange={(e) => {
                                const updatedEducation = profile.education.map(edu => {
                                  if (edu.id === education.id) {
                                    return { ...edu, fieldOfStudy: e.target.value };
                                  }
                                  return edu;
                                });
                                setProfile({...profile, education: updatedEducation});
                              }}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`startDate-${education.id}`}>Start Year</Label>
                              <Input 
                                id={`startDate-${education.id}`} 
                                value={education.startDate}
                                onChange={(e) => {
                                  const updatedEducation = profile.education.map(edu => {
                                    if (edu.id === education.id) {
                                      return { ...edu, startDate: e.target.value };
                                    }
                                    return edu;
                                  });
                                  setProfile({...profile, education: updatedEducation});
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`endDate-${education.id}`}>End Year</Label>
                              <Input 
                                id={`endDate-${education.id}`} 
                                value={education.endDate}
                                onChange={(e) => {
                                  const updatedEducation = profile.education.map(edu => {
                                    if (edu.id === education.id) {
                                      return { ...edu, endDate: e.target.value };
                                    }
                                    return edu;
                                  });
                                  setProfile({...profile, education: updatedEducation});
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <h3 className="text-lg font-semibold">{education.school}</h3>
                            <p className="text-gray-600">{education.degree}, {education.fieldOfStudy}</p>
                            <p className="text-sm text-gray-500">{education.startDate} - {education.endDate}</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* Skills Section */}
              {editMode && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Add or remove skills from your profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (comma separated)</Label>
                      <Textarea 
                        id="skills" 
                        value={profile.skills.join(", ")} 
                        onChange={(e) => {
                          const skillsArray = e.target.value.split(",").map(skill => skill.trim()).filter(Boolean);
                          setProfile({...profile, skills: skillsArray});
                        }}
                        className="min-h-[80px]"
                        placeholder="e.g. Social Media Marketing, Content Creation, SEO"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Posts Tab */}
            <TabsContent value="posts" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                  <CardDescription>Posts you've shared on your platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Post 1 */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            JD
                          </div>
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-xs text-gray-500">Posted 2 days ago</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Instagram className="h-3 w-3" />
                          Instagram
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700">Excited to share our latest product launch! We've been working on this for months, and it's finally here. #innovation #technology</p>
                      
                      <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          1,250
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          89
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          14
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          23
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Post 2 */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            JD
                          </div>
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-xs text-gray-500">Posted 1 week ago</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Instagram className="h-3 w-3" />
                            Instagram
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            Reddit
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-700">Join our webinar next week on industry best practices. We'll be covering the latest trends and strategies for social media marketing in 2025.</p>
                      
                      <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          3,420
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          245
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          53
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          78
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">View All Posts</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Analytics</CardTitle>
                  <CardDescription>Your profile performance insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Profile Views */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Profile Views</h3>
                      <div className="h-[200px] bg-gray-50 rounded-md border flex items-center justify-center">
                        <BarChart3 className="h-24 w-24 text-gray-300" />
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-2xl font-bold">1,284</p>
                          <p className="text-sm text-gray-500">Total views</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">+12.5% from last month</Badge>
                      </div>
                    </div>
                    
                    {/* Engagement Metrics */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Engagement</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <p className="text-3xl font-bold">427</p>
                              <p className="text-sm text-gray-500 mt-1">Post Reactions</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <p className="text-3xl font-bold">98</p>
                              <p className="text-sm text-gray-500 mt-1">Comments</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <p className="text-3xl font-bold">156</p>
                              <p className="text-sm text-gray-500 mt-1">Shares</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
