import { useState } from 'react';
import { Home, Search, Calendar, Users, TrendingUp, Clock } from 'lucide-react';

interface Booking {
  id: number;
  roomNumber: string;
  guestName: string;
  empId: string;
  checkIn: string;
  checkOut: string;
  status: 'Occupied' | 'Reserved' | 'Completed';
  purpose: string;
  days: number;
}

export const GuestHouseManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      roomNumber: 'GH-101',
      guestName: 'Ramesh Kumar',
      empId: 'SMG-2024-567',
      checkIn: '2024-12-26',
      checkOut: '2024-12-28',
      status: 'Occupied',
      purpose: 'Training Program',
      days: 2
    },
    {
      id: 2,
      roomNumber: 'GH-203',
      guestName: 'Sunil Patel',
      empId: 'SMG-2024-789',
      checkIn: '2024-12-28',
      checkOut: '2024-12-30',
      status: 'Reserved',
      purpose: 'Client Visit',
      days: 2
    },
    {
      id: 3,
      roomNumber: 'GH-102',
      guestName: 'Anjali Verma',
      empId: 'SMG-2024-234',
      checkIn: '2024-12-20',
      checkOut: '2024-12-25',
      status: 'Completed',
      purpose: 'Project Work',
      days: 5
    },
    {
      id: 4,
      roomNumber: 'GH-201',
      guestName: 'Vikram Singh',
      empId: 'SMG-2024-456',
      checkIn: '2024-12-26',
      checkOut: '2024-12-29',
      status: 'Occupied',
      purpose: 'Official Meeting',
      days: 3
    }
  ]);

  const filteredBookings = bookings.filter(b =>
    b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRooms = 12;
  const occupiedRooms = bookings.filter(b => b.status === 'Occupied').length;
  const availableRooms = totalRooms - occupiedRooms;
  const reservedRooms = bookings.filter(b => b.status === 'Reserved').length;
  const activeBookings = bookings.filter(b => b.status === 'Occupied' || b.status === 'Reserved');
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <Home className="text-emerald-500" size={36} />
          Guest House Management
        </h1>
        <p className="text-gray-500 mt-1">Manage bookings and room availability</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Home className="text-emerald-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{totalRooms}</p>
              <p className="text-sm text-gray-500">Total Rooms</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Home className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{availableRooms}</p>
              <p className="text-sm text-gray-500">Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{occupiedRooms}</p>
              <p className="text-sm text-gray-500">Occupied</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{reservedRooms}</p>
              <p className="text-sm text-gray-500">Reserved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{occupancyRate}%</p>
              <p className="text-sm text-gray-500">Occupancy Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by guest name, employee ID, or room number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Active Bookings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#1B254B]">Active Room Bookings</h2>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-bold text-sm">
            {activeBookings.length} Active
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Room</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Guest Details</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Check-In</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Check-Out</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Duration</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Purpose</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.filter(b => b.status !== 'Completed').map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Home className="text-emerald-500" size={20} />
                      </div>
                      <p className="font-bold text-[#1B254B] text-lg">{booking.roomNumber}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-bold text-[#1B254B]">{booking.guestName}</p>
                      <p className="text-sm text-gray-500">{booking.empId}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{new Date(booking.checkIn).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{new Date(booking.checkOut).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="font-semibold text-[#1B254B]">{booking.days} days</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{booking.purpose}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'Occupied' ? 'bg-orange-100 text-orange-700' :
                      booking.status === 'Reserved' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Completed Bookings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Recent Completed Bookings</h2>
        <div className="space-y-3">
          {filteredBookings.filter(b => b.status === 'Completed').map((booking) => (
            <div key={booking.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Home className="text-green-500" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1B254B]">{booking.roomNumber} - {booking.guestName}</p>
                    <p className="text-sm text-gray-500">{booking.empId} • {booking.purpose}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold">Completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
