import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  orderBy, 
  where,
  onSnapshot,
  serverTimestamp,
  QueryConstraint
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date format "2026-03-15"
  time: string; // "6:00 PM - 10:00 PM"
  venue: string;
  location: string; // Same as venue
  category: 'Company' | 'Department' | 'Social' | 'Training' | 'Company Event' | 'Workshop' | 'Sports' | 'CSR';
  status: 'upcoming' | 'ongoing' | 'completed' | 'Upcoming' | 'Ongoing' | 'Completed';
  organizer: string;
  organizerId?: string;
  organizerName?: string;
  capacity?: number;
  registered?: number;
  participants?: number;
  registeredUsers?: string[];
  image: string;
  imageUrl?: string;
  createdBy: string;
  createdByName: string;
  createdAt: any;
  updatedAt: any;
  isActive: boolean;
  isPinned?: boolean;
}

export interface EventRegistration {
  userId: string;
  employeeId: string;
  employeeName: string;
  email: string;
  department: string;
  registeredAt: any;
  status: 'registered' | 'attended' | 'cancelled';
  notes?: string;
}

// Events collection reference
const eventsCollection = collection(db, 'events');

/**
 * Add a new event to Firestore
 */
export const addEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(eventsCollection, {
      ...eventData,
      location: eventData.venue, // Ensure compatibility
      imageUrl: eventData.image, // Ensure compatibility
      participants: eventData.registered || 0,
      registeredUsers: eventData.registeredUsers || [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
      isPinned: false
    });
    console.log('Event added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

/**
 * Update an existing event
 */
export const updateEvent = async (eventId: string, eventData: Partial<Event>): Promise<void> => {
  try {
    const eventRef = doc(db, 'events', eventId);
    
    // Ensure compatibility fields
    const updateData = {
      ...eventData,
      updatedAt: serverTimestamp()
    };
    
    if (eventData.venue) {
      updateData.location = eventData.venue;
    }
    if (eventData.image) {
      updateData.imageUrl = eventData.image;
    }
    if (eventData.registered !== undefined) {
      updateData.participants = eventData.registered;
    }
    
    await updateDoc(eventRef, updateData);
    console.log('Event updated successfully:', eventId);
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

/**
 * Delete an event
 */
export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    const eventRef = doc(db, 'events', eventId);
    await deleteDoc(eventRef);
    console.log('Event deleted successfully:', eventId);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

/**
 * Get all events (with optional filters)
 */
export const getEvents = async (filters?: {
  status?: string;
  category?: string;
  isActive?: boolean;
}): Promise<Event[]> => {
  try {
    const constraints: QueryConstraint[] = [];
    
    if (filters?.status) {
      // Handle both cases (lowercase and capitalized)
      const statusLower = filters.status.toLowerCase();
      const statusCap = statusLower.charAt(0).toUpperCase() + statusLower.slice(1);
      constraints.push(where('status', 'in', [statusLower, statusCap]));
    }
    
    if (filters?.category) {
      constraints.push(where('category', '==', filters.category));
    }
    
    if (filters?.isActive !== undefined) {
      constraints.push(where('isActive', '==', filters.isActive));
    }
    
    // Order by createdAt (timestamp field)
    constraints.push(orderBy('createdAt', 'desc'));
    
    const q = constraints.length > 0
      ? query(eventsCollection, ...constraints)
      : query(eventsCollection, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    
    const events: Event[] = [];
    querySnapshot.forEach((doc) => {
      events.push({
        id: doc.id,
        ...doc.data()
      } as Event);
    });
    
    return events;
  } catch (error) {
    console.error('Error getting events:', error);
    // If ordering fails, try without it
    try {
      const querySnapshot = await getDocs(eventsCollection);
      const events: Event[] = [];
      querySnapshot.forEach((doc) => {
        events.push({
          id: doc.id,
          ...doc.data()
        } as Event);
      });
      // Sort client-side
      events.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
      return events;
    } catch (fallbackError) {
      console.error('Fallback query also failed:', fallbackError);
      throw fallbackError;
    }
  }
};

/**
 * Get a single event by ID
 */
export const getEventById = async (eventId: string): Promise<Event | null> => {
  try {
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    
    if (eventDoc.exists()) {
      return {
        id: eventDoc.id,
        ...eventDoc.data()
      } as Event;
    }
    return null;
  } catch (error) {
    console.error('Error getting event:', error);
    throw error;
  }
};

/**
 * Subscribe to real-time events updates
 */
export const subscribeToEvents = (
  callback: (events: Event[]) => void,
  filters?: {
    status?: string;
    category?: string;
    isActive?: boolean;
  }
): (() => void) => {
  try {
    const constraints: QueryConstraint[] = [];
    
    if (filters?.status) {
      const statusLower = filters.status.toLowerCase();
      const statusCap = statusLower.charAt(0).toUpperCase() + statusLower.slice(1);
      constraints.push(where('status', 'in', [statusLower, statusCap]));
    }
    
    if (filters?.category) {
      constraints.push(where('category', '==', filters.category));
    }
    
    if (filters?.isActive !== undefined) {
      constraints.push(where('isActive', '==', filters.isActive));
    }
    
    // Order by createdAt instead of date (which is a string)
    // This requires an index in Firestore
    constraints.push(orderBy('createdAt', 'desc'));
    
    const q = constraints.length > 0 
      ? query(eventsCollection, ...constraints)
      : query(eventsCollection, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const events: Event[] = [];
      snapshot.forEach((doc) => {
        events.push({
          id: doc.id,
          ...doc.data()
        } as Event);
      });
      callback(events);
    }, (error) => {
      console.error('Error in events subscription:', error);
      // Fallback: try without ordering if permission error
      if (error.code === 'permission-denied') {
        console.log('Attempting fallback query without constraints...');
        const fallbackUnsubscribe = onSnapshot(eventsCollection, (snapshot) => {
          const events: Event[] = [];
          snapshot.forEach((doc) => {
            events.push({
              id: doc.id,
              ...doc.data()
            } as Event);
          });
          // Sort client-side by date
          events.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
          });
          callback(events);
        });
        return fallbackUnsubscribe;
      }
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to events:', error);
    // Return a no-op unsubscribe function
    return () => {};
  }
};

/**
 * Upload event image to Firebase Storage
 */
export const uploadEventImage = async (file: File, eventId?: string): Promise<string> => {
  try {
    const timestamp = Date.now();
    const fileName = eventId 
      ? `events/${eventId}_${timestamp}.${file.name.split('.').pop()}`
      : `events/temp_${timestamp}_${file.name}`;
    
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('Event image uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading event image:', error);
    throw error;
  }
};

/**
 * Register a user for an event
 */
export const registerForEvent = async (
  eventId: string,
  registration: EventRegistration
): Promise<void> => {
  try {
    await addDoc(collection(db, 'events', eventId, 'registrations'), {
      ...registration,
      registeredAt: serverTimestamp(),
      status: 'registered'
    });
    
    // Update event's registered count
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    
    if (eventDoc.exists()) {
      const currentRegistered = eventDoc.data().registered || 0;
      const registeredUsers = eventDoc.data().registeredUsers || [];
      
      await updateDoc(eventRef, {
        registered: currentRegistered + 1,
        participants: currentRegistered + 1,
        registeredUsers: [...registeredUsers, registration.userId],
        updatedAt: serverTimestamp()
      });
    }
    
    console.log('User registered for event successfully');
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

/**
 * Cancel event registration
 */
export const cancelEventRegistration = async (
  eventId: string,
  userId: string
): Promise<void> => {
  try {
    const registrationRef = doc(db, 'events', eventId, 'registrations', userId);
    await deleteDoc(registrationRef);
    
    // Update event's registered count
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    
    if (eventDoc.exists()) {
      const currentRegistered = eventDoc.data().registered || 0;
      const registeredUsers = (eventDoc.data().registeredUsers || []).filter((id: string) => id !== userId);
      
      await updateDoc(eventRef, {
        registered: Math.max(0, currentRegistered - 1),
        participants: Math.max(0, currentRegistered - 1),
        registeredUsers: registeredUsers,
        updatedAt: serverTimestamp()
      });
    }
    
    console.log('Event registration cancelled successfully');
  } catch (error) {
    console.error('Error cancelling event registration:', error);
    throw error;
  }
};
