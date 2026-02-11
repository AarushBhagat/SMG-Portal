import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContextEnhanced';
import { CheckCircle, XCircle, Clock, Eye, User, Calendar, DollarSign, Ticket } from 'lucide-react';

export const ApproveEmployeeRequests = () => {
  const { requests, updateRequestStatus } = useApp();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter for canteen requests that are pending approval
  const canteenRequests = requests.filter(request => 
    request.requestType === 'canteen' && 
    request.status !== 'draft'
  );

  const pendingRequests = canteenRequests.filter(request => request.status === 'pending');
  const processedRequests = canteenRequests.filter(request => request.status !== 'pending');

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setShowModal(true);
    setRemarks('');
  };

  const handleAction = async (action: 'approve' | 'reject') => {
    if (!selectedRequest) return;

    setLoading(true);
    try {
      await updateRequestStatus(selectedRequest.id, {
        status: action === 'approve' ? 'approved' : 'rejected',
        approverComments: remarks || `Request ${action}d by Canteen Admin`,
        approvedAt: new Date(),
        approvedBy: 'Canteen Admin'
      });

      setShowModal(false);
      setSelectedRequest(null);
      setRemarks('');
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
      alert(`Failed to ${action} request. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    if (date.toDate) return date.toDate().toLocaleDateString();
    if (date instanceof Date) return date.toLocaleDateString();
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (date: any) => {
    if (!date) return 'N/A';
    if (date.toDate) return date.toDate().toLocaleTimeString();
    if (date instanceof Date) return date.toLocaleTimeString();
    return new Date(date).toLocaleTimeString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Ticket size={32} />
          Employee Coupon Requests
        </h1>
        <p className="mt-2 opacity-90">Review and approve employee canteen coupon requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{pendingRequests.length}</p>
              <p className="text-sm text-gray-600">Pending Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {processedRequests.filter(r => r.status === 'approved').length}
              </p>
              <p className="text-sm text-gray-600">Approved Today</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                ₹{pendingRequests.reduce((total, req) => total + (req.requestData?.amount || 0), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Pending Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Pending Requests</h2>
        </div>

        <div className="p-6">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">No pending requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <User className="text-orange-600" size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{request.userName || 'Unknown User'}</p>
                          <p className="text-sm text-gray-600">{request.userId}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Coupons</p>
                          <p className="font-semibold">{request.requestData?.coupons || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Amount</p>
                          <p className="font-semibold">₹{request.requestData?.amount || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Requested</p>
                          <p className="font-semibold text-sm">{formatDate(request.createdAt)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Time</p>
                          <p className="font-semibold text-sm">{formatTime(request.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                      >
                        <Eye size={16} />
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Processed Requests */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Recent Processed Requests</h2>
        </div>

        <div className="p-6">
          {processedRequests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No processed requests yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {processedRequests.slice(0, 10).map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{request.userName || 'Unknown User'}</p>
                    <p className="text-sm text-gray-600">
                      {request.requestData?.coupons} coupons • ₹{request.requestData?.amount}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(request.updatedAt)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(request.status)}`}>
                    {request.status?.charAt(0).toUpperCase() + request.status?.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Request Details */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Request Details</h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Employee</p>
                  <p className="font-semibold">{selectedRequest.userName || 'Unknown User'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Employee ID</p>
                  <p className="font-semibold">{selectedRequest.userId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Coupons Requested</p>
                  <p className="font-semibold">{selectedRequest.requestData?.coupons}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="font-semibold">₹{selectedRequest.requestData?.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Coupon Price</p>
                  <p className="font-semibold">₹{selectedRequest.requestData?.couponPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">GST</p>
                  <p className="font-semibold">₹{selectedRequest.requestData?.gst}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Request Date</p>
                  <p className="font-semibold">
                    {formatDate(selectedRequest.createdAt)} at {formatTime(selectedRequest.createdAt)}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks (Optional)
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add any remarks for this decision..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                disabled={loading}
              >
                <XCircle size={16} />
                {loading ? 'Processing...' : 'Reject'}
              </button>
              <button
                onClick={() => handleAction('approve')}
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                disabled={loading}
              >
                <CheckCircle size={16} />
                {loading ? 'Processing...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};