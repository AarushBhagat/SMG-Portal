import React, { useState } from 'react';
import { Hospital, School, MapPin, Phone, Building2, Search, Filter } from 'lucide-react';

export const FacilitiesInfoPage = () => {
  const [searchHospital, setSearchHospital] = useState('');
  const [searchSchool, setSearchSchool] = useState('');
  const [filterCity, setFilterCity] = useState('All');

  // Mock data for hospitals
  const hospitals = [
    {
      id: 1,
      cityName: 'Noida',
      hospitalName: 'Max Super Speciality Hospital',
      contactNumber: '+91-120-6629000',
      address: 'A-Block, Sector 19, Noida, Uttar Pradesh - 201301'
    },
    {
      id: 2,
      cityName: 'Noida',
      hospitalName: 'Fortis Hospital',
      contactNumber: '+91-120-6719000',
      address: 'B-22, Sector 62, Noida, Uttar Pradesh - 201301'
    },
    {
      id: 3,
      cityName: 'Noida',
      hospitalName: 'Metro Hospital & Heart Institute',
      contactNumber: '+91-120-4324444',
      address: 'L-94, Sector 11, Noida, Uttar Pradesh - 201301'
    },
    {
      id: 4,
      cityName: 'Greater Noida',
      hospitalName: 'Yatharth Super Speciality Hospital',
      contactNumber: '+91-120-7122222',
      address: 'Plot No. 1, Knowledge Park III, Greater Noida, UP - 201310'
    },
    {
      id: 5,
      cityName: 'Greater Noida',
      hospitalName: 'Sharda Hospital',
      contactNumber: '+91-120-4560000',
      address: 'Plot No. 32-34, Knowledge Park III, Greater Noida, UP - 201310'
    },
    {
      id: 6,
      cityName: 'Delhi',
      hospitalName: 'Apollo Hospital',
      contactNumber: '+91-11-26825000',
      address: 'Mathura Road, Sarita Vihar, New Delhi - 110076'
    },
    {
      id: 7,
      cityName: 'Delhi',
      hospitalName: 'Sir Ganga Ram Hospital',
      contactNumber: '+91-11-25750000',
      address: 'Rajinder Nagar, New Delhi - 110060'
    },
    {
      id: 8,
      cityName: 'Ghaziabad',
      hospitalName: 'Columbia Asia Hospital',
      contactNumber: '+91-120-6674444',
      address: 'NH-24, Hapur Road, Ghaziabad, UP - 201002'
    }
  ];

  // Mock data for schools
  const schools = [
    {
      id: 1,
      cityName: 'Noida',
      schoolName: 'Delhi Public School (DPS)',
      contactNumber: '+91-120-2512881',
      address: 'Sector 30, Noida, Uttar Pradesh - 201303'
    },
    {
      id: 2,
      cityName: 'Noida',
      schoolName: 'Amity International School',
      contactNumber: '+91-120-4771000',
      address: 'Sector 44, Noida, Uttar Pradesh - 201301'
    },
    {
      id: 3,
      cityName: 'Noida',
      schoolName: 'Lotus Valley International School',
      contactNumber: '+91-120-2588851',
      address: 'Sector 126, Noida, Uttar Pradesh - 201303'
    },
    {
      id: 4,
      cityName: 'Greater Noida',
      schoolName: 'Shiv Nadar School',
      contactNumber: '+91-120-6668800',
      address: 'Dadri Main Road, Greater Noida, UP - 201310'
    },
    {
      id: 5,
      cityName: 'Greater Noida',
      schoolName: 'Ryan International School',
      contactNumber: '+91-120-2326801',
      address: 'Kasna Road, Greater Noida, UP - 201310'
    },
    {
      id: 6,
      cityName: 'Delhi',
      schoolName: 'Modern School',
      contactNumber: '+91-11-26967635',
      address: 'Barakhamba Road, New Delhi - 110001'
    },
    {
      id: 7,
      cityName: 'Delhi',
      schoolName: 'Sanskriti School',
      contactNumber: '+91-11-26856856',
      address: 'B Block, Chandra Gupta Marg, New Delhi - 110021'
    },
    {
      id: 8,
      cityName: 'Ghaziabad',
      schoolName: 'Delhi Public School Indirapuram',
      contactNumber: '+91-120-4561111',
      address: 'Ahinsa Khand II, Indirapuram, Ghaziabad, UP - 201014'
    },
    {
      id: 9,
      cityName: 'Ghaziabad',
      schoolName: 'Seth Anandram Jaipuria School',
      contactNumber: '+91-120-4773000',
      address: 'Vijay Nagar, Ghaziabad, UP - 201009'
    }
  ];

  // Get unique cities
  const cities = ['All', ...Array.from(new Set([...hospitals.map(h => h.cityName), ...schools.map(s => s.cityName)]))];

  // Filter hospitals
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.hospitalName.toLowerCase().includes(searchHospital.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchHospital.toLowerCase());
    const matchesCity = filterCity === 'All' || hospital.cityName === filterCity;
    return matchesSearch && matchesCity;
  });

  // Filter schools
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.schoolName.toLowerCase().includes(searchSchool.toLowerCase()) ||
                         school.address.toLowerCase().includes(searchSchool.toLowerCase());
    const matchesCity = filterCity === 'All' || school.cityName === filterCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Building2 size={32} />
          School & Medical Facilities
        </h1>
        <p className="text-[#87CEEB] opacity-90">
          Information about nearby hospitals and schools - Provided by HR (Employee Welfare Department)
        </p>
      </div>

      {/* City Filter */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="text-[#0B4DA2]" size={20} />
          <h3 className="text-[#1B254B] font-semibold">Filter by City</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setFilterCity(city)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                filterCity === city
                  ? 'bg-[#0B4DA2] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Hospitals Section */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <Hospital className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B254B]">Medical Facilities</h2>
              <p className="text-sm text-gray-600">List of empaneled hospitals</p>
            </div>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search hospitals..."
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
              value={searchHospital}
              onChange={(e) => setSearchHospital(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto border-2 border-gray-200 rounded-3xl">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white">
                <th className="px-4 py-4 text-left text-sm font-bold rounded-tl-3xl">City Name</th>
                <th className="px-4 py-4 text-left text-sm font-bold">Hospital Name</th>
                <th className="px-4 py-4 text-left text-sm font-bold">Contact Number</th>
                <th className="px-4 py-4 text-left text-sm font-bold rounded-tr-3xl">Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital, index) => (
                  <tr
                    key={hospital.id}
                    className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                      index === filteredHospitals.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#0B4DA2]" />
                        <span className="font-semibold text-[#1B254B]">{hospital.cityName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-[#1B254B]">{hospital.hospitalName}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={14} className="text-green-600" />
                        <a href={`tel:${hospital.contactNumber}`} className="hover:text-[#0B4DA2] transition-colors">
                          {hospital.contactNumber}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-gray-600 text-sm">{hospital.address}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                    No hospitals found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredHospitals.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 text-center">
            Showing {filteredHospitals.length} of {hospitals.length} hospitals
          </div>
        )}
      </div>

      {/* Schools Section */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <School className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B254B]">Educational Facilities</h2>
              <p className="text-sm text-gray-600">List of recommended schools</p>
            </div>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search schools..."
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
              value={searchSchool}
              onChange={(e) => setSearchSchool(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto border-2 border-gray-200 rounded-3xl">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white">
                <th className="px-4 py-4 text-left text-sm font-bold rounded-tl-3xl">City Name</th>
                <th className="px-4 py-4 text-left text-sm font-bold">School Name</th>
                <th className="px-4 py-4 text-left text-sm font-bold">Contact Number</th>
                <th className="px-4 py-4 text-left text-sm font-bold rounded-tr-3xl">Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school, index) => (
                  <tr
                    key={school.id}
                    className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                      index === filteredSchools.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#0B4DA2]" />
                        <span className="font-semibold text-[#1B254B]">{school.cityName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-[#1B254B]">{school.schoolName}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={14} className="text-green-600" />
                        <a href={`tel:${school.contactNumber}`} className="hover:text-[#0B4DA2] transition-colors">
                          {school.contactNumber}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-gray-600 text-sm">{school.address}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                    No schools found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredSchools.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 text-center">
            Showing {filteredSchools.length} of {schools.length} schools
          </div>
        )}
      </div>

      {/* Info Note */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-6 shadow-lg border border-orange-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
            <Building2 className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[#1B254B] mb-2">Important Information</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>This information is provided by the HR (Employee Welfare Department) for employee convenience.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Please verify details before visiting any facility.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>For any updates or additions to this list, please contact the Employee Welfare Department.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Some facilities may have special tie-ups with SMG. Check with HR for more details.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
