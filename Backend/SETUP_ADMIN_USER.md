# Setup Admin Users with Specific UIDs

This guide helps you create admin users in Firebase with specific user IDs for the admin dashboard.

## 📋 Prerequisites

1. **Firebase Admin SDK Key** must be in place
   - File: `smg-employee-portal-firebase-adminsdk.json`
   - Location: `Backend/` folder
   - If you don't have it, see `SETUP_SUPER_ADMIN.md` for download instructions

2. **Node.js** installed on your system

---

## 🚀 Quick Setup Steps

### 1. Edit Admin Configuration

Open `setup-admin-user.js` and edit the `ADMIN_CONFIG` object (lines 21-45):

```javascript
const ADMIN_CONFIG = {
  // User credentials
  email: 'your.admin@smg.com',       // ⚠️ CHANGE THIS
  password: 'SecurePassword123',      // ⚠️ CHANGE THIS
  uid: 'SPECIFIC_UID_HERE',           // ⚠️ CHANGE THIS - Your specific UID
  
  // Personal details
  firstName: 'John',                  // ⚠️ CHANGE THIS
  lastName: 'Doe',                    // ⚠️ CHANGE THIS
  fullName: 'John Doe',               // ⚠️ CHANGE THIS
  
  // Employment details
  employeeId: 'SMG-ADM-001',         // ⚠️ CHANGE THIS
  designation: 'Production Manager',  // ⚠️ CHANGE THIS
  department: 'Production',           // ⚠️ CHANGE THIS - Main department
  location: 'Main Factory',
  shift: 'General',
  phoneNumber: '+919876543210',       // ⚠️ CHANGE THIS
  
  // Admin-specific - IMPORTANT!
  adminDepartments: ['Production', 'Quality Control'],  // Departments they manage
  permissions: [
    'view_department_employees',
    'approve_department_requests',
    'manage_department_attendance',
    'view_department_reports'
  ]
};
```

### 2. Run the Setup Script

```bash
cd Backend
node setup-admin-user.js
```

### 3. What the Script Does

The script will automatically:

1. ✅ Create user in Firebase Authentication with your specific UID
2. ✅ Set password and email
3. ✅ Set custom claims (role: "admin")
4. ✅ Create user document in Firestore with all required fields
5. ✅ Set admin permissions and department access
6. ✅ Verify the setup was successful

### 4. Output Example

```
🚀 Setting up Admin User...

📧 Email: john.doe@smg.com
🆔 UID: ADMIN_PROD_001
🏢 Department: Production
📊 Admin Departments: Production, Quality Control

-----------------------------------

✅ User created in Firebase Auth
🔐 Setting custom claims (role: admin)...
✅ Custom claims set
📊 Creating user document in Firestore...
✅ User document created in Firestore
🔍 Verifying setup...
✅ Verification successful!

-----------------------------------
✨ Admin user setup complete! ✨
-----------------------------------

Login credentials:
📧 Email: john.doe@smg.com
🔑 Password: SecurePassword123
🆔 UID: ADMIN_PROD_001
📊 Role: admin
🏢 Department: Production
🎯 Admin Departments: Production, Quality Control

🎉 You can now login to the admin portal!
```

---

## 🔑 Important Fields Explained

### **uid (User ID)**
- This is the **specific ID** you want for this admin
- Must be unique across all users
- Examples: `ADMIN_PROD_001`, `ADMIN_HR_001`, `CUSTOM_UID_123`
- Once created, this cannot be changed

### **department**
- The admin's **primary department**
- This should match one of the departments in `adminDepartments`

### **adminDepartments** (Array)
- **Most important for admin access!**
- List of departments this admin can manage
- Admin will be able to:
  - View all employees in these departments
  - Approve requests from these departments
  - Manage attendance for these departments
  - View reports for these departments

### **permissions** (Array)
- Fine-grained permissions for the admin
- Default admin permissions:
  - `view_department_employees`
  - `approve_department_requests`
  - `manage_department_attendance`
  - `view_department_reports`

---

## 📝 Creating Multiple Admins

To create multiple admins, you have two options:

### Option A: Edit and Run Multiple Times
1. Edit `ADMIN_CONFIG` for first admin
2. Run `node setup-admin-user.js`
3. Edit `ADMIN_CONFIG` for second admin
4. Run again
5. Repeat...

