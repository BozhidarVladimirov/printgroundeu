'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Award, 
  Users, 
  Globe, 
  Clock, 
  Truck, 
  Leaf,
  CheckCircle,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { testimonials } from '@/data/products'

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Trusted Partner for Corporate Merchandise
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            For over 10 years, EU PrintGround has been helping businesses across Europe 
            create memorable branded merchandise that leaves lasting impressions.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {[
              { value: '10+', label: 'Years Experience' },
              { value: '1500+', label: 'Products' },
              { value: '1000+', label: 'Happy Clients' },
              { value: '27', label: 'EU Countries' },
              { value: '21+', label: 'Techniques' },
              { value: '2-8', label: 'Days Delivery' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2014, EU PrintGround began with a simple mission: make premium 
                  corporate merchandise accessible to businesses of all sizes across Europe.
                </p>
                <p>
                  What started as a small print shop in Sofia, Bulgaria has grown into a 
                  pan-European operation serving over 1,000 companies in all 27 EU member states.
                </p>
                <p>
                  Today, we offer over 1,500 products with 21+ printing techniques, from 
                  traditional screen printing to cutting-edge sublimation. Our commitment 
                  to quality, speed, and customer satisfaction has made us the trusted 
                  choice for Fortune 500 companies and growing startups alike.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Award, label: 'ISO 9001 Certified' },
                    { icon: Globe, label: 'EU-Wide Service' },
                    { icon: Clock, label: '24/7 Support' },
                    { icon: Leaf, label: 'Eco-Friendly Options' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description: 'Every product undergoes strict quality control. We never compromise on materials or craftsmanship.',
                icon: Award,
              },
              {
                title: 'Customer Success',
                description: 'Your success is our success. We go above and beyond to ensure every order exceeds expectations.',
                icon: Users,
              },
              {
                title: 'Sustainability',
                description: 'We offer eco-friendly products and printing methods to minimize environmental impact.',
                icon: Leaf,
              },
            ].map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EU PrintGround?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'No Minimum Order Fees', desc: 'Even small orders get bulk pricing' },
              { title: 'Free Design Support', desc: 'Our team helps perfect your artwork' },
              { title: 'Fast Production', desc: 'Standard 5-7 days, rush available' },
              { title: 'Satisfaction Guaranteed', desc: 'Full replacement or refund policy' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 bg-white rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-primary text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Testimonial Cards */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <Card className="bg-white/10 border-0 mx-auto max-w-2xl">
                      <CardContent className="pt-8 text-center">
                        <div className="flex justify-center gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                          ))}
                        </div>
                        <p className="text-white/90 mb-6 text-lg leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                        />
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-white/70">{testimonial.role}</p>
                        <p className="text-accent text-sm">{testimonial.company}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-accent w-8' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of European businesses who trust EU PrintGround for their 
            corporate merchandise needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalog">
              <Button size="lg">
                Browse Catalog
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/quote">
              <Button size="lg" variant="outline">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
