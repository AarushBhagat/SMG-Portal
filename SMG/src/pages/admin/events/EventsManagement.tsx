import { useState } from 'react';
import { PartyPopper, Calendar, Users, MapPin, Plus, Edit, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { FileUpload } from '../../../components/FileUpload';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  participants: number;
  category: 'Company' | 'Department' | 'Social' | 'Training';
  image: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export const EventsManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    organizer: '',
    category: 'Company' as Event['category'],
    image: ''
  });
  const [selectedImage, setSelectedImage] = useState<File[]>([]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 'EVT001',
      title: 'Annual Day 2025',
      description: 'Celebration of company achievements and employee recognition',
      date: '15 Jan 2026',
      time: '6:00 PM - 10:00 PM',
      venue: 'Main Auditorium',
      organizer: 'HR Department',
      participants: 500,
      category: 'Company',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
      status: 'Upcoming'
    },
    {
      id: 'EVT002',
      title: 'Safety Training Workshop',
      description: 'Comprehensive workplace safety and emergency procedures training',
      date: '5 Jan 2026',
      time: '10:00 AM - 2:00 PM',
      venue: 'Training Hall',
      organizer: 'Safety Department',
      participants: 150,
      category: 'Training',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      status: 'Upcoming'
    },
    {
      id: 'EVT003',
      title: 'Sports Day',
      description: 'Inter-department sports competition and team building activities',
      date: '28 Dec 2025',
      time: '8:00 AM - 5:00 PM',
      venue: 'Sports Ground',
      organizer: 'Sports Committee',
      participants: 300,
      category: 'Social',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      status: 'Ongoing'
    },
    {
      id: 'EVT004',
      title: 'New Year Celebration',
      description: 'Welcome 2026 with music, food and entertainment',
      date: '31 Dec 2025',
      time: '7:00 PM - 11:00 PM',
      venue: 'Company Lawn',
      organizer: 'Event Committee',
      participants: 450,
      category: 'Company',
      image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400',
      status: 'Upcoming'
    }
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
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
      image: event.image
    });
    setShowAddModal(true);
  };

  const handleSave = () => {
    if (editingEvent) {
      setEvents(events.map(event =>
        event.id === editingEvent.id
          ? { ...event, ...formData }
          : event
      ));
    } else {
      const newEvent: Event = {
        id: `EVT${(events.length + 1).toString().padStart(3, '0')}`,
        ...formData,
        participants: 0,
        status: 'Upcoming'
      };
      setEvents([...events, newEvent]);
    }
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
      image: ''
    });
  };

  const categoryColors = {
    Company: 'from-blue-500 to-blue-600',
    Department: 'from-purple-500 to-purple-600',
    Social: 'from-pink-500 to-pink-600',
    Training: 'from-green-500 to-green-600'
  };

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
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., 15 Jan 2026"
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
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
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
