const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
// First, try to find the service account key
const possibleKeyPaths = [
  './smg-employee-portal-firebase-adminsdk.json',
  './serviceAccountKey.json',
  './firebase-adminsdk.json',
  '../smg-employee-portal-firebase-adminsdk.json',
];

let serviceAccount = null;
for (const keyPath of possibleKeyPaths) {
  if (fs.existsSync(keyPath)) {
    serviceAccount = require(keyPath);
    console.log(`✅ Found service account key: ${keyPath}\n`);
    break;
  }
}

if (!serviceAccount) {
  console.error('❌ ERROR: Firebase service account key not found!');
  console.error('\nPlease download your Firebase service account key:');
  console.error('1. Go to Firebase Console > Project Settings > Service Accounts');
  console.error('2. Click "Generate New Private Key"');
  console.error('3. Save it as "smg-employee-portal-firebase-adminsdk.json" in the Backend folder');
  console.error('\nOr set the path in the script.\n');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

const SUPER_ADMIN_DATA = {
  uid: 'Qo0hfHS7m6eQpQElylhe54HPDRG2',
  email: 'aarushbhagat093@gmail.com',
  password: 'Aarush@11',
  userData: {
    name: 'Mr Praphull Chandra',
    email: 'aarushbhagat093@gmail.com',
    phone: '+91 98765 00000',
    designation: 'Super Administrator',
    department: 'IT Administration',
    location: 'Head Office',
    joinDate: '2024-01-01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin&backgroundColor=b6e3f4',
    reportingManager: 'Board of Directors',
    role: 'super_admin',
    adminDepartments: ['ALL'], // Super admin has access to all departments
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }
};

async function setupSuperAdmin() {
  console.log('🚀 Setting up Super Admin user...\n');

  try {
    // Step 1: Check if user exists in Firebase Auth
    console.log('📧 Step 1: Checking Firebase Authentication...');
    let userRecord;
    
    try {
      userRecord = await auth.getUser(SUPER_ADMIN_DATA.uid);
      console.log('✅ User exists in Firebase Auth:', userRecord.email);
      
      // Update password if needed
      await auth.updateUser(SUPER_ADMIN_DATA.uid, {
        email: SUPER_ADMIN_DATA.email,
        password: SUPER_ADMIN_DATA.password,
        emailVerified: true
      });
      console.log('✅ User credentials updated');
      
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('⚠️  User not found in Auth, creating new user...');
        userRecord = await auth.createUser({
          uid: SUPER_ADMIN_DATA.uid,
          email: SUPER_ADMIN_DATA.email,
          password: SUPER_ADMIN_DATA.password,
          emailVerified: true,
          displayName: SUPER_ADMIN_DATA.userData.name
        });
        console.log('✅ User created in Firebase Auth');
      } else {
        throw error;
      }
    }

    // Step 2: Create/Update Firestore document
    console.log('\n📄 Step 2: Setting up Firestore document...');
    const userRef = db.collection('users').doc(SUPER_ADMIN_DATA.uid);
    
    await userRef.set(SUPER_ADMIN_DATA.userData, { merge: true });
    console.log('✅ Firestore document created/updated');

    // Step 3: Verify the setup
    console.log('\n✔️  Step 3: Verifying setup...');
    const doc = await userRef.get();
    if (doc.exists) {
      const data = doc.data();
      console.log('✅ Super Admin user verified:');
      console.log('   - Name:', data.name);
      console.log('   - Email:', data.email);
      console.log('   - Role:', data.role);
      console.log('   - UID:', SUPER_ADMIN_DATA.uid);
    }

    console.log('\n🎉 SUCCESS! Super Admin setup complete!\n');
    console.log('📝 Login Credentials:');
    console.log('   Email:', SUPER_ADMIN_DATA.email);
    console.log('   Password:', SUPER_ADMIN_DATA.password);
    console.log('   Role: Super Admin\n');

  } catch (error) {
    console.error('\n❌ Error setting up Super Admin:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Run the setup
setupSuperAdmin();
