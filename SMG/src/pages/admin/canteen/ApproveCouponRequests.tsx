import { useState } from 'react';
import { FileCheck, Clock, CheckCircle, XCircle, Eye, Ticket } from 'lucide-react';
import { useApp } from '../../../context/AppContextEnhanced';

export const ApproveCouponRequests = () => {
    const { requests, approveRequest, rejectRequest } = useApp();
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [remarks, setRemarks] = useState('');

    // Filter only canteen coupon requests
    const canteenRequests = requests.filter((r: any) => r.requestType === 'canteen');
    const pendingRequests = canteenRequests.filter((r: any) => r.status === 'pending');
    const processedRequests = canteenRequests.filter((r: any) => r.status !== 'pending');

    const handleViewDetails = (request: any) => {
        setSelectedRequest(request);
        setShowModal(true);
        setRemarks('');
    };

    const handleApprove = async () => {
        if (selectedRequest) {
            await approveRequest(selectedRequest.id, remarks || 'Approved by Canteen Admin');
            setShowModal(false);
            setSelectedRequest(null);
            setRemarks('');
        }
    };

    const handleReject = async () => {
        if (selectedRequest) {
            await rejectRequest(selectedRequest.id, remarks || 'Rejected by Canteen Admin');
            setShowModal(false);
            setSelectedRequest(null);
            setRemarks('');
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        if (timestamp.toDate) return timestamp.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        if (timestamp instanceof Date) return timestamp.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        return String(timestamp);
    };

    const formatTime = (timestamp: any) => {
        if (!timestamp) return '';
        if (timestamp.toDate) return timestamp.toDate().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
        if (timestamp instanceof Date) return timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
        return '';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
                    <FileCheck className="text-blue-500" size={36} />
                    Employee Coupon Requests
                </h1>
                <p className="text-gray-500 mt-1">Review and approve employee coupon purchase requests</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Clock className="text-orange-500" size={24} />
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
                            <p className="text-2xl font-bold text-[#1B254B]">{canteenRequests.filter((r: any) => r.status === 'approved').length}</p>
                            <p className="text-sm text-gray-500">Approved</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <XCircle className="text-red-500" size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#1B254B]">{canteenRequests.filter((r: any) => r.status === 'rejected').length}</p>
                            <p className="text-sm text-gray-500">Rejected</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#1B254B] mb-4 flex items-center gap-2">
                    <Clock className="text-orange-500" size={24} />
                    Pending Requests ({pendingRequests.length})
                </h2>
                <div className="space-y-3">
                    {pendingRequests.length > 0 ? (
                        pendingRequests.map((request: any) => (
                            <div key={request.id} className="p-5 bg-orange-50 rounded-xl border border-orange-200 hover:shadow-md transition-all">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3 mb-3">
                                            <h3 className="font-bold text-[#1B254B] text-lg">{request.employeeName || request.userName || 'Employee'}</h3>
                                            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full whitespace-nowrap">Pending</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Employee ID</p>
                                                <p className="font-semibold text-[#1B254B] text-sm">{request.employeeId || request.id?.substring(0, 12)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Department</p>
                                                <p className="font-semibold text-[#1B254B] text-sm">{request.department || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Coupons</p>
                                                <p className="font-semibold text-[#0B4DA2] text-sm flex items-center gap-1">
                                                    <Ticket size={14} /> {request.requestData?.coupons || 0}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-1">Amount</p>
                                                <p className="font-semibold text-green-600 text-sm">₹{request.requestData?.amount?.toFixed(2) || '0.00'}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">Requested on: {formatDate(request.createdAt)} {formatTime(request.createdAt)}</p>
                                    </div>
                                    <button
                                        onClick={() => handleViewDetails(request)}
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
                            <Clock size={64} className="mx-auto mb-4 opacity-20" />
                            <p className="text-lg font-semibold text-gray-500">No pending requests</p>
                            <p className="text-sm text-gray-400 mt-1">All employee coupon requests have been processed</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Processed Requests */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#1B254B] mb-4">Recent Activity</h2>
                <div className="space-y-2">
                    {processedRequests.length > 0 ? (
                        processedRequests.slice(0, 10).map((request: any) => (
                            <div key={request.id} className={`p-4 rounded-xl border-2 ${request.status === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-[#1B254B]">{request.employeeName || request.userName}</p>
                                        <p className="text-sm text-gray-500">
                                            {request.requestData?.coupons || 0} coupons • ₹{request.requestData?.amount?.toFixed(2) || '0.00'} • {formatDate(request.createdAt)}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 ${request.status === 'approved' ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-bold rounded-full flex items-center gap-1`}>
                                        {request.status === 'approved' ? <><CheckCircle size={14} /> Approved</> : <><XCircle size={14} /> Rejected</>}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <p className="text-sm">No processed requests yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Review Modal */}
            {showModal && selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-[#1B254B]">Review Coupon Request</h2>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Request Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-500 mb-1">Employee Name</p>
                                    <p className="font-bold text-[#1B254B]">{selectedRequest.employeeName || selectedRequest.userName}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-500 mb-1">Employee ID</p>
                                    <p className="font-bold text-[#1B254B]">{selectedRequest.employeeId}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-500 mb-1">Department</p>
                                    <p className="font-bold text-[#1B254B]">{selectedRequest.department || 'N/A'}</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                    <p className="text-sm text-gray-500 mb-1">Coupons Requested</p>
                                    <p className="text-2xl font-bold text-[#0B4DA2]">{selectedRequest.requestData?.coupons || 0}</p>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Coupon Price</span>
                                    <span className="font-semibold text-[#1B254B]">₹{selectedRequest.requestData?.couponPrice || 200}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold text-[#1B254B]">₹{selectedRequest.requestData?.subtotal?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">GST (5%)</span>
                                    <span className="font-semibold text-[#1B254B]">₹{selectedRequest.requestData?.gst?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="border-t border-gray-300 pt-2 mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-[#1B254B]">Total Amount</span>
                                        <span className="text-2xl font-bold text-[#0B4DA2]">₹{selectedRequest.requestData?.amount?.toFixed(2) || '0.00'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Request Date */}
                            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                                <p className="text-sm text-gray-600">
                                    Request submitted on: <span className="font-semibold text-[#1B254B]">{formatDate(selectedRequest.createdAt)} {formatTime(selectedRequest.createdAt)}</span>
                                </p>
                            </div>

                            {/* Remarks */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Admin Remarks (Optional)
                                </label>
                                <textarea
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    placeholder="Add any notes or comments..."
                                    rows={3}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleApprove}
                                    className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={20} />
                                    Approve Request
                                </button>
                                <button
                                    onClick={handleReject}
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
