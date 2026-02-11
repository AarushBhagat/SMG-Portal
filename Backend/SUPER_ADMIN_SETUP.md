# Super Admin Setup Instructions

## Super Admin Credentials
- **Name**: Mr Praphull Chandra
- **Email**: aarushbhagat093@gmail.com
- **Password**: Aarush@11
- **UID**: Qo0hfHS7m6eQpQElylhe54HPDRG2
- **Role**: super_admin

## Setup Steps

### 1. Run the Setup Script

Navigate to the Backend folder and run the setup script:

```powershell
cd Backend
node setup-super-admin-aarush.js
```

This script will:
- Create/update the user in Firebase Authentication
- Create/update the user document in Firestore with role: 'super_admin'
- Set all necessary user fields

### 2. Verify the Setup

After running the script, you should see output like:
```
🎉 SUCCESS! Super Admin setup complete!

📝 Login Credentials:
   Name: Mr Praphull Chandra
   Email: aarushbhagat093@gmail.com
   Password: Aarush@11
   Role: Super Admin
```

### 3. Test Login

1. Open the application login page
2. Click on "Super Admin Portal" 
3. The email and password fields will auto-fill with super admin credentials
4. Click "Sign In"
5. You should be redirected to the Super Admin Portal (Under Construction page)

## Features

- When you select "Super Admin Portal", the login form automatically fills with your credentials
- The system uses Firebase Authentication for secure login
- User data is stored in Firestore with role-based access control
- Super admin has access to all departments and system-wide features

## Troubleshooting

If login fails:
1. Check Firebase Console > Authentication to verify user exists
2. Check Firestore > users collection > your UID document
3. Ensure the role field is set to 'super_admin'
4. Check browser console for error messages
5. Verify Firebase configuration in `SMG/src/config/firebase.ts`

## Next Steps

Once logged in as super admin, you can:
- Access the Super Admin Portal
- Future features will include:
  - User management
  - Role & permission control
  - System configuration
  - Organization-wide analytics
  - Department oversight
  - Security & audit logs
