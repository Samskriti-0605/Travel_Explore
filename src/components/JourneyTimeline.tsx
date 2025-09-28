import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Clock, Utensils, Camera, ShoppingBag, Star, ArrowLeft } from 'lucide-react';

interface JourneyTimelineProps {
  onPageChange: (page: string) => void;
}

export function JourneyTimeline({ onPageChange }: JourneyTimelineProps) {
  const [currentTrip, setCurrentTrip] = useState<any>(null);
  const [visibleDays, setVisibleDays] = useState<number[]>([]);

  useEffect(() => {
    // Get the latest trip from localStorage
    const trips = JSON.parse(localStorage.getItem('travelExplorerTrips') || '[]');
    if (trips.length > 0) {
      setCurrentTrip(trips[trips.length - 1]);
    }

    // Animate timeline items
    const timer = setTimeout(() => {
      if (trips.length > 0) {
        const days = parseInt(trips[trips.length - 1].days);
        for (let i = 1; i <= days; i++) {
          setTimeout(() => {
            setVisibleDays(prev => [...prev, i]);
          }, i * 200);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!currentTrip) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#314F40' }}>
            No Trip Planned Yet
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Create a trip first to see your personalized timeline
          </p>
          <Button
            onClick={() => onPageChange('planner')}
            className="hover-scale"
            style={{ backgroundColor: '#314F40' }}
          >
            Plan a Trip
          </Button>
        </div>
      </div>
    );
  }

  const timelineActivities = [
    {
      time: '09:00',
      activity: 'Morning exploration and sightseeing',
      icon: Camera,
      category: 'sightseeing'
    },
    {
      time: '12:30',
      activity: 'Lunch at local restaurant',
      icon: Utensils,
      category: 'dining'
    },
    {
      time: '14:00',
      activity: 'Cultural site visits',
      icon: MapPin,
      category: 'culture'
    },
    {
      time: '16:30',
      activity: 'Shopping and local markets',
      icon: ShoppingBag,
      category: 'shopping'
    },
    {
      time: '19:00',
      activity: 'Evening dining and entertainment',
      icon: Star,
      category: 'entertainment'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      sightseeing: '#314F40',
      dining: '#7EAF96',
      culture: '#8B5A3C',
      shopping: '#6B73FF',
      entertainment: '#FF6B6B'
    };
    return colors[category] || '#314F40';
  };

  const days = parseInt(currentTrip.days);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            onClick={() => onPageChange('planner')}
            variant="ghost"
            className="mb-4 hover-glow"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Planner
          </Button>

          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#314F40' }}>
              Your Journey Timeline
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              {currentTrip.destination}
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
              <span>{currentTrip.people} {parseInt(currentTrip.people) > 1 ? 'travelers' : 'traveler'}</span>
              <span>•</span>
              <span>{currentTrip.days} days</span>
              <span>•</span>
              <span>${currentTrip.budget} budget</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div 
            className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-[#314F40] to-[#7EAF96]"
            style={{ height: `${days * 600}px` }}
          />

          {/* Timeline items */}
          <div className="space-y-12">
            {Array.from({ length: days }, (_, index) => {
              const dayNumber = index + 1;
              const isVisible = visibleDays.includes(dayNumber);
              
              return (
                <div
                  key={dayNumber}
                  className={`relative transition-all duration-500 ${
                    isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Day marker */}
                  <div 
                    className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold z-10"
                    style={{ backgroundColor: '#314F40' }}
                  >
                    {dayNumber}
                  </div>

                  {/* Day content */}
                  <div className="ml-16">
                    <Card className="hover-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Day {dayNumber}</span>
                          <Badge variant="secondary">
                            {new Date(Date.now() + (dayNumber - 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {timelineActivities.map((activity, actIndex) => {
                            const Icon = activity.icon;
                            return (
                              <div
                                key={actIndex}
                                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow"
                              >
                                <div 
                                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: getCategoryColor(activity.category) }}
                                >
                                  <Icon className="h-5 w-5 text-white" />
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium">{activity.activity}</span>
                                    <span className="text-sm text-gray-500 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {activity.time}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Personalized recommendations based on your preferences and local insights
                                  </p>
                                </div>
                              </div>
                            );
                          })}

                          {/* Accommodation info */}
                          <div className="mt-6 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                            <h4 className="font-medium mb-2 flex items-center">
                              <MapPin className="h-4 w-4 mr-2" style={{ color: '#314F40' }} />
                              Accommodation
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {currentTrip.accommodation === 'hotel' ? 'Luxury Hotel Stay' : 
                               currentTrip.accommodation === 'airbnb' ? 'Cozy Airbnb Apartment' :
                               currentTrip.accommodation === 'hostel' ? 'Modern Hostel' : 'Resort Experience'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-12 text-center space-x-4">
          <Button
            onClick={() => onPageChange('booking')}
            className="hover-scale"
            style={{ backgroundColor: '#7EAF96' }}
          >
            Book This Trip
          </Button>
          <Button
            onClick={() => onPageChange('planner')}
            variant="outline"
            className="hover-glow"
          >
            Modify Trip
          </Button>
        </div>

        {/* Trip summary */}
        <Card className="mt-8 hover-glow">
          <CardHeader>
            <CardTitle>Trip Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold" style={{ color: '#314F40' }}>
                  {currentTrip.days}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#314F40' }}>
                  {currentTrip.people}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Travelers</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#314F40' }}>
                  ${currentTrip.budget}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Budget</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#314F40' }}>
                  {currentTrip.weather?.temp}°C
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Weather</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}