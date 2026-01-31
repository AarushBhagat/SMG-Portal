/**
 * Update Employee ID for a specific user
 * Run: node update-employee-id.js
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin (will use default credentials)
admin.initializeApp({
  projectId: 'smg-employee-portal'
});

const db = admin.firestore();

const USER_UID = 'ynLwhKuPfRfPRVSWqNUy8jJgF6k1';
const NEW_EMPLOYEE_ID = 'SA002'; // Change this to desired employee ID

async function updateEmployeeId() {
  try {
    console.log('🔧 Updating Employee ID...\n');

    // Reference to user document
    const userRef = db.collection('users').doc(USER_UID);

    // First, check if user exists
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      console.log('❌ User not found with UID:', USER_UID);
      process.exit(1);
    }

    console.log('📄 Current user data:');
    const currentData = userDoc.data();
    console.log('   Name:', currentData.name || currentData.fullName);
    console.log('   Email:', currentData.email);
    console.log('   Current Employee ID:', currentData.employeeId || 'NOT SET');
    console.log('   Role:', currentData.role);
    console.log('   Department:', currentData.department);
    console.log('');

    // Update employee ID
    await userRef.update({
      employeeId: NEW_EMPLOYEE_ID,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('✅ Successfully updated employee ID to:', NEW_EMPLOYEE_ID);
    console.log('');

    // Verify update
    const updatedDoc = await userRef.get();
    const updatedData = updatedDoc.data();
    console.log('✅ Verified - New Employee ID:', updatedData.employeeId);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateEmployeeId();
