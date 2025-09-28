import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Mail, Calendar, MapPin, Plane, CreditCard, Edit, Trash2 } from 'lucide-react';

interface ProfilePageProps {
  onPageChange: (page: string) => void;
}

export function ProfilePage({ onPageChange }: ProfilePageProps) {
  const [user, setUser] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: ''
  });

  useEffect(() => {
    // Load user data
    const loadUserData = async () => {
      try {
        const userDataString = localStorage.getItem('travelExplorerUser');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const tripsData = JSON.parse(localStorage.getItem('travelExplorerTrips') || '[]');
        const bookingsData = JSON.parse(localStorage.getItem('travelExplorerBookings') || '[]');

        setUser(userData);
        setTrips(tripsData);
        setBookings(bookingsData);
        
        if (userData) {
          setEditData({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            bio: userData.bio || ''
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      ...editData
    };
    setUser(updatedUser);
    localStorage.setItem('travelExplorerUser', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const deleteTrip = (tripId: number) => {
    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    setTrips(updatedTrips);
    localStorage.setItem('travelExplorerTrips', JSON.stringify(updatedTrips));
  };

  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTripStats = () => {
    const totalSpent = bookings.reduce((sum, booking) => sum + (parseInt(booking.trip?.budget) || 0), 0);
    const visitedCountries = new Set(trips.map(trip => trip.destination?.split(',')[1]?.trim())).size;
    const totalDays = trips.reduce((sum, trip) => sum + parseInt(trip.days), 0);

    return {
      totalTrips: trips.length,
      totalSpent,
      visitedCountries,
      totalDays
    };
  };

  const stats = getTripStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 mx-auto mb-4" style={{ borderColor: '#314F40' }}></div>
          <h1 className="text-2xl font-bold" style={{ color: '#314F40' }}>
            Loading Profile...
          </h1>
        </div>
      </div>
    );
  }

  if (!user || !user.email) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#314F40' }}>
            Access Denied
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Please log in to access your profile
          </p>
          <Button
            onClick={() => onPageChange('login')}
            className="hover-scale"
            style={{ backgroundColor: '#314F40' }}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8 animate-fade-in-up hover-glow">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback 
                  className="text-2xl text-white"
                  style={{ backgroundColor: '#314F40' }}
                >
                  {getInitials(user.name || 'U')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Full Name"
                    />
                    <Input
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email"
                    />
                    <Input
                      value={editData.phone}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Phone"
                    />
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSaveProfile}
                        size="sm"
                        style={{ backgroundColor: '#7EAF96' }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {user.email}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Joined {formatDate(user.joinDate)}
                      </span>
                    </div>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="mt-4 hover-glow"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold" style={{ color: '#314F40' }}>
                    {stats.totalTrips}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Trips</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: '#314F40' }}>
                    {stats.visitedCountries}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: '#314F40' }}>
                    {stats.totalDays}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: '#314F40' }}>
                    ${stats.totalSpent.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Spent</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="trips" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Trips Tab */}
          <TabsContent value="trips" className="space-y-6">
            {trips.length === 0 ? (
              <Card className="hover-glow">
                <CardContent className="p-12 text-center">
                  <Plane className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-medium mb-2">No trips planned yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start planning your next adventure today!
                  </p>
                  <Button
                    onClick={() => onPageChange('planner')}
                    className="hover-scale"
                    style={{ backgroundColor: '#314F40' }}
                  >
                    Plan Your First Trip
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip, index) => (
                  <Card 
                    key={trip.id} 
                    className="hover-glow animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{trip.destination}</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(trip.createdAt)}
                          </p>
                        </div>
                        <Button
                          onClick={() => deleteTrip(trip.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            {trip.days} days
                          </span>
                          <span className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2" />
                            {trip.people} travelers
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold" style={{ color: '#314F40' }}>
                            ${trip.budget}
                          </span>
                          <Badge variant="secondary">
                            {trip.weather?.condition || 'Planned'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            {bookings.length === 0 ? (
              <Card className="hover-glow">
                <CardContent className="p-12 text-center">
                  <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-medium mb-2">No bookings yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Book your first trip to see it here
                  </p>
                  <Button
                    onClick={() => onPageChange('planner')}
                    className="hover-scale"
                    style={{ backgroundColor: '#314F40' }}
                  >
                    Plan & Book a Trip
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking, index) => (
                  <Card 
                    key={booking.id}
                    className="hover-glow animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <h3 className="text-xl font-bold">{booking.trip?.destination}</h3>
                            <Badge 
                              variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                              style={{ backgroundColor: booking.status === 'confirmed' ? '#7EAF96' : undefined }}
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Booking ID</span>
                              <p className="font-medium">{booking.id}</p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Travel Dates</span>
                              <p className="font-medium">
                                {new Date(booking.startDate).toLocaleDateString()} - 
                                {new Date(booking.endDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Travelers</span>
                              <p className="font-medium">{booking.trip?.people} people</p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                              <p className="font-medium">${booking.totalAmount}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Booked on {formatDate(booking.bookingDate)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Email Preferences</Label>
                    <div className="space-y-2 mt-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Trip confirmations</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Travel reminders</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Marketing emails</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label>Privacy Settings</Label>
                    <div className="space-y-2 mt-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Make my trips visible to friends</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Share travel stats publicly</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      localStorage.removeItem('travelExplorerUser');
                      localStorage.removeItem('travelExplorerAuth');
                      onPageChange('home');
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}