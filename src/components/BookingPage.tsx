import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Calendar, User, Mail, Phone, CreditCard, Download, ArrowLeft, CheckCircle } from 'lucide-react';

interface BookingPageProps {
  onPageChange: (page: string) => void;
}

export function BookingPage({ onPageChange }: BookingPageProps) {
  const [currentTrip, setCurrentTrip] = useState<any>(null);
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    accommodation: '',
    transport: '',
    paymentMethod: '',
    specialRequests: '',
    agreeTerms: false,
    newsletter: false
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    // Get the latest trip and user data
    const trips = JSON.parse(localStorage.getItem('travelExplorerTrips') || '[]');
    const user = JSON.parse(localStorage.getItem('travelExplorerUser') || '{}');
    
    if (trips.length > 0) {
      setCurrentTrip(trips[trips.length - 1]);
      // Pre-fill user data
      setBookingData(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        accommodation: trips[trips.length - 1].accommodation || '',
        transport: trips[trips.length - 1].transportation || ''
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors: any = {};

    if (!bookingData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!bookingData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!bookingData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(bookingData.email)) newErrors.email = 'Invalid email format';
    if (!bookingData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!bookingData.startDate) newErrors.startDate = 'Start date is required';
    if (!bookingData.endDate) newErrors.endDate = 'End date is required';
    if (!bookingData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    if (!bookingData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 3000));

    const newBookingId = `TXP${Date.now().toString().slice(-6)}`;
    setBookingId(newBookingId);

    // Save booking to localStorage
    const booking = {
      id: newBookingId,
      ...bookingData,
      trip: currentTrip,
      totalAmount: currentTrip?.budget || 0,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };

    const existingBookings = JSON.parse(localStorage.getItem('travelExplorerBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('travelExplorerBookings', JSON.stringify(existingBookings));

    setIsSubmitting(false);
    setBookingConfirmed(true);
  };

  const downloadTicket = () => {
    // Create a simple text ticket
    const ticket = `
TRAVEL EXPLORER BOOKING CONFIRMATION
====================================

Booking ID: ${bookingId}
Name: ${bookingData.firstName} ${bookingData.lastName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

TRIP DETAILS:
Destination: ${currentTrip?.destination || 'N/A'}
Dates: ${bookingData.startDate} to ${bookingData.endDate}
Duration: ${currentTrip?.days || 'N/A'} days
Travelers: ${currentTrip?.people || 'N/A'}
Total Amount: $${currentTrip?.budget || 'N/A'}

ACCOMMODATION: ${bookingData.accommodation}
TRANSPORTATION: ${bookingData.transport}

Special Requests: ${bookingData.specialRequests || 'None'}

Thank you for choosing Travel Explorer!
For support, contact us at support@travelexplorer.com
    `.trim();

    const blob = new Blob([ticket], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travel-ticket-${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!currentTrip) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#314F40' }}>
            No Trip Selected
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Please plan a trip first before booking
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

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center animate-fade-in-up hover-glow">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 mx-auto mb-6" style={{ color: '#7EAF96' }} />
              <h1 className="text-3xl font-bold mb-4" style={{ color: '#314F40' }}>
                Booking Confirmed!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                Your trip to {currentTrip.destination} has been successfully booked
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <p className="font-medium">Booking ID: <span className="font-bold">{bookingId}</span></p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  A confirmation email has been sent to {bookingData.email}
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  onClick={downloadTicket}
                  className="hover-scale"
                  style={{ backgroundColor: '#7EAF96' }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Ticket
                </Button>
                <Button
                  onClick={() => onPageChange('profile')}
                  variant="outline"
                  className="hover-glow"
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={() => onPageChange('timeline')}
          variant="ghost"
          className="mb-4 hover-glow"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Timeline
        </Button>

        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#314F40' }}>
            Complete Your Booking
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            You're just one step away from your dream trip to {currentTrip.destination}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-in-left hover-glow">
              <CardHeader>
                <CardTitle>Booking Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="firstName"
                            value={bookingData.firstName}
                            onChange={(e) => setBookingData(prev => ({ ...prev, firstName: e.target.value }))}
                            className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={bookingData.lastName}
                          onChange={(e) => setBookingData(prev => ({ ...prev, lastName: e.target.value }))}
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                            className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            value={bookingData.phone}
                            onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                            className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Travel Dates */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Travel Dates</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="startDate"
                            type="date"
                            value={bookingData.startDate}
                            onChange={(e) => setBookingData(prev => ({ ...prev, startDate: e.target.value }))}
                            className={`pl-10 ${errors.startDate ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={bookingData.endDate}
                          onChange={(e) => setBookingData(prev => ({ ...prev, endDate: e.target.value }))}
                          className={errors.endDate ? 'border-red-500' : ''}
                        />
                        {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Travel Preferences</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Accommodation</Label>
                        <Select
                          value={bookingData.accommodation}
                          onValueChange={(value) => setBookingData(prev => ({ ...prev, accommodation: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select accommodation" />
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
                          value={bookingData.transport}
                          onValueChange={(value) => setBookingData(prev => ({ ...prev, transport: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select transportation" />
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
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                    <Select
                      value={bookingData.paymentMethod}
                      onValueChange={(value) => setBookingData(prev => ({ ...prev, paymentMethod: value }))}
                    >
                      <SelectTrigger className={errors.paymentMethod ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="debit">Debit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requirements or requests..."
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                    />
                  </div>

                  {/* Terms and Newsletter */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={bookingData.agreeTerms}
                        onCheckedChange={(checked) => setBookingData(prev => ({ ...prev, agreeTerms: !!checked }))}
                      />
                      <Label htmlFor="agreeTerms" className={errors.agreeTerms ? 'text-red-500' : ''}>
                        I agree to the terms and conditions *
                      </Label>
                    </div>
                    {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={bookingData.newsletter}
                        onCheckedChange={(checked) => setBookingData(prev => ({ ...prev, newsletter: !!checked }))}
                      />
                      <Label htmlFor="newsletter">
                        Subscribe to newsletter for travel updates
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full hover-scale"
                    style={{ backgroundColor: '#314F40' }}
                  >
                    {isSubmitting ? 'Processing Booking...' : 'Complete Booking'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-4 animate-fade-in hover-glow">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">{currentTrip.destination}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentTrip.days} days • {currentTrip.people} travelers
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Base Package</span>
                    <span>${currentTrip.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total Amount</span>
                    <span>${currentTrip.budget}</span>
                  </div>
                </div>

                <div className="pt-4 border-t text-sm text-gray-600 dark:text-gray-400">
                  <p>• Free cancellation up to 24 hours before departure</p>
                  <p>• 24/7 customer support</p>
                  <p>• Best price guarantee</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}