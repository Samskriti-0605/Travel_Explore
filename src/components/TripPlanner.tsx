import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Users, Calendar, DollarSign, Cloud, Sun, CloudRain, Car, Utensils, ShoppingBag, Bed } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TripPlannerProps {
  onPageChange: (page: string) => void;
  onPlanGenerated: (tripData: any) => void;
}

export function TripPlanner({ onPageChange, onPlanGenerated }: TripPlannerProps) {
  const [tripData, setTripData] = useState({
    destination: '',
    budget: '',
    people: '1',
    days: '3',
    accommodation: 'hotel',
    transportation: 'flight'
  });
  const [isPlanning, setIsPlanning] = useState(false);
  const [planResult, setPlanResult] = useState<any>(null);

  const popularDestinations = [
    'Paris, France', 'Tokyo, Japan', 'New York, USA', 'London, UK',
    'Rome, Italy', 'Barcelona, Spain', 'Dubai, UAE', 'Sydney, Australia',
    'Bangkok, Thailand', 'Amsterdam, Netherlands', 'Istanbul, Turkey', 'Bali, Indonesia'
  ];

  const mockWeatherData = {
    'Paris, France': { temp: 18, condition: 'Partly Cloudy', icon: Cloud },
    'Tokyo, Japan': { temp: 22, condition: 'Sunny', icon: Sun },
    'New York, USA': { temp: 15, condition: 'Rainy', icon: CloudRain },
    'London, UK': { temp: 12, condition: 'Cloudy', icon: Cloud },
    'Rome, Italy': { temp: 25, condition: 'Sunny', icon: Sun },
    'Barcelona, Spain': { temp: 24, condition: 'Sunny', icon: Sun },
    'Dubai, UAE': { temp: 35, condition: 'Sunny', icon: Sun },
    'Sydney, Australia': { temp: 20, condition: 'Partly Cloudy', icon: Cloud },
    'Bangkok, Thailand': { temp: 32, condition: 'Sunny', icon: Sun },
    'Amsterdam, Netherlands': { temp: 16, condition: 'Rainy', icon: CloudRain },
    'Istanbul, Turkey': { temp: 21, condition: 'Sunny', icon: Sun },
    'Bali, Indonesia': { temp: 28, condition: 'Partly Cloudy', icon: Cloud }
  };

  const generateItinerary = () => {
    const days = parseInt(tripData.days);
    const itinerary = [];
    
    for (let i = 1; i <= days; i++) {
      itinerary.push({
        day: i,
        title: `Day ${i}`,
        activities: [
          `Morning: Explore local attractions in ${tripData.destination}`,
          'Afternoon: Visit cultural sites and museums',
          'Evening: Enjoy local cuisine and nightlife'
        ],
        restaurants: [
          'Local Restaurant A',
          'Traditional Cuisine B',
          'Street Food Market C'
        ],
        accommodation: tripData.accommodation === 'hotel' ? 'Luxury Hotel Stay' : 'Cozy Vacation Rental'
      });
    }
    
    return itinerary;
  };

  const handlePlanTrip = async () => {
    if (!tripData.destination || !tripData.budget) {
      alert('Please fill in all required fields');
      return;
    }

    setIsPlanning(true);

    // Simulate API calls
    await new Promise(resolve => setTimeout(resolve, 2000));

    const weather = mockWeatherData[tripData.destination as keyof typeof mockWeatherData] || 
                   { temp: 20, condition: 'Pleasant', icon: Sun };

    const result = {
      ...tripData,
      weather,
      itinerary: generateItinerary(),
      estimatedCost: {
        accommodation: Math.floor(parseInt(tripData.budget) * 0.4),
        food: Math.floor(parseInt(tripData.budget) * 0.3),
        activities: Math.floor(parseInt(tripData.budget) * 0.2),
        transportation: Math.floor(parseInt(tripData.budget) * 0.1)
      },
      recommendations: {
        restaurants: [
          'The Local Bistro - Traditional cuisine',
          'Rooftop Dining - City views',
          'Street Food Market - Authentic flavors'
        ],
        activities: [
          'City Walking Tour',
          'Museum Visits',
          'Local Cultural Experience'
        ],
        shopping: [
          'Central Shopping District',
          'Local Artisan Markets',
          'Souvenir Shops'
        ]
      }
    };

    setPlanResult(result);
    setIsPlanning(false);

    // Save trip to localStorage
    const existingTrips = JSON.parse(localStorage.getItem('travelExplorerTrips') || '[]');
    const newTrip = {
      id: Date.now(),
      ...result,
      createdAt: new Date().toISOString()
    };
    existingTrips.push(newTrip);
    localStorage.setItem('travelExplorerTrips', JSON.stringify(existingTrips));

    onPlanGenerated(result);
  };

  const WeatherIcon = planResult?.weather?.icon || Sun;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#314F40' }}>
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Tell us your preferences and we'll create a personalized itinerary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Planning Form */}
          <Card className="animate-slide-in-left hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-6 w-6" style={{ color: '#7EAF96' }} />
                <span>Trip Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Select
                  value={tripData.destination}
                  onValueChange={(value) => setTripData(prev => ({ ...prev, destination: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularDestinations.map((dest) => (
                      <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="people">Number of People</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="people"
                      type="number"
                      min="1"
                      max="10"
                      value={tripData.people}
                      onChange={(e) => setTripData(prev => ({ ...prev, people: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="days">Number of Days</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="days"
                      type="number"
                      min="1"
                      max="30"
                      value={tripData.days}
                      onChange={(e) => setTripData(prev => ({ ...prev, days: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="budget">Budget (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="2000"
                    value={tripData.budget}
                    onChange={(e) => setTripData(prev => ({ ...prev, budget: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Accommodation</Label>
                  <Select
                    value={tripData.accommodation}
                    onValueChange={(value) => setTripData(prev => ({ ...prev, accommodation: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="airbnb">Airbnb</SelectItem>
                      <SelectItem value="hostel">Hostel</SelectItem>
                      <SelectItem value="resort">Resort</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Transportation</Label>
                  <Select
                    value={tripData.transportation}
                    onValueChange={(value) => setTripData(prev => ({ ...prev, transportation: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flight">Flight</SelectItem>
                      <SelectItem value="train">Train</SelectItem>
                      <SelectItem value="car">Car Rental</SelectItem>
                      <SelectItem value="bus">Bus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handlePlanTrip}
                disabled={isPlanning}
                className="w-full hover-scale"
                style={{ backgroundColor: '#314F40' }}
              >
                {isPlanning ? 'Planning Your Trip...' : 'Plan My Trip'}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {planResult && (
            <div className="space-y-6 animate-fade-in">
              {/* Weather Card */}
              <Card className="hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Current Weather</span>
                    <div className="flex items-center space-x-2">
                      <WeatherIcon className="h-6 w-6" style={{ color: '#7EAF96' }} />
                      <span>{planResult.weather.temp}°C</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{planResult.destination}</p>
                  <p className="text-gray-600 dark:text-gray-400">{planResult.weather.condition}</p>
                </CardContent>
              </Card>

              {/* Budget Breakdown */}
              <Card className="hover-glow">
                <CardHeader>
                  <CardTitle>Budget Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="flex items-center"><Bed className="h-4 w-4 mr-2" />Accommodation</span>
                      <span>${planResult.estimatedCost.accommodation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center"><Utensils className="h-4 w-4 mr-2" />Food & Dining</span>
                      <span>${planResult.estimatedCost.food}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center"><MapPin className="h-4 w-4 mr-2" />Activities</span>
                      <span>${planResult.estimatedCost.activities}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center"><Car className="h-4 w-4 mr-2" />Transportation</span>
                      <span>${planResult.estimatedCost.transportation}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${planResult.budget}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => onPageChange('timeline')}
                  variant="outline"
                  className="hover-glow"
                >
                  View Timeline
                </Button>
                <Button
                  onClick={() => onPageChange('booking')}
                  className="hover-scale"
                  style={{ backgroundColor: '#7EAF96' }}
                >
                  Book Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}