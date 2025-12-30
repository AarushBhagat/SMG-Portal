import { useState } from 'react';
import { Home, Search, CheckCircle, XCircle, Eye, MapPin, Phone } from 'lucide-react';

interface BookingRequest {
  id: number;
  empName: string;
  empId: string;
  dept: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  purpose: string;
  requestedBy: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const GuestHouseRequestApproval = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [requests, setRequests] = useState<BookingRequest[]>([
    {
      id: 1,
      empName: 'Ramesh Kumar',
      empId: 'SMG-2024-567',
      dept: 'Training',
      guestName: 'Ramesh Kumar',
      checkInDate: '2024-12-28',
      checkOutDate: '2024-12-30',
      roomType: 'Single AC',
      purpose: 'Training Program Attendance',
      requestedBy: 'HR Department',
      requestDate: '2024-12-26 09:00 AM',
      status: 'Pending'
    },
    {
      id: 2,
      empName: 'Sunil Patel',
      empId: 'SMG-2024-789',
      dept: 'Sales',
      guestName: 'Sunil Patel',
      checkInDate: '2024-12-29',
      checkOutDate: '2024-12-31',
      roomType: 'Double AC',
      purpose: 'Client Visit & Meetings',
      requestedBy: 'HR Department',
      requestDate: '2024-12-26 11:30 AM',
      status: 'Pending'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  const guestHouseVendors = {
    HOSHIARPUR: [
      { name: 'A.S Property Consultant', address: 'Red Rd, near NRI FASHION WORLD, Kacha Tobha, Hoshiarpur, Punjab 146001', contact: '9781540088' },
      { name: 'Shri Sai Properties', address: 'Road, opp. Shirdi Sai Baba Temple, Adamwal, Hoshiarpur, Punjab 146001', contact: '8699199500' },
      { name: 'Sood Property', address: 'Mall Road, Bahadurpur Chowk, Near SSP Residence, Hoshiarpur, Punjab 146001', contact: '9814564404' },
      { name: 'Guru Nanak Properties', address: 'University View estate colony, Law Gate Rd, near momo\'s villa, Maheru, Phagwara, Punjab 144411', contact: '9888688736' },
      { name: 'City Property Linker', address: 'Railway Rd, near Co-operative bank, Hari Nagar, Hoshiarpur, Punjab 146001', contact: '9463853971' },
      { name: 'VM Property', address: 'maharaja hotel, Sutheri Rd, adjoining IDBI Bank, Manavta Nagar, Hoshiarpur, Punjab 146001', contact: '9915090986' },
      { name: 'A.K Property', address: 'GWH5+5R8, Central Town, Manavta Nagar, Hoshiarpur, Punjab 146001', contact: '9041015587' },
      { name: 'Property Bai', address: 'Una Rd, Bajwara, Hoshiarpur, Punjab 146023', contact: '7900000007' },
      { name: 'Sharma property linker', address: 'Hoshiarpur - Chandigarh Rd, Hoshiarpur, Punjab 146001', contact: '9876010929' },
      { name: 'Neelkanth Properties', address: 'Una Rd, near Saint Farid Public School Bullanwari, Farid Nagar, Hoshiarpur, Punjab 146001', contact: '8360086850' }
    ],
    JALANDHAR: [
      { name: 'Simran Property Dealer', address: 'Booth no.-60, Guru Gobind Singh Ave, Guru Gobind Singh Avenue, Jalandhar, Punjab 144009', contact: '9815208860' },
      { name: 'Kohinoor Property', address: '66 Feet Rd, near Urban Estate phase II, IsharPuri Colony, Urban Estate, Jalandhar, Punjab 144022', contact: '9153096530' },
      { name: 'Shiva Property', address: 'Corporate Office: Ground Floor, 66 Feet Rd, opp. Curo Mall Haveli, near HP Petrol Pump, Punjabi Bagh Extention, Mithapur, Jalandhar, Punjab 144001', contact: '8968529777' },
      { name: 'M.P.Property Dealer', address: 'Canal Rd, New Vijay Nagar, Basti Nau, Ashok Nagar, Jalandhar, Punjab 144001', contact: '9888244559' },
      { name: 'Jalandhar Real Estate Property Dealer', address: 'Mithapur Chowk, keshav nagar, Mithapur, Jalandhar, Punjab 144022', contact: '9915272382' },
      { name: 'Bakshi Property Dealers', address: 'WF159, 3, GT Rd, Puli Ali Mohalla, Ali Mohalla, Jalandhar, Punjab 144001', contact: '9465022132' },
      { name: 'SEHDEV PROPERTIES & BUILDERS', address: 'main road, Amrit Vihar, Salempur, Jalandhar, Punjab 144004', contact: '7986044494' },
      { name: 'Baweja Investments & Property Dealer', address: 'G.T. Road, Professor Colony, Maqsudan, Jalandhar, Punjab 144008', contact: '9653758383' },
      { name: 'Saini Property Linkers', address: 'Booth Number-14, ITI College Rd, near Taj, Near Taj Hotel, Choti Baradari Part 1, Choti Baradari, Jalandhar, Punjab 144022', contact: '9041063574' },
      { name: 'SHRI SAI KIRPA PROPERTY LINKERS', address: '66 Feet Rd, near punjab and sind bank, IsharPuri Colony, Urban Estate phase II, Jalandhar, Punjab 144001', contact: '9815222833' },
      { name: 'General Estates', address: '8-A, Cantt Rd, Atwal House Colony, Choti Baradari, Jalandhar, Punjab 144001', contact: '9872960666' },
      { name: 'Athwal Property Dealer Jalandhar City sales & purchase property', address: 'New Moti Nagar Gali 2, Maqsudan, Jalandhar, Punjab 144001', contact: '9357252313' },
      { name: 'Lucky properties', address: 'Lucky properties, chowk, near dental one, New Dashmesh Nagar, Dhilwan, Jalandhar, Punjab 144005', contact: '9855696555' }
    ],
    LUDHIANA: [
      { name: 'Bhatia Properties and Real estate', address: 'Jalandhar Byepass, New Aman Nagar, near Deep Nursing Home, Ludhiana, Punjab 141005', contact: '8528625000' },
      { name: 'Dashmesh Property Dealer & Advisor', address: 'Shop No, 147, ESI Hospital Rd, opp. Jawahar Nagar, New Model Town, Model Gram, Ludhiana, Punjab 141002', contact: '9988294456' },
      { name: 'Verma Properties', address: '1, 100, Lodhi Club Rd, J Block, Housing Board Colony, Bhai Randhir Singh Nagar, Ludhiana, Punjab 141012', contact: '9234789129' },
      { name: 'vishnu property advisor and dealer', address: 'near guddi mata mandir, Bajwa Colony, Sandhu Nagar, Haibowal Kalan, Ludhiana, Punjab 141001', contact: '9877060401' },
      { name: 'Paras Property Dealer', address: 'WQ9P+PJ6, To Hambran Rd, Mahaveer Enclave, Ayali Khurd, Rajewal, Ludhiana, Punjab 141003', contact: '9876061165' },
      { name: 'Monga Properties', address: '3rd Floor, 3325, Ferozepur Rd, Gurdev Nagar, Ludhiana, Punjab 141001', contact: '9872888455' },
      { name: 'Big Time Realtors', address: 'Office no. 13, Upper Ground floor, Novelty Plaza, Ferozepur Rd, opp. Park Plaza Hotel, Bhai Wala Chowk, Ghumar Mandi, Ludhiana, Punjab 141002', contact: '9041457000' },
      { name: 'Kaith Property Dealer', address: 'Grain Market, Jalandhar Bypass, near Modern Electric, Barati Colony, Thapar Nagar, Ludhiana, Punjab 141005', contact: '1612782257' },
      { name: 'Real Estate Agent-Bhagat Ram & Sons Realtors', address: '3455, Chandigarh Rd, opposite police colony, Sector 32A, Ludhiana, Punjab 141010', contact: '9815022000' },
      { name: 'Pappu Property Dealer and Builder', address: 'Shop No.30, Main Market, 35, Gurudwara Sahib Rd, D-Block, Dr, Kitchlu Nagar, Ludhiana, Punjab 141001', contact: '9814159315' },
      { name: 'Rajan Properties', address: 'H.O 3450 Urban Estate, Sector - 32A, Chandigarh Rd, near Police colony, Chowk, Ludhiana, Punjab 141010', contact: '9417002481' },
      { name: 'Shree Properties', address: 'Chander Nagar Rd Opposite Bansal Hospital, Adjacent Bhuri Wala Gurudwara, Vivek Nagar, Haibowal Kalan, Ludhiana, Punjab 141001', contact: '9316335257' },
      { name: 'Ram Property Dealer', address: 'WRWW+3G2, New Kartar Nagar, New Kartar Nagar, Ranjeet Singh Market, City Colony, Ludhiana, Punjab 141008', contact: '9914199999' },
      { name: 'Sood Property Dealer', address: 'MIG Flats, 41 FF, Haibowal Khurd, Rishi Nagar, Ludhiana, Punjab 141001', contact: '9815153481' }
    ]
  };

  const cities = Object.keys(guestHouseVendors);

  const handleAction = (action: 'approve' | 'reject') => {
    if (selectedRequest) {
      const updated = requests.map(req =>
        req.id === selectedRequest.id
          ? { ...req, status: action === 'approve' ? 'Approved' as const : 'Rejected' as const }
          : req
      );
      setRequests(updated);
      setShowModal(false);
      setSelectedRequest(null);
    }
  };

  const filteredRequests = requests.filter(req =>
    req.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.guestName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequests = filteredRequests.filter(r => r.status === 'Pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <Home className="text-teal-500" size={36} />
          Guest House Request Approval (HR)
        </h1>
        <p className="text-gray-500 mt-1">Approve guest house booking requests from HR department</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <Home className="text-teal-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{pendingRequests.length}</p>
              <p className="text-sm text-gray-500">Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">15</p>
              <p className="text-sm text-gray-500">Approved This Week</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Home className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">45</p>
              <p className="text-sm text-gray-500">This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by employee name, ID, or guest name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Guest House Booking Requests</h2>
        <div className="space-y-3">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <div key={request.id} className="p-5 bg-teal-50 rounded-xl border border-teal-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="font-bold text-[#1B254B] text-lg">{request.guestName}</h3>
                      <span className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full whitespace-nowrap">Pending</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Employee ID</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.empId}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Department</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.dept}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Check-In Date</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.checkInDate}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Check-Out Date</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.checkOutDate}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Room Type</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.roomType}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Purpose</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.purpose}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedRequest(request); setShowModal(true); }}
                    className="ml-4 px-4 py-2 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
                  >
                    <Eye size={18} />
                    Review
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Home size={64} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-semibold text-gray-500">No pending requests</p>
            </div>
          )}
        </div>
      </div>

      {/* Guest House List Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-6 flex items-center gap-2">
          <Home className="text-teal-500" size={24} />
          Guest House List
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B]">
                <th className="px-6 py-4 text-left text-white font-bold text-sm">City Name</th>
                <th className="px-6 py-4 text-left text-white font-bold text-sm">Total Properties</th>
                <th className="px-6 py-4 text-center text-white font-bold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, idx) => (
                <tr 
                  key={city}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 font-semibold text-[#1B254B]">{city}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {guestHouseVendors[city as keyof typeof guestHouseVendors]?.length || 0} Properties
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedCity(city);
                        setShowVendorModal(true);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all"
                    >
                      View List
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor List Modal */}
      {showVendorModal && selectedCity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <MapPin size={28} />
                  Guest Houses in {selectedCity}
                </h3>
                <button
                  onClick={() => {
                    setShowVendorModal(false);
                    setSelectedCity('');
                  }}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
              <div className="space-y-4">
                {guestHouseVendors[selectedCity as keyof typeof guestHouseVendors]?.map((vendor, idx) => (
                  <div key={idx} className="p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-teal-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-[#1B254B] text-lg mb-3">{vendor.name}</h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin size={18} className="text-teal-500 mt-1 shrink-0" />
                            <p className="text-sm text-gray-700 leading-relaxed">{vendor.address}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={18} className="text-teal-500 shrink-0" />
                            <p className="text-sm font-semibold text-[#1B254B]">{vendor.contact}</p>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full whitespace-nowrap">
                        Property #{idx + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#1B254B]">Review Booking Request</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Guest Name', value: selectedRequest.guestName },
                  { label: 'Employee ID', value: selectedRequest.empId },
                  { label: 'Department', value: selectedRequest.dept },
                  { label: 'Room Type', value: selectedRequest.roomType },
                  { label: 'Check-In Date', value: selectedRequest.checkInDate },
                  { label: 'Check-Out Date', value: selectedRequest.checkOutDate },
                  { label: 'Requested By', value: selectedRequest.requestedBy },
                  { label: 'Request Date', value: selectedRequest.requestDate }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-[#1B254B]">{item.value}</p>
                  </div>
                ))}
                <div className="col-span-2 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Purpose</p>
                  <p className="font-bold text-[#1B254B]">{selectedRequest.purpose}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleAction('approve')}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Approve Booking
                </button>
                <button
                  onClick={() => handleAction('reject')}
                  className="flex-1 bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <XCircle size={20} />
                  Reject Request
                </button>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
