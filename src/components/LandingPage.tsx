import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { MapPin, Star, Users, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onPageChange: (page: string) => void;
}

export function LandingPage({ onPageChange }: LandingPageProps) {
  const destinations = [
    {
      id: 1,
      name: 'Swiss Alps Adventure',
      location: 'Switzerland',
      image: 'https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMG1vdW50YWluc3xlbnwxfHx8fDE3NTkwNDA1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      price: '$2,450',
      duration: '7 days'
    },
    {
      id: 2,
      name: 'Tropical Paradise',
      location: 'Maldives',
      image: 'https://images.unsplash.com/photo-1702743599501-a821d0b38b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzU5MDI0MjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      price: '$3,200',
      duration: '5 days'
    },
    {
      id: 3,
      name: 'Urban Explorer',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1619297560564-f183f9b1fb6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMHVyYmFufGVufDF8fHx8MTc1ODk3NTQwNHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      price: '$1,890',
      duration: '6 days'
    },
    {
      id: 4,
      name: 'Safari Adventure',
      location: 'Kenya',
      image: 'https://images.unsplash.com/photo-1602410125631-7e736e36797c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTg5NTE1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      price: '$2,750',
      duration: '8 days'
    }
  ];

  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '50K+' },
    { icon: MapPin, label: 'Destinations', value: '200+' },
    { icon: Star, label: 'Reviews', value: '4.9/5' },
    { icon: Calendar, label: 'Years Experience', value: '15+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(49, 79, 64, 0.7), rgba(49, 79, 64, 0.7)), url('https://images.unsplash.com/photo-1582045150442-80f08d2bb49f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJvJTIwdHJhdmVsJTIwYWR2ZW50dXJlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc1OTA0MDUzMXww&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />
        
        <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Explore the World
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover amazing destinations, plan perfect trips, and create memories that last a lifetime
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onPageChange('register')}
              size="lg"
              className="hover-scale px-8 py-3 text-lg"
              style={{ backgroundColor: '#7EAF96' }}
            >
              Start Your Journey
            </Button>
            <Button
              onClick={() => onPageChange('login')}
              variant="outline"
              size="lg"
              className="hover-glow px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-[#314F40]"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon 
                    className="h-12 w-12 mx-auto mb-4"
                    style={{ color: '#7EAF96' }}
                  />
                  <div className="text-3xl font-bold mb-2" style={{ color: '#314F40' }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#314F40' }}>
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover our most loved travel experiences, carefully curated for the ultimate adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <Card 
                key={destination.id}
                className="overflow-hidden hover-scale cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onPageChange('register')}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{destination.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination.location}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold" style={{ color: '#314F40' }}>
                      {destination.price}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {destination.duration}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 text-center text-white"
        style={{ backgroundColor: '#314F40' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of travelers who trust us to make their dream trips come true
          </p>
          <Button
            onClick={() => onPageChange('register')}
            size="lg"
            className="hover-scale px-8 py-3 text-lg"
            style={{ backgroundColor: '#7EAF96' }}
          >
            Plan Your Trip Today
          </Button>
        </div>
      </section>
    </div>
  );
}