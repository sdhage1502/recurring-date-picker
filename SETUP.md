
# 🚀 Recurring Task Manager Setup Guide

## 📋 Prerequisites

- Node.js 18+ installed
- A Firebase account
- This project running on Replit

## 🔧 Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "recurring-task-manager")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase project, go to **Authentication** → **Sign-in method**
2. Enable the following sign-in providers:
   - **Email/Password**: Click enable and save
   - **Google** (optional): Click enable, add your project support email, save

### 3. Create Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Choose "Start in test mode" for now
3. Select a location close to your users
4. Click "Done"

### 4. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the configuration object

## 🔑 Environment Variables Setup

### 1. In Replit

1. Open the **Secrets** tool in your Replit (lock icon in sidebar)
2. Add the following secrets with your Firebase values:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### 2. Optional Environment Variables

You can also add these for additional configuration:

```
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NODE_ENV=development
```

## 🛡️ Security Rules

### Firestore Security Rules

1. Go to **Firestore Database** → **Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only access their own tasks
    match /tasks/{taskId} {
      allow read, write, delete: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

3. Click **Publish**

### Authentication Domain

1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add your Replit domain (it will look like `https://your-repl-name.your-username.replit.dev`)

## 🏃‍♂️ Running the Application

1. Make sure all environment variables are set in Replit Secrets
2. Click the **Run** button in Replit
3. Wait for the application to start
4. Open the webview to see your application

## ✅ Verification

### Test Authentication
1. Open your application
2. Try signing up with a new email/password
3. Check if you can sign in and out

### Test Firestore
1. Create a test task
2. Check Firebase Console → Firestore Database to see if data is saved
3. Verify that tasks are properly associated with your user ID

### Test Recurring Dates
1. Create a task with recurring pattern
2. Verify the calendar preview shows correct dates
3. Test different recurrence types (daily, weekly, monthly, yearly)

## 🐛 Troubleshooting

### Common Issues

**Firebase connection errors:**
- Verify all environment variables are correctly set
- Check that your domain is authorized in Firebase Authentication settings
- Ensure Firestore rules allow your operations

**Module parsing errors:**
- Clear browser cache and refresh
- Restart the Replit application
- Check console for specific error messages

**Authentication not working:**
- Verify email/password is enabled in Firebase Authentication
- Check if the email is properly formatted
- Ensure your domain is in the authorized domains list

### Getting Help

1. Check the browser console for error messages
2. Review the Replit console for server-side errors
3. Verify your Firebase configuration in the Firebase Console

## 🎨 Customization

### Theming
- Modify `tailwind.config.ts` for custom colors and styling
- Update `app/globals.css` for global styles
- Components are located in `components/ui/` for customization

### Features
- Add new task fields in `shared/schema.js`
- Extend recurrence patterns in `utils/recurrenceUtils.js`
- Modify UI components in `components/` directories

## 📚 Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── recurring/        # Date picker components
│   ├── task/             # Task management components
│   └── ui/               # Reusable UI components
├── lib/                  # Core utilities
│   ├── firebase.js       # Firebase configuration
│   ├── firestore.js      # Database operations
│   └── auth.js           # Authentication utilities
├── store/                # State management (Zustand)
├── utils/                # Utility functions
└── shared/               # Shared schemas and types
```

## 🚀 Deployment

Your app is automatically deployed on Replit when you click Run. For production deployment:

1. Ensure all environment variables are properly set
2. Update Firebase security rules for production
3. Configure your custom domain in Firebase Authentication
4. Test thoroughly in the production environment

Happy coding! 🎉
