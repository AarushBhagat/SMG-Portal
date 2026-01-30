import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  updateDoc, 
  doc, 
  deleteDoc,
  Timestamp,
  setDoc,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';

interface AppContextType {
  // User Data
  currentUser: any;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  
  // Attendance
  isClockedIn: boolean;
  clockInTime: string | null;
  todayHours: string;
  handleClockIn: () => void;
  handleClockOut: () => void;
  attendanceHistory: any[];
  
  // Leave Management
  leaveBalance: any;
  leaveRequests: any[];
  applyLeave: (leave: any) => void;
  cancelLeave: (id: string) => void;
  
  // Requests
  requests: any[];
  addRequest: (request: any) => void;
  updateRequest: (id: string, updates: any) => void;
  deleteRequest: (id: string) => void;
  approveRequest: (id: string) => void;
  rejectRequest: (id: string, reason: string) => void;
  
  // Notifications
  notifications: any[];
  addNotification: (notification: any) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
  
  // Announcements
  announcements: any[];
  addAnnouncement: (announcement: any) => void;
  deleteAnnouncement: (id: string) => void;
  
  // Users (for admin)
  allUsers: any[];
  updateUser: (id: string, updates: any) => void;
  addUser: (user: any) => void;
  deleteUser: (id: string) => void;
  
  // Training
  trainings: any[];
  enrollInTraining: (trainingId: string) => void;
  addTraining: (training: any) => void;
  updateTraining: (id: string, updates: any) => void;
  deleteTraining: (id: string) => void;
  
  // Projects
  projects: any[];
  addProject: (project: any) => void;
  updateProject: (id: string, updates: any) => void;
  deleteProject: (id: string) => void;
  
  // Documents
  documents: any[];
  requestDocument: (docType: string) => void;
  uploadDocument: (document: any) => void;
  deleteDocument: (id: string) => void;
  
  // Canteen
  canteenBalance: string;
  canteenOrders: any[];
  placeCanteenOrder: (order: any) => void;
  addCanteenBalance: (amount: number) => void;
  
  // Guest House
  guestHouseBookings: any[];
  bookGuestHouse: (booking: any) => void;
  cancelGuestHouseBooking: (id: string) => void;
  
  // Transport
  transportRequests: any[];
  requestTransport: (request: any) => void;
  cancelTransportRequest: (id: string) => void;
  
  // Bus Facility
  busRequests: any[];
  requestBusFacility: (request: any) => void;
  
  // Parking Facility
  parkingRequests: any[];
  requestParkingFacility: (request: any) => void;
  
  // Uniform
  uniformRequests: any[];
  requestUniform: (request: any) => void;
  
  // Assets
  myAssets: any[];
  assetRequests: any[];
  requestAsset: (asset: any) => void;
  
  // Payroll
  payslips: any[];
  generatePayslip: (month: string) => void;
  
  // SIM Allocation
  simRequests: any[];
  simCards: any[];
  requestSIM: (request: any) => void;
  
