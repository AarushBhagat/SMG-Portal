import { useState, useEffect } from 'react';
import { PartyPopper, Calendar, Users, MapPin, Plus, Edit, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { FileUpload } from '../../../components/FileUpload';
import { useAuth } from '../../../context/AuthContext';
import { 
  addEvent, 
  updateEvent, 
  deleteEvent, 
  subscribeToEvents,
  uploadEventImage,
  Event 
} from '../../../services/eventsService';

export const EventsManagement = () => {
  const { user, firebaseUser, loading: authLoading } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    organizer: '',
    category: 'Company' as Event['category'],
    image: '',
    capacity: 0
  });
  const [selectedImage, setSelectedImage] = useState<File[]>([]);

  // Subscribe to real-time events updates
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

    console.log('Setting up events subscription for admin:', firebaseUser.email);
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

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        // Events will be updated automatically via subscription
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      organizer: event.organizer,
      category: event.category,
      image: event.image,
      capacity: event.capacity || 0
    });
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!user) {
      alert('User not authenticated');
      return;
    }

    // Validation
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.venue) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);

    try {
      let imageUrl = formData.image;

      // Upload image if a new file was selected
      if (selectedImage.length > 0) {
        imageUrl = await uploadEventImage(selectedImage[0], editingEvent?.id);
      }

      if (editingEvent) {
        // Update existing event
        await updateEvent(editingEvent.id, {
          ...formData,
          image: imageUrl,
          venue: formData.venue,
          capacity: formData.capacity || 0,
          registered: editingEvent.registered || 0
        });
      } else {
        // Create new event
        await addEvent({
          ...formData,
          image: imageUrl,
          venue: formData.venue,
          location: formData.venue,
          status: 'upcoming',
          capacity: formData.capacity || 0,
          registered: 0,
          participants: 0,
          registeredUsers: [],
          createdBy: user.uid || user.id,
          createdByName: user.name || user.fullName || 'Unknown',
          isActive: true
        });
      }

      // Reset form
      setShowAddModal(false);
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        organizer: '',
        category: 'Company',
        image: '',
        capacity: 0
      });
      setSelectedImage([]);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const categoryColors = {
    Company: 'from-blue-500 to-blue-600',
    Department: 'from-purple-500 to-purple-600',
    Social: 'from-pink-500 to-pink-600',
    Training: 'from-green-500 to-green-600'
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0B4DA2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Events Management</h1>
            <p className="text-white/80">Share and manage company events on the portal</p>
          </div>
          <button
            onClick={() => {
              setEditingEvent(null);
              setFormData({
                title: '',
                description: '',
                date: '',
                time: '',
                venue: '',
                organizer: '',
                category: 'Company',
                image: ''
              });
              setShowAddModal(true);
            }}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
          >
            <Plus size={20} />
            Add New Event
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <PartyPopper className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-[#1B254B] mb-1">{events.length}</h3>
          <p className="text-sm text-gray-500 font-medium">Total Events</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-yellow-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <Calendar className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-[#1B254B] mb-1">{events.filter(e => e.status === 'Upcoming').length}</h3>
          <p className="text-sm text-gray-500 font-medium">Upcoming Events</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <PartyPopper className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-[#1B254B] mb-1">{events.filter(e => e.status === 'Ongoing').length}</h3>
          <p className="text-sm text-gray-500 font-medium">Ongoing Events</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-[#1B254B] mb-1">
            {events.reduce((sum, e) => sum + e.participants, 0)}
          </h3>
          <p className="text-sm text-gray-500 font-medium">Total Participants</p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
            <div className="relative h-48 overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                event.status === 'Upcoming' ? 'bg-yellow-500 text-white' :
                event.status === 'Ongoing' ? 'bg-green-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {event.status}
              </div>
              <div className="absolute bottom-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-gray-800`}>
                  {event.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-[#1B254B] mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-[#0B4DA2]" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-[#0B4DA2]" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} className="text-[#0B4DA2]" />
                  <span>{event.participants} participants • {event.organizer}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(event)}
                  className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <h2 className="text-2xl font-bold">{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#1B254B] mb-2">Event Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Annual Day 2025"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B254B] mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Event description..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1B254B] mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1B254B] mb-2">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 6:00 PM - 10:00 PM"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1B254B] mb-2">Venue</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="e.g., Main Auditorium"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1B254B] mb-2">Capacity (Optional)</label>
                  <input
                    type="number"
                    value={formData.capacity || ''}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                    placeholder="e.g., 500"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B254B] mb-2">Organizer</label>
                <input
                  type="text"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  placeholder="e.g., HR Department"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B254B] mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Event['category'] })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Company">Company</option>
                  <option value="Department">Department</option>
                  <option value="Social">Social</option>
                  <option value="Training">Training</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B254B] mb-2">Event Image</label>
                <FileUpload
                  onFileSelect={(files) => {
                    setSelectedImage(files);
                    if (files.length > 0) {
                      const imageUrl = URL.createObjectURL(files[0]);
                      setFormData({ ...formData, image: imageUrl });
                    }
                  }}
                  selectedFiles={selectedImage}
                  onRemoveFile={() => {
                    setSelectedImage([]);
                    setFormData({ ...formData, image: '' });
                  }}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingEvent ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      {editingEvent ? 'Update Event' : 'Add Event'}
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEvent(null);
                    setSelectedImage([]);
                  }}
                  disabled={saving}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
