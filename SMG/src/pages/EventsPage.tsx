import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Filter, Search, Tag, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContextEnhanced';
import { useAuth } from '../context/AuthContext';
import { subscribeToEvents, Event as EventType } from '../services/eventsService';

export const EventsPage = () => {
  const { addRequest, currentUser } = useApp();
  const { firebaseUser, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successEventTitle, setSuccessEventTitle] = useState('');
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to real-time events updates from Firebase
  // Only subscribe when user is authenticated
  useEffect(() => {
    if (authLoading) {
      console.log('Waiting for auth to complete...');
      return;
    }

    if (!firebaseUser) {
      console.log('No authenticated user - skipping events subscription');
      setLoading(false);
      return;
    }

    console.log('Setting up events subscription for user:', firebaseUser.email);
    const unsubscribe = subscribeToEvents((fetchedEvents) => {
      console.log('Received events from Firebase:', fetchedEvents.length);
      setEvents(fetchedEvents);
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up events subscription');
      unsubscribe();
    };
  }, [firebaseUser, authLoading]);

  const categories = ['All', 'Company Event', 'Workshop', 'Sports', 'CSR'];
  const statuses = ['All', 'upcoming', 'ongoing', 'completed'];

  // Handle event registration
  const handleRegisterEvent = async (event: Event) => {
    if (!currentUser) {
      alert('Please log in to register for events');
      return;
    }

    if (registeredEvents.includes(event.id)) {
      alert('You have already registered for this event!');
      return;
    }

    try {
      await addRequest({
        requestType: 'general',
        status: 'pending',
        requestData: {
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.date,
          eventTime: event.time,
          eventLocation: event.location,
          requestTitle: `Event Registration: ${event.title}`,
          description: `Registration request for ${event.title} scheduled on ${event.date} at ${event.time}`
        },
        userId: currentUser.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      setRegisteredEvents([...registeredEvents, event.id]);
      setSuccessEventTitle(event.title);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Failed to register for event. Please try again.');
    }
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Normalize category for comparison
    const normalizeCategory = (cat: string) => cat.toLowerCase().replace(/\s+/g, '');
    const eventCategory = normalizeCategory(event.category);
    const filterCat = normalizeCategory(filterCategory);
    const matchesCategory = filterCategory === 'All' || eventCategory === filterCat;
    
    // Normalize status for comparison (handle both cases)
    const normalizeStatus = (status: string) => status.toLowerCase();
    const eventStatus = normalizeStatus(event.status);
    const filterStat = normalizeStatus(filterStatus);
    const matchesStatus = filterStatus === 'All' || eventStatus === filterStat;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    const badges: { [key: string]: string } = {
      upcoming: 'bg-blue-100 text-blue-700',
      ongoing: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700'
    };
    return badges[statusLower] || badges.upcoming;
  };

  if (loading || authLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0B4DA2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (!firebaseUser) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 text-lg">Please log in to view events</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <CheckCircle size={24} />
          <div>
            <p className="font-semibold">Registration Successful!</p>
            <p className="text-sm opacity-90">You have been registered for {successEventTitle}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Calendar size={32} /> Company Events
            </h1>
            <p className="text-[#87CEEB] opacity-90">Stay updated with all upcoming events, workshops, and celebrations</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#A3AED0] mb-1">Upcoming Events</p>
              <p className="text-3xl font-bold text-[#0B4DA2]">
                {events.filter(e => e.status === 'upcoming').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-[#0B4DA2]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#A3AED0] mb-1">Total Categories</p>
              <p className="text-3xl font-bold text-[#0B4DA2]">
                {categories.length - 1}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
              <Tag className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#A3AED0] mb-1">Events This Month</p>
              <p className="text-3xl font-bold text-[#0B4DA2]">
                {events.filter(e => {
                  const eventDate = new Date(e.date);
                  const now = new Date();
                  return eventDate.getMonth() === now.getMonth() && 
                         eventDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
              <Clock className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B4DA2] transition-colors"
              />
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B4DA2] transition-colors appearance-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:col-span-1">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0B4DA2] transition-colors appearance-none"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEvents.length > 0 ? (
          sortedEvents.map(event => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              {/* Event Poster/Image */}
              {event.imageUrl || event.image ? (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.imageUrl || event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <svg class="w-16 h-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusBadge(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1).toLowerCase()}
                    </span>
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#0B4DA2]">
                      {event.category}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <ImageIcon size={64} className="text-blue-300" />
                </div>
              )}

              {/* Event Header */}
              <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-4 text-white">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{event.title}</h3>
                <p className="text-[#87CEEB] text-xs line-clamp-2">{event.description}</p>
              </div>

              {/* Event Details */}
              <div className="p-4 space-y-3 flex-grow">
                <div className="flex items-start gap-2">
                  <Calendar className="text-[#0B4DA2] shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs font-semibold text-[#1B254B]">{formatDate(event.date)}</p>
                    <p className="text-[10px] text-[#A3AED0]">Event Date</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="text-[#0B4DA2] shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs font-semibold text-[#1B254B]">{event.time}</p>
                    <p className="text-[10px] text-[#A3AED0]">Start Time</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="text-[#0B4DA2] shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs font-semibold text-[#1B254B] line-clamp-1">{event.location || event.venue}</p>
                    <p className="text-[10px] text-[#A3AED0]">Venue</p>
                  </div>
                </div>

                {event.capacity && event.registered !== undefined && (
                  <div className="flex items-start gap-2">
                    <Users className="text-[#0B4DA2] shrink-0 mt-0.5" size={16} />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#1B254B]">
                        {event.registered} / {event.capacity} Registered
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                        <div 
                          className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] h-1.5 rounded-full transition-all"
                          style={{ width: `${Math.min((event.registered / event.capacity) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-[10px] text-[#A3AED0] mb-0.5">Organized by</p>
                  <p className="text-xs font-semibold text-[#1B254B]">{event.organizer}</p>
                </div>
              </div>

              {/* Action Button */}
              {event.status.toLowerCase() === 'upcoming' && (
                <div className="p-4 pt-0">
                  <button 
                    onClick={() => handleRegisterEvent(event)}
                    disabled={registeredEvents.includes(event.id)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      registeredEvents.includes(event.id)
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white hover:shadow-lg'
                    }`}
                  >
                    {registeredEvents.includes(event.id) ? (
                      <>
                        <CheckCircle size={18} />
                        Already Registered
                      </>
                    ) : (
                      'Register for Event'
                    )}
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
            <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 text-lg">No events found matching your filters</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};