  // General Requests
  generalRequests: any[];
  submitGeneralRequest: (request: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: authUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Sync with Firebase Auth user
  useEffect(() => {
    if (authUser) {
      setCurrentUser({
        id: authUser.id,
        empId: authUser.id,
        name: authUser.name,
        email: authUser.email,
        phone: authUser.phone || '',
        emergencyContact: authUser.emergencyContact || '',
        department: authUser.department,
        position: authUser.designation,
        role: authUser.designation,
        joiningDate: authUser.joinDate || '',
        dateOfBirth: authUser.dateOfBirth || '',
        reportingTo: authUser.reportingManager || '',
        shift: authUser.shift || 'General (9:00 - 18:00)',
        employeeType: authUser.employeeType || 'Full-time',
        location: authUser.location,
        avatar: authUser.avatar,
        salary: authUser.salary || '',
        bankAccount: authUser.bankAccount || '',
        panCard: authUser.panCard || '',
        aadharCard: authUser.aadharCard || '',
        bloodGroup: authUser.bloodGroup || '',
        address: authUser.address || '',
        education: authUser.education || [],
        certifications: authUser.certifications || [],
        skills: authUser.skills || [],
        languages: authUser.languages || []
      });
      
      // Check if user is admin
      if (authUser.role === 'admin' || authUser.role === 'super_admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setCurrentUser(null);
      setIsAdmin(false);
    }
  }, [authUser]);
  
  // ============= FIREBASE-BACKED STATE =============
  
  // Attendance State
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [todayHours, setTodayHours] = useState('0h 0m');
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  
  // Leave Management
  const [leaveBalance] = useState({
    casual: { total: 12, used: 0, remaining: 12 },
    sick: { total: 7, used: 0, remaining: 7 },
    earned: { total: 15, used: 0, remaining: 15 },
    privilege: { total: 10, used: 0, remaining: 10 }
  });
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  
  // Requests State - All request types
  const [requests, setRequests] = useState<any[]>([]);
  
  // Notifications State
  const [notifications, setNotifications] = useState<any[]>([]);
  
  // Announcements State
  const [announcements, setAnnouncements] = useState<any[]>([]);
  
  // All Users (for admin)
  const [allUsers, setAllUsers] = useState<any[]>([]);
  
  // Training State
  const [trainings, setTrainings] = useState<any[]>([]);
  
  // Projects State
  const [projects, setProjects] = useState<any[]>([]);
  
  // Documents State
  const [documents] = useState<any[]>([]);
  
  // Canteen State
  const [canteenBalance] = useState('₹0');
  const [canteenOrders, setCanteenOrders] = useState<any[]>([]);
  
  // Guest House State
  const [guestHouseBookings, setGuestHouseBookings] = useState<any[]>([]);
  
  // Transport State
  const [transportRequests, setTransportRequests] = useState<any[]>([]);
  
  // Bus Facility State
  const [busRequests, setBusRequests] = useState<any[]>([]);
  
  // Parking Facility State
  const [parkingRequests, setParkingRequests] = useState<any[]>([]);
  
  // Uniform State
  const [uniformRequests, setUniformRequests] = useState<any[]>([]);
  
  // Assets State
  const [myAssets] = useState<any[]>([]);
  const [assetRequests, setAssetRequests] = useState<any[]>([]);
  
  // Payroll State
  const [payslips] = useState<any[]>([]);
  
  // SIM Requests & Cards State
  const [simRequests, setSimRequests] = useState<any[]>([]);
  const [simCards] = useState<any[]>([]);
  
  // General Requests State
  const [generalRequests, setGeneralRequests] = useState<any[]>([]);

  // ============= FIRESTORE REAL-TIME LISTENERS =============

  // Listen to ALL requests for current user (or all requests for admin)
  useEffect(() => {
    if (!authUser) return;

    console.log('🔄 Setting up requests listener for user:', authUser.id);
    
    let q;
    if (isAdmin) {
      // Admin sees all requests
      q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'), limit(100));
    } else {
      // Employee sees only their requests
      q = query(
        collection(db, 'requests'), 
        where('userId', '==', authUser.id),
        orderBy('createdAt', 'desc')
      );
    }
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allRequests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedDate: doc.data().createdAt?.toDate?.()?.toISOString().split('T')[0] || '',
      }));
      
      console.log('📋 Loaded requests from Firestore:', allRequests.length);
      setRequests(allRequests);
      
      // Filter specific request types for backward compatibility
      setLeaveRequests(allRequests.filter(r => r.requestType === 'leave'));
      setCanteenOrders(allRequests.filter(r => r.requestType === 'canteen'));
      setGuestHouseBookings(allRequests.filter(r => r.requestType === 'guesthouse' || r.requestType === 'guest_house'));
      setTransportRequests(allRequests.filter(r => r.requestType === 'transport'));
      setBusRequests(allRequests.filter(r => r.requestType === 'bus'));
      setParkingRequests(allRequests.filter(r => r.requestType === 'parking'));
      setUniformRequests(allRequests.filter(r => r.requestType === 'uniform'));
      setAssetRequests(allRequests.filter(r => r.requestType === 'asset'));
      setSimRequests(allRequests.filter(r => r.requestType === 'sim' || r.requestType === 'sim_card'));
      setGeneralRequests(allRequests.filter(r => r.requestType === 'general' || r.requestType === 'welfare'));
    }, (error) => {
      console.error('❌ Error loading requests:', error);
    });

    return () => unsubscribe();
  }, [authUser, isAdmin]);

  // Listen to notifications
  useEffect(() => {
    if (!authUser) return;

    console.log('🔔 Setting up notifications listener');
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', authUser.id),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().createdAt?.toDate?.() || new Date(),
        time: formatTimeAgo(doc.data().createdAt?.toDate?.())
      }));
      
      console.log('🔔 Loaded notifications:', notifs.length);
      setNotifications(notifs);
    }, (error) => {
      console.error('❌ Error loading notifications:', error);
    });

    return () => unsubscribe();
  }, [authUser]);

  // Listen to announcements
  useEffect(() => {
    console.log('📢 Setting up announcements listener');
    const q = query(
      collection(db, 'announcements'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const anns = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate?.()?.toISOString().split('T')[0] || ''
      }));
      
      console.log('📢 Loaded announcements:', anns.length);
      setAnnouncements(anns);
    }, (error) => {
      console.error('❌ Error loading announcements:', error);
    });

    return () => unsubscribe();
  }, []);

  // Listen to all users (admin only)
  useEffect(() => {
    if (!isAdmin) return;

    console.log('👥 Setting up users listener (admin)');
    const unsubscribe = onSnapshot(
      query(collection(db, 'users'), orderBy('fullName')),
      (snapshot) => {
        const users = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          empId: doc.data().employeeId || doc.id,
          name: doc.data().fullName || doc.data().name || '',
          dept: doc.data().department || '',
          role: doc.data().designation || doc.data().role || '',
          joinDate: doc.data().dateOfJoining?.toDate?.()?.toISOString().split('T')[0] || '',
          status: doc.data().isActive ? 'Active' : 'Inactive'
        }));
        
        console.log('👥 Loaded users:', users.length);
        setAllUsers(users);
      },
      (error) => {
        console.error('❌ Error loading users:', error);
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  // Listen to training sessions
  useEffect(() => {
    console.log('📚 Setting up training sessions listener');
    const q = query(
      collection(db, 'trainingSessions'),
      orderBy('startDate', 'desc'),
      limit(50)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().startDate?.toDate?.()?.toISOString().split('T')[0] || '',
        startDate: doc.data().startDate?.toDate?.()?.toISOString().split('T')[0] || '',
        endDate: doc.data().endDate?.toDate?.()?.toISOString().split('T')[0] || ''
      }));
      
      console.log('📚 Loaded training sessions:', sessions.length);
      setTrainings(sessions);
    }, (error) => {
      console.error('❌ Error loading training:', error);
    });

    return () => unsubscribe();
  }, []);

  // Listen to projects
  useEffect(() => {
    console.log('📊 Setting up projects listener');
    const q = query(
      collection(db, 'projects'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        deadline: doc.data().deadline?.toDate?.()?.toISOString().split('T')[0] || ''
      }));
      
      console.log('📊 Loaded projects:', projs.length);
      setProjects(projs);
    }, (error) => {
      console.error('❌ Error loading projects:', error);
    });

    return () => unsubscribe();
  }, []);

  // Listen to attendance records for current user
  useEffect(() => {
    if (!authUser) return;

    console.log('⏰ Setting up attendance listener');
    const q = query(
      collection(db, 'attendance', authUser.id, 'records'),
      orderBy('date', 'desc'),
      limit(30)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate?.()?.toISOString().split('T')[0] || '',
        day: doc.data().date?.toDate?.()?.toLocaleDateString('en-US', { weekday: 'long' }) || '',
        checkIn: doc.data().checkIn?.toDate?.()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) || '-',
        checkOut: doc.data().checkOut?.toDate?.()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) || '-',
        hours: doc.data().duration || '-',
      }));
      
      console.log('⏰ Loaded attendance records:', records.length);
      setAttendanceHistory(records);
      
      // Check if clocked in today
      const today = new Date().toISOString().split('T')[0];
      const todayRecord = records.find(r => r.date === today);
      if (todayRecord && todayRecord.checkIn && !todayRecord.checkOut) {
        setIsClockedIn(true);
        setClockInTime(todayRecord.checkIn);
      }
    }, (error) => {
      console.error('❌ Error loading attendance:', error);
    });

    return () => unsubscribe();
  }, [authUser]);

  // ============= HELPER FUNCTIONS =============

  const formatTimeAgo = (date: Date | undefined): string => {
    if (!date) return 'Just now';
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  // ============= HANDLERS =============

  // Clock In/Out Handlers
  const handleClockIn = async () => {
    if (!authUser) return;
    
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const recordRef = doc(db, 'attendance', authUser.id, 'records', today);
      
      await setDoc(recordRef, {
        userId: authUser.id,
        employeeId: authUser.id,
        employeeName: authUser.name,
        date: Timestamp.fromDate(new Date()),
        checkIn: Timestamp.fromDate(currentTime),
        status: 'present',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      setClockInTime(timeString);
      setIsClockedIn(true);
      
      addNotification({
        title: 'Clocked In Successfully',
        message: `You clocked in at ${timeString}`,
        type: 'success',
      });
    } catch (error) {
      console.error('❌ Error clocking in:', error);
    }
  };
  
  const handleClockOut = async () => {
    if (!authUser || !clockInTime) return;
    
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const recordRef = doc(db, 'attendance', authUser.id, 'records', today);
      
      // Calculate duration
      const hours = 9; // Simplified for now
      const minutes = Math.floor(Math.random() * 60);
      const hoursWorked = `${hours}h ${minutes}m`;
      
      await updateDoc(recordRef, {
        checkOut: Timestamp.fromDate(currentTime),
        duration: hoursWorked,
        workHours: hours + (minutes / 60),
        updatedAt: serverTimestamp()
      });
      
      setTodayHours(hoursWorked);
      setIsClockedIn(false);
      
      addNotification({
        title: 'Clocked Out Successfully',
        message: `You clocked out at ${timeString}. Total hours: ${hoursWorked}`,
        type: 'success',
      });
      
      setTimeout(() => {
        setClockInTime(null);
      }, 3000);
    } catch (error) {
      console.error('❌ Error clocking out:', error);
    }
  };
  
  // Leave Management Handlers
  const applyLeave = async (leave) => {
    if (!authUser) return;
    
    try {
      await addDoc(collection(db, 'requests'), {
        requestType: 'leave',
        userId: authUser.id,
        userName: authUser.name,
        employeeId: authUser.id,
        employeeName: authUser.name,
        department: authUser.department,
        requestData: {
          leaveType: leave.type,
          startDate: leave.startDate,
          endDate: leave.endDate,
          days: leave.days,
          reason: leave.reason
        },
        status: 'pending',
        priority: 'medium',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      addNotification({
        title: 'Leave Application Submitted',
        message: `Your ${leave.type} application has been submitted`,
        type: 'success',
      });
    } catch (error) {
      console.error('❌ Error applying leave:', error);
    }
  };
  
  const cancelLeave = async (id) => {
    try {
      await updateDoc(doc(db, 'requests', id), {
        status: 'cancelled',
        updatedAt: serverTimestamp()
      });
      
      addNotification({
        title: 'Leave Request Cancelled',
        message: 'Your leave request has been cancelled',
        type: 'info',
      });
    } catch (error) {
      console.error('❌ Error cancelling leave:', error);
    }
  };
  
  // Request Handlers
  const addRequest = async (request) => {
    if (!authUser) return;
    
    try {
      await addDoc(collection(db, 'requests'), {
        requestType: request.requestType || 'general',
        userId: authUser.id,
        userName: authUser.name,
        employeeId: authUser.id,
        employeeName: authUser.name,
        department: authUser.department,
        title: request.title || request.type,
        description: request.reason || request.description,
        requestData: request.requestData || request,
        status: 'pending',
        priority: request.priority || 'medium',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      addNotification({
        title: 'Request Submitted',
        message: `Your ${request.type || 'request'} has been submitted successfully`,
        type: 'success',
      });
    } catch (error) {
      console.error('❌ Error adding request:', error);
    }
  };
  
  const updateRequest = async (id, updates) => {
    try {
      await updateDoc(doc(db, 'requests', id), {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      if (updates.status) {
        addNotification({
          title: `Request ${updates.status}`,
          message: `Your request has been ${updates.status.toLowerCase()}`,
          type: updates.status === 'approved' ? 'success' : updates.status === 'rejected' ? 'error' : 'info',
        });
      }
    } catch (error) {
      console.error('❌ Error updating request:', error);
    }
  };
  
  const deleteRequest = async (id) => {
    try {
      await deleteDoc(doc(db, 'requests', id));
      
      addNotification({
        title: 'Request Deleted',
        message: 'Your request has been deleted',
        type: 'info',
      });
    } catch (error) {
      console.error('❌ Error deleting request:', error);
    }
  };
  
  const approveRequest = async (id) => {
    await updateRequest(id, { status: 'approved' });
  };
  
  const rejectRequest = async (id, reason) => {
    await updateRequest(id, { 
      status: 'rejected',
      rejectionReason: reason
    });
  };
  
  // Notification Handlers
  const addNotification = async (notification) => {
    if (!authUser) return;
    
    try {
      await addDoc(collection(db, 'notifications'), {
        userId: authUser.id,
        title: notification.title,
        message: notification.message,
        type: notification.type || 'info',
        isRead: false,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('❌ Error adding notification:', error);
    }
  };
  
  const markNotificationAsRead = async (id) => {
    try {
      await updateDoc(doc(db, 'notifications', id), {
        isRead: true,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('❌ Error marking notification as read:', error);
    }
  };
  
  const clearAllNotifications = async () => {
    try {
      const batch = [];
      for (const notif of notifications) {
        batch.push(deleteDoc(doc(db, 'notifications', notif.id)));
      }
      await Promise.all(batch);
    } catch (error) {
      console.error('❌ Error clearing notifications:', error);
    }
  };
  
  // Announcement Handlers
  const addAnnouncement = async (announcement) => {
    if (!authUser) return;
    
    try {
      await addDoc(collection(db, 'announcements'), {
        title: announcement.title,
        content: announcement.content,
        type: announcement.type || 'general',
        priority: announcement.priority || 'medium',
        author: isAdmin ? 'Admin' : authUser.name,
        status: 'published',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      addNotification({
        title: 'New Announcement',
        message: announcement.title,
        type: 'info',
      });
    } catch (error) {
      console.error('❌ Error adding announcement:', error);
    }
  };
  
  const deleteAnnouncement = async (id) => {
    try {
      await deleteDoc(doc(db, 'announcements', id));
    } catch (error) {
      console.error('❌ Error deleting announcement:', error);
    }
  };
  
  // User Management Handlers (admin only)
  const updateUser = async (id, updates) => {
    try {
      await updateDoc(doc(db, 'users', id), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('❌ Error updating user:', error);
    }
  };
  
  const addUser = async (user) => {
    try {
      // This should be done via Cloud Function for proper user creation with auth
      console.warn('⚠️ User creation should be done via Cloud Function');
      
      addNotification({
        title: 'New User Added',
        message: `${user.name} has been added to the system`,
        type: 'success',
      });
    } catch (error) {
      console.error('❌ Error adding user:', error);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      await updateDoc(doc(db, 'users', id), {
        isActive: false,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('❌ Error deleting user:', error);
    }
  };
  
  // Training Handlers
  const enrollInTraining = async (trainingId) => {
    if (!authUser) return;
    
    try {
      await addDoc(collection(db, 'trainingEnrollments'), {
        trainingId,
        userId: authUser.id,
        userName: authUser.name,
        status: 'enrolled',
        enrolledAt: serverTimestamp(),
        createdAt: serverTimestamp()
      });
      
      addNotification({
        title: 'Training Enrollment Successful',
        message: 'You have been enrolled in the training program',
        type: 'success',
      });
    } catch (error) {
      console.error('❌ Error enrolling in training:', error);
    }
  };
  
  const addTraining = async (training) => {
    try {
      await addDoc(collection(db, 'trainingSessions'), {
        ...training,
        enrolled: 0,
        completed: 0,
        status: 'open',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('❌ Error adding training:', error);
    }
  };
  
  const updateTraining = async (id, updates) => {
    try {
      await updateDoc(doc(db, 'trainingSessions', id), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('❌ Error updating training:', error);
    }
  };
  
  const deleteTraining = async (id) => {
    try {
      await deleteDoc(doc(db, 'trainingSessions', id));
    } catch (error) {
      console.error('❌ Error deleting training:', error);
    }
  };
  
  // Project Handlers
  const addProject = async (project) => {
    try {
      await addDoc(collection(db, 'projects'), {
        ...project,
        progress: 0,
        status: 'planning',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('❌ Error adding project:', error);
    }
  };
  
  const updateProject = async (id, updates) => {
    try {
      await updateDoc(doc(db, 'projects', id), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('❌ Error updating project:', error);
    }
  };
  
  const deleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      console.error('❌ Error deleting project:', error);
    }
  };
  
  // Document Handlers
  const requestDocument = async (docType) => {
    await addRequest({
      requestType: 'document',
      type: 'Document Request',
      title: docType,
      reason: 'Required for personal use',
      priority: 'medium'
    });
  };
  
  const uploadDocument = async (document) => {
    // Document upload should use Firebase Storage
    console.warn('⚠️ Document upload should use Firebase Storage');
  };
  
  const deleteDocument = async (id) => {
    // Documents are typically managed by admin
    console.warn('⚠️ Document deletion should be admin-only');
  };
  
  // Canteen Handlers
  const placeCanteenOrder = async (order) => {
    await addRequest({
      requestType: 'canteen',
      type: 'Canteen Order',
      title: 'Canteen Order',
      requestData: order,
      priority: 'low'
    });
  };
  
  const addCanteenBalance = async (amount) => {
    if (!authUser) return;
    
    // This should update user profile or wallet balance
    addNotification({
      title: 'Balance Added',
      message: `₹${amount} has been added to your canteen wallet`,
      type: 'success',
    });
  };
  
  // Guest House Handlers
  const bookGuestHouse = async (booking) => {
    await addRequest({
      requestType: 'guesthouse',
      type: 'Guest House Booking',
      title: 'Guest House Booking',
      requestData: booking,
      priority: 'medium'
    });
  };
  
  const cancelGuestHouseBooking = async (id) => {
    await updateRequest(id, { status: 'cancelled' });
  };
  
  // Transport Handlers
  const requestTransport = async (request) => {
    await addRequest({
      requestType: 'transport',
      type: 'Transport Request',
      title: 'Transport Request',
      requestData: request,
      priority: 'medium'
    });
  };
  
  const cancelTransportRequest = async (id) => {
    await updateRequest(id, { status: 'cancelled' });
  };
  
  // Bus Facility Handlers
  const requestBusFacility = async (request) => {
    await addRequest({
      requestType: 'bus',
      type: 'Bus Facility Request',
      title: 'Bus Facility Request',
      requestData: request,
      priority: 'medium'
    });
  };
  
  // Parking Facility Handlers
  const requestParkingFacility = async (request) => {
    await addRequest({
      requestType: 'parking',
      type: 'Parking Facility Request',
      title: 'Parking Facility Request',
      requestData: request,
      priority: 'medium'
    });
  };
  
  // Uniform Handlers
  const requestUniform = async (request) => {
    await addRequest({
      requestType: 'uniform',
      type: 'Uniform Request',
      title: 'Uniform Request',
      requestData: request,
      priority: 'medium'
    });
  };
  
  // Asset Handlers
  const requestAsset = async (asset) => {
    await addRequest({
      requestType: 'asset',
      type: 'Asset Request',
      title: asset.assetType || 'Asset Request',
      requestData: asset,
      priority: asset.priority || 'medium'
    });
  };
  
  // Payroll Handlers
  const generatePayslip = async (month) => {
    // Payslips are typically generated by backend
    console.warn('⚠️ Payslip generation should be done by backend');
  };
  
  // SIM Handlers
  const requestSIM = async (request) => {
    await addRequest({
      requestType: 'sim',
      type: 'SIM Request',
      title: 'SIM Card Request',
      requestData: request,
      priority: request.priority || 'medium'
    });
  };
  
  // General Request Handlers
  const submitGeneralRequest = async (request) => {
    await addRequest({
      requestType: 'general',
      type: 'General Request',
      title: request.subject || 'General Request',
      requestData: request,
      priority: request.priority || 'medium'
    });
  };
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const value = {
    currentUser,
    isAdmin,
    setIsAdmin,
    isClockedIn,
    clockInTime,
    todayHours,
    handleClockIn,
    handleClockOut,
    attendanceHistory,
    leaveBalance,
    leaveRequests,
    applyLeave,
    cancelLeave,
    requests,
    addRequest,
    updateRequest,
    deleteRequest,
    approveRequest,
    rejectRequest,
    notifications,
    addNotification,
    markNotificationAsRead,
    clearAllNotifications,
    unreadCount,
    announcements,
    addAnnouncement,
    deleteAnnouncement,
    allUsers,
    updateUser,
    addUser,
    deleteUser,
    trainings,
    enrollInTraining,
    addTraining,
    updateTraining,
    deleteTraining,
    projects,
    addProject,
    updateProject,
    deleteProject,
    documents,
    requestDocument,
    uploadDocument,
    deleteDocument,
    canteenBalance,
    canteenOrders,
    placeCanteenOrder,
    addCanteenBalance,
    guestHouseBookings,
    bookGuestHouse,
    cancelGuestHouseBooking,
    transportRequests,
    requestTransport,
    cancelTransportRequest,
    busRequests,
    requestBusFacility,
    parkingRequests,
    requestParkingFacility,
    uniformRequests,
    requestUniform,
    myAssets,
    assetRequests,
    requestAsset,
    payslips,
    generatePayslip,
    simCards,
    simRequests,
    requestSIM,
    generalRequests,
    submitGeneralRequest
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
