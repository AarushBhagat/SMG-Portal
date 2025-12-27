import { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus,
  Eye,
  Edit3,
  UserX,
  UserCheck,
  Filter,
  X
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: 'employee' | 'admin' | 'super_admin';
  department: string;
  status: 'active' | 'inactive';
  email: string;
  phone: string;
  dateJoined: string;
}

export const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([
    {
      id: 'EMP1001',
      name: 'Rohit Sharma',
      role: 'employee',
      department: 'Assembly',
      status: 'active',
      email: 'rohit.sharma@smg.com',
      phone: '+91 98765 43210',
      dateJoined: '2023-01-15'
    },
    {
      id: 'EMP1002',
      name: 'Priya Singh',
      role: 'admin',
      department: 'HR',
      status: 'active',
      email: 'priya.singh@smg.com',
      phone: '+91 98765 43211',
      dateJoined: '2022-06-20'
    },
    {
      id: 'EMP1003',
      name: 'Amit Patel',
      role: 'employee',
      department: 'Quality',
      status: 'inactive',
      email: 'amit.patel@smg.com',
      phone: '+91 98765 43212',
      dateJoined: '2023-03-10'
    },
    {
      id: 'EMP1004',
      name: 'Sneha Reddy',
      role: 'employee',
      department: 'Technology',
      status: 'active',
      email: 'sneha.reddy@smg.com',
      phone: '+91 98765 43213',
      dateJoined: '2023-07-05'
    },
    {
      id: 'EMP1005',
      name: 'Vikram Kumar',
      role: 'admin',
      department: 'Finance',
      status: 'active',
      email: 'vikram.kumar@smg.com',
      phone: '+91 98765 43214',
      dateJoined: '2022-11-12'
    },
    {
      id: 'EMP1006',
      name: 'Anjali Gupta',
      role: 'employee',
      department: 'Marketing',
      status: 'active',
      email: 'anjali.gupta@smg.com',
      phone: '+91 98765 43215',
      dateJoined: '2023-02-28'
    },
    {
      id: 'EMP1007',
      name: 'Karthik Nair',
      role: 'admin',
      department: 'Time Office',
      status: 'active',
      email: 'karthik.nair@smg.com',
      phone: '+91 98765 43216',
      dateJoined: '2022-08-15'
    },
    {
      id: 'EMP1008',
      name: 'Neha Desai',
      role: 'employee',
      department: 'Canteen',
      status: 'inactive',
      email: 'neha.desai@smg.com',
      phone: '+91 98765 43217',
      dateJoined: '2023-05-20'
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'employee',
    department: '',
    status: 'active'
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  const handleCreateUser = () => {
    const newId = `EMP${(users.length + 1001).toString()}`;
    const user: User = {
      id: newId,
      name: newUser.name,
      role: newUser.role as 'employee' | 'admin' | 'super_admin',
      department: newUser.department,
      status: newUser.status as 'active' | 'inactive',
      email: newUser.email,
      phone: newUser.phone,
      dateJoined: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
    setShowCreateModal(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'employee',
      department: '',
      status: 'active'
    });
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-blue-100 text-blue-700';
      case 'admin': return 'bg-blue-100 text-blue-700';
      case 'employee': return 'bg-blue-100 text-blue-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">User Management</h1>
        <p className="text-blue-100 text-sm">Search by profile/role or employee ID, manage requests and issues</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Name, ID, or Role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none transition-all"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="all">All Roles</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all whitespace-nowrap"
          >
            <Plus size={20} />
            Create User
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Showing <span className="font-bold text-[#0B4DA2]">{filteredUsers.length}</span> of <span className="font-bold">{users.length}</span> users
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-semibold text-gray-900">{user.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center text-white font-bold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleBadgeColor(user.role)}`}>
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 font-medium">{user.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(user.status)}`}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        title="View"
                      >
                        <Eye size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        title="Edit"
                      >
                        <Edit3 size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {user.status === 'active' ? (
                          <UserX size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        ) : (
                          <UserCheck size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No users found</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Role-Based Access Information */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
        <h3 className="font-bold text-[#1B254B] mb-4 flex items-center gap-2">
          <Filter size={20} className="text-blue-600" />
          Role-Based Access
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span><strong>Employees</strong> can access only their data.</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span><strong>Admins</strong> manage their departments.</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span><strong>Super Admins</strong> have full system access.</span>
          </li>
        </ul>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1B254B]">Create New User</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                    placeholder="user@smg.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <select
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="">Select Department</option>
                    <option value="Assembly">Assembly</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Technology">Technology</option>
                    <option value="Quality">Quality</option>
                    <option value="Canteen">Canteen</option>
                    <option value="Time Office">Time Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1B254B]">User Details</h3>
              <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center text-white font-bold text-2xl">
                  {selectedUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#1B254B]">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.id}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">EMAIL</p>
                  <p className="text-sm text-gray-900 font-medium">{selectedUser.email}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">PHONE</p>
                  <p className="text-sm text-gray-900 font-medium">{selectedUser.phone}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">ROLE</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleBadgeColor(selectedUser.role)}`}>
                    {selectedUser.role.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">DEPARTMENT</p>
                  <p className="text-sm text-gray-900 font-medium">{selectedUser.department}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">STATUS</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(selectedUser.status)}`}>
                    {selectedUser.status.toUpperCase()}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">DATE JOINED</p>
                  <p className="text-sm text-gray-900 font-medium">{selectedUser.dateJoined}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1B254B]">Edit User</h3>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={selectedUser.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedUser.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue={selectedUser.phone}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <select
                    defaultValue={selectedUser.role}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <select
                    defaultValue={selectedUser.department}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="Assembly">Assembly</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Technology">Technology</option>
                    <option value="Quality">Quality</option>
                    <option value="Canteen">Canteen</option>
                    <option value="Time Office">Time Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    defaultValue={selectedUser.status}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
