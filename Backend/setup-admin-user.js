/**
 * Setup Script: Create Admin User in Firestore with Specific UID
 * Uses Firebase Admin SDK
 * 
 * Run: node setup-admin-user.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('./smg-employee-portal-firebase-adminsdk.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'smg-employee-portal'
  });
}

const auth = admin.auth();
const db = admin.firestore();

// ========================================
// CONFIGURATION - EDIT THESE VALUES
// ========================================

const ADMIN_CONFIG = {
  // Primary identifier - THIS IS THE MAIN THING YOU NEED TO SET
  uid: 'nHbVcJJLImOwrCgb5VcYq8uQDgL2',             // ⚠️ Your specific UID - this will be used for portal access
  
  // Credentials (auto-generated from UID if not provided)
  email: 'markiting@smg.com',                        // Custom email for Marketing portal
  password: 'Test@123',              // Default password, can be changed
  
  // Personal details
  firstName: 'Marketing',            // Change this
  lastName: 'Admin',                  // Change this
  fullName: 'Marketing Admin',       // Change this
  
  // Employment details
  employeeId: 'SMG-MKT-001',         // Change this
  designation: 'Marketing Manager',     // Change this
  department: 'Marketing',           // ⚠️ IMPORTANT - Main department for admin access
  location: 'Main Factory',
  shift: 'General',
  phoneNumber: '+91XXXXXXXXXX',       // Change this
  
  // Admin-specific - IMPORTANT for portal access control
  adminDepartments: ['Marketing', 'Sales', 'Business Development'],  // Departments they can manage
  permissions: [
    'view_department_employees',
    'approve_department_requests',
    'manage_department_attendance',
    'view_department_reports'
  ]
};

// ========================================
// SETUP FUNCTION
// ========================================

async function setupAdminUser() {
  try {
    // Auto-generate email from UID if not provided
    const email = ADMIN_CONFIG.email || `${ADMIN_CONFIG.uid}@smg.internal`;
    
    console.log('🚀 Setting up Admin User...\n');
    console.log('🆔 UID (Portal Access ID):', ADMIN_CONFIG.uid);
    console.log('📧 Email (auto-generated):', email);
    console.log('🏢 Department:', ADMIN_CONFIG.department);
    console.log('📊 Admin Departments:', ADMIN_CONFIG.adminDepartments.join(', '));
    console.log('\n-----------------------------------\n');

    // Step 1: Check if user already exists in Auth
    let userExists = false;
    try {
      await auth.getUser(ADMIN_CONFIG.uid);
      console.log('⚠️  User already exists in Firebase Auth');
      userExists = true;
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('✅ User does not exist, will create new user');
      } else {
        throw error;
      }
    }

    // Step 2: Create or update user in Firebase Auth
    if (!userExists) {
      console.log('📝 Creating user in Firebase Authentication...');
      await auth.createUser({
        uid: ADMIN_CONFIG.uid,
        email: email,
        password: ADMIN_CONFIG.password,
        displayName: ADMIN_CONFIG.fullName,
        emailVerified: true
      });
      console.log('✅ User created in Firebase Auth\n');
    } else {
      console.log('📝 Updating existing user...');
      await auth.updateUser(ADMIN_CONFIG.uid, {
        email: email,
        password: ADMIN_CONFIG.password,
        displayName: ADMIN_CONFIG.fullName,
        emailVerified: true
      });
      console.log('✅ User updated in Firebase Auth\n');
    }

    // Step 3: Set custom claims for role
    console.log('🔐 Setting custom claims (role: admin)...');
    await auth.setCustomUserClaims(ADMIN_CONFIG.uid, {
      role: 'admin',
      department: ADMIN_CONFIG.department,
      adminDepartments: ADMIN_CONFIG.adminDepartments
    });
    console.log('✅ Custom claims set\n');

    // Step 4: Create/update user document in Firestore
    console.log('📊 Creating user document in Firestore...');
    
    const userData = {
      // Basic Info
      uid: ADMIN_CONFIG.uid,
      email: email,
      role: 'admin',
      employeeId: ADMIN_CONFIG.employeeId,
      
      // Personal Details
      firstName: ADMIN_CONFIG.firstName,
      lastName: ADMIN_CONFIG.lastName,
      fullName: ADMIN_CONFIG.fullName,
      avatar: '',
      phone: ADMIN_CONFIG.phoneNumber,
      emergencyContact: '',
      dateOfBirth: null,
      bloodGroup: '',
      address: '',
      
      // Employment Details
      designation: ADMIN_CONFIG.designation,
      department: ADMIN_CONFIG.department,
      location: ADMIN_CONFIG.location,
      shift: ADMIN_CONFIG.shift,
      dateOfJoining: admin.firestore.Timestamp.now(),
      reportingManager: '',
      reportingManagerName: '',
      
      // Education & Skills
      education: [],
      certifications: [],
      skills: [],
      languages: ['English', 'Hindi'],
      
      // Status
      isActive: true,
      lastLogin: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      
      // Admin-specific fields
      permissions: ADMIN_CONFIG.permissions,
      adminDepartments: ADMIN_CONFIG.adminDepartments
    };

    const userRef = db.collection('users').doc(ADMIN_CONFIG.uid);
    await userRef.set(userData, { merge: true });
    console.log('✅ User document created in Firestore\n');

    // Step 5: Verify setup
    console.log('🔍 Verifying setup...');
    const userRecord = await auth.getUser(ADMIN_CONFIG.uid);
    const userDoc = await userRef.get();
    
    if (userDoc.exists && userRecord.customClaims?.role === 'admin') {
      console.log('✅ Verification successful!\n');
      console.log('-----------------------------------');
      console.log('✨ Admin user setup complete! ✨');
      console.log('-----------------------------------\n');
      console.log('🎯 Portal Access ID (UID):');
      console.log('   ' + ADMIN_CONFIG.uid);
      console.log('\nLogin credentials:');
      console.log('📧 Email:', email);
      console.log('🔑 Password:', ADMIN_CONFIG.password);
      console.log('📊 Role: admin');
      console.log('🏢 Department:', ADMIN_CONFIG.department);
      console.log('🎯 Admin Departments:', ADMIN_CONFIG.adminDepartments.join(', '));
      console.log('\n💡 Direct Portal Access:');
      console.log('   Use UID "' + ADMIN_CONFIG.uid + '" for portal routing');
      console.log('\n🎉 Admin portal is ready!\n');
    } else {
      console.log('❌ Verification failed - please check Firestore console');
    }

  } catch (error) {
    console.error('\n❌ Error setting up admin user:', error);
    console.error('\nError details:', error.message);
    process.exit(1);
  }

  process.exit(0);
}

// Run the setup
setupAdminUser();