### Option B: Create Multiple Config Files
1. Copy `setup-admin-user.js` to `setup-admin-production.js`
2. Copy `setup-admin-user.js` to `setup-admin-hr.js`
3. Edit each file with different configurations
4. Run each script when needed

---

## 🎯 Example Admin Configurations

### Production Admin
```javascript
const ADMIN_CONFIG = {
  email: 'prod.admin@smg.com',
  password: 'Prod@Admin123',
  uid: 'ADMIN_PROD_001',
  firstName: 'Rajesh',
  lastName: 'Kumar',
  fullName: 'Rajesh Kumar',
  employeeId: 'SMG-PRD-001',
  designation: 'Production Manager',
  department: 'Production',
  adminDepartments: ['Production', 'Assembly', 'Quality Control'],
  // ... rest of config
};
```

### HR Admin
```javascript
const ADMIN_CONFIG = {
  email: 'hr.admin@smg.com',
  password: 'HR@Admin123',
  uid: 'ADMIN_HR_001',
  firstName: 'Priya',
  lastName: 'Sharma',
  fullName: 'Priya Sharma',
  employeeId: 'SMG-HR-001',
  designation: 'HR Manager',
  department: 'Human Resources',
  adminDepartments: ['Human Resources', 'Training'],
  permissions: [
    'view_department_employees',
    'approve_department_requests',
    'manage_department_attendance',
    'view_department_reports',
    'manage_training_sessions'  // Additional permission
  ]
};
```

### IT Admin
```javascript
const ADMIN_CONFIG = {
  email: 'it.admin@smg.com',
  password: 'IT@Admin123',
  uid: 'ADMIN_IT_001',
  firstName: 'Amit',
  lastName: 'Patel',
  fullName: 'Amit Patel',
  employeeId: 'SMG-IT-001',
  designation: 'IT Manager',
  department: 'IT',
  adminDepartments: ['IT', 'Security'],
  permissions: [
    'view_department_employees',
    'approve_department_requests',
    'manage_department_attendance',
    'view_department_reports',
    'manage_system_settings'  // Additional permission
  ]
};
```

---

## 🔒 Security Rules

The admin's access is controlled by Firestore security rules in `firestore-rules/firestore.rules`:

```javascript
// Helper function to check if user manages a department
function managesDepartment(department) {
  return request.auth.token.adminDepartments.hasAny([department]);
}

// Example: Admin can only view employees in their departments
match /users/{userId} {
  allow read: if isAuthenticated() && 
    (isOwner(userId) || 
     managesDepartment(resource.data.department) || 
     isSuperAdmin());
}
```

---

## ✅ Verification Steps

After setup, verify the admin user:

1. **Firebase Console - Authentication**
   - Go to: https://console.firebase.google.com/project/smg-employee-portal/authentication/users
   - Check that user appears with correct email

2. **Firebase Console - Firestore**
   - Go to: https://console.firebase.google.com/project/smg-employee-portal/firestore/data/users
   - Find document with your UID
   - Verify `role` = "admin"
   - Verify `adminDepartments` array is correct

3. **Login to Portal**
   - Navigate to your app (or deployed URL)
   - Login with the email and password
   - Should see admin dashboard with department access

---

## ❓ Troubleshooting

### Error: "User already exists"
The script handles this automatically and will update the existing user.

### Error: "Permission denied"
Make sure `smg-employee-portal-firebase-adminsdk.json` is in the Backend folder.

### Admin can't see department data
1. Check `adminDepartments` array includes the department
2. Verify employees have correct `department` field
3. Check Firestore security rules

### Can't login after setup
1. Verify email and password are correct
2. Check user exists in Firebase Auth console
3. Verify `emailVerified` is true
4. Check that user document exists in Firestore

---

## 🔄 Updating Existing Admin

To update an existing admin's departments or permissions:

1. Edit `ADMIN_CONFIG` with the **same UID**
2. Update the fields you want to change
3. Run the script again
4. The script will update (not recreate) the user

---

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Verify service account key is valid
3. Ensure you have admin access to Firebase project
4. Check `DATABASE_SCHEMA.md` for field requirements

---

## 🎯 Next Steps

After creating admin users:
1. Test login with admin credentials
2. Verify department access works correctly
3. Create employees under those departments
4. Test admin approval workflows
5. Configure admin-specific features in the frontend
