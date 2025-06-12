"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, Zap, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "3 social media accounts",
        "10 posts per month",
        "Basic analytics",
        "Email support",
        "Post scheduling",
      ],
      limitations: ["Limited to 3 platforms", "Basic reporting only", "No team collaboration"],
      popular: false,
      cta: "Get Started Free",
    },
    {
      name: "Professional",
      description: "For growing businesses and content creators",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "10 social media accounts",
        "Unlimited posts",
        "Advanced analytics",
        "Priority support",
        "Post scheduling",
        "Content calendar",
        "Hashtag suggestions",
        "Best time to post insights",
      ],
      limitations: ["Limited team members (3)"],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      description: "For agencies and large organizations",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        "Unlimited social accounts",
        "Unlimited posts",
        "Advanced analytics & reporting",
        "Dedicated account manager",
        "Priority support",
        "Team collaboration",
        "White-label reports",
        "API access",
        "Custom integrations",
        "Advanced security (SSO, 2FA)",
        "Content approval workflow",
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales",
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "What social media platforms do you support?",
      answer:
        "We support all major platforms including Twitter/X, Facebook, Instagram, LinkedIn, TikTok, YouTube, Pinterest, and more.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 14-day free trial for all paid plans. No credit card required to start.",
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Absolutely. You can cancel your subscription at any time from your account settings. No cancellation fees.",
    },
    {
      question: "Do you offer discounts for nonprofits?",
      answer:
        "Yes, we offer special pricing for qualified nonprofits and educational institutions. Contact us for details.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold">SocialSync Pro</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/dashboard">
                <Button>Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your social media management needs. Start free, upgrade when you're ready.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!isYearly ? "text-gray-900 font-medium" : "text-gray-500"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm ${isYearly ? "text-gray-900 font-medium" : "text-gray-500"}`}>Yearly</span>
            <Badge variant="secondary" className="ml-2">
              Save 20%
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-2 border-purple-500 shadow-xl" : "border shadow-lg"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">{plan.description}</CardDescription>

                  <div className="mb-4">
                    <div className="text-4xl font-bold text-gray-900">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      <span className="text-lg text-gray-500 font-normal">
                        {plan.monthlyPrice === 0 ? "" : isYearly ? "/year" : "/month"}
                      </span>
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-gray-500">
                        ${Math.round(plan.yearlyPrice / 12)}/month billed annually
                      </div>
                    )}
                  </div>

                  <Link href={plan.name === "Enterprise" ? "/contact" : "/dashboard"}>
                    <Button
                      className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">What's included:</h4>
                    <div className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Limitations:</h4>
                      <div className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <div key={limitIndex} className="flex items-center gap-2">
                            <X className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare All Features</h2>
            <p className="text-xl text-gray-600">See exactly what's included in each plan</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Features</th>
                    <th className="text-center p-4 font-medium">Starter</th>
                    <th className="text-center p-4 font-medium">Professional</th>
                    <th className="text-center p-4 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4">Social Media Accounts</td>
                    <td className="text-center p-4">3</td>
                    <td className="text-center p-4">10</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-4">Monthly Posts</td>
                    <td className="text-center p-4">10</td>
                    <td className="text-center p-4">Unlimited</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-4">Analytics & Reporting</td>
                    <td className="text-center p-4">Basic</td>
                    <td className="text-center p-4">Advanced</td>
                    <td className="text-center p-4">Advanced + White-label</td>
                  </tr>
                  <tr>
                    <td className="p-4">Team Members</td>
                    <td className="text-center p-4">1</td>
                    <td className="text-center p-4">3</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-4">API Access</td>
                    <td className="text-center p-4">
                      <X className="h-4 w-4 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <X className="h-4 w-4 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">Priority Support</td>
                    <td className="text-center p-4">
                      <X className="h-4 w-4 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing and plans</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of businesses already using SocialSync Pro</p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-purple-600">
              Start Your Free Trial
            </Button>
          </Link>
          <p className="text-sm mt-4 opacity-75">14-day free trial • No credit card required • Cancel anytime</p>
        </div>
      </section>
    </div>
  )
}
