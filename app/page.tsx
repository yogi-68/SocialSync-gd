"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Zap,
  Users,
  BarChart3,
  Clock,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "One-Click Multi-Platform Posting",
      description: "Write once, post everywhere. Reach all your audiences simultaneously across 10+ social platforms.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Smart Scheduling",
      description:
        "Schedule posts for optimal engagement times. Our AI suggests the best times to post for each platform.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description:
        "Track performance across all platforms with detailed insights, engagement metrics, and growth analytics.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description:
        "Work together with your team. Assign roles, approve content, and manage multiple brands from one dashboard.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level security with 2FA, SSO, and compliance with GDPR, SOC 2, and other industry standards.",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "AI Content Assistant",
      description: "Get content suggestions, hashtag recommendations, and optimal posting times powered by AI.",
    },
  ]

  const platforms = [
    { name: "Twitter/X", icon: <Twitter className="h-8 w-8" />, color: "text-black" },
    { name: "Facebook", icon: <Facebook className="h-8 w-8" />, color: "text-blue-600" },
    { name: "Instagram", icon: <Instagram className="h-8 w-8" />, color: "text-pink-500" },
    { name: "LinkedIn", icon: <Linkedin className="h-8 w-8" />, color: "text-blue-700" },
    { name: "YouTube", icon: <Youtube className="h-8 w-8" />, color: "text-red-600" },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      content: "SocialSync Pro saved us 15 hours per week. Our engagement increased by 300% across all platforms.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Content Creator",
      company: "@mikecreates",
      content: "Finally, a tool that actually works! Managing 6 social accounts is now effortless.",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      role: "Agency Owner",
      company: "Digital Growth Co.",
      content: "We manage 50+ client accounts with ease. The ROI is incredible - 10x our investment.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold">SocialSync Pro</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900">
                Reviews
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/dashboard">
                <Button>Start Free Trial</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link href="#features" className="text-gray-600">
                  Features
                </Link>
                <Link href="#pricing" className="text-gray-600">
                  Pricing
                </Link>
                <Link href="#testimonials" className="text-gray-600">
                  Reviews
                </Link>
                <Link href="/login" className="text-gray-600">
                  Login
                </Link>
                <Link href="/dashboard">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4" variant="secondary">
            🚀 Join 50,000+ businesses already using SocialSync Pro
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Post to <span className="text-purple-600">All Social Media</span>
            <br />
            Platforms at Once
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Save 15+ hours per week managing social media. Write once, post everywhere. Get advanced analytics, team
            collaboration, and AI-powered insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-80"
              />
              <Link href="/dashboard">
                <Button size="lg">
                  Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-8">
            ✅ 14-day free trial • ✅ No credit card required • ✅ Cancel anytime
          </p>

          {/* Platform Icons */}
          <div className="flex justify-center items-center gap-8 opacity-60">
            {platforms.map((platform) => (
              <div key={platform.name} className={`${platform.color}`}>
                {platform.icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Dominate Social Media
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to save time, increase engagement, and grow your audience across all platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs. Upgrade or downgrade anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold text-gray-900">Free</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">3 social accounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">10 posts per month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Basic analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Email support</span>
                  </div>
                </div>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-purple-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-500">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-4xl font-bold text-gray-900">
                  $29<span className="text-lg text-gray-500">/mo</span>
                </div>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">10 social accounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Unlimited posts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Post scheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
                <Link href="/dashboard">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900">
                  $99<span className="text-lg text-gray-500">/mo</span>
                </div>
                <CardDescription>For agencies and large teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Unlimited accounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Team collaboration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">White-label reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">API access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Dedicated support</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by 50,000+ Businesses</h2>
            <p className="text-xl text-gray-600">See what our customers are saying about SocialSync Pro</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Social Media Strategy?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses saving time and growing their audience with SocialSync Pro
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-purple-600">
              Start Your Free Trial Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-sm mt-4 opacity-75">14-day free trial • No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-purple-400" />
                <span className="text-lg font-bold">SocialSync Pro</span>
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate social media management platform for businesses of all sizes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
                <div>Integrations</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Help Center</div>
                <div>Documentation</div>
                <div>Status</div>
                <div>Privacy Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 SocialSync Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
