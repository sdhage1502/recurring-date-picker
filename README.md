# Recurring Date Picker - TickTick Style Task Management

A professional React-based task management application featuring a sophisticated recurring date picker component, built following TickTick's design principles. This application allows users to create tasks with complex recurring patterns including daily, weekly, monthly, and yearly schedules with advanced customization options.

![Task Management Interface](https://img.shields.io/badge/React-18-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript) ![Firebase](https://img.shields.io/badge/Firebase-9.0-orange?logo=firebase) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.0-blue?logo=tailwindcss)

## 🌟 Features

### 🎯 Core Features
- **Professional Task Management**: Create, edit, and manage tasks with a clean, intuitive interface
- **Advanced Recurring Patterns**: Support for complex schedules like "2nd Tuesday of every month" or "every 3 weeks on Monday and Wednesday"
- **Real-time Calendar Preview**: Interactive mini calendar showing calculated recurring dates as you configure patterns
- **Firebase Integration**: Secure user authentication and cloud data storage with Firestore
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📅 Recurring Date Picker Capabilities
- **Basic Patterns**: Daily, weekly, monthly, yearly recurrence
- **Custom Intervals**: Every X days/weeks/months/years
- **Specific Days**: Choose specific days of the week for weekly patterns
- **Complex Monthly Patterns**: "First Monday", "Last Friday", "2nd Tuesday" of each month
- **Date Ranges**: Set start dates with optional end dates
- **Visual Feedback**: Real-time preview of upcoming recurring dates

### 🔐 Authentication & Security
- Firebase Authentication with email/password and Google sign-in
- Protected routes with automatic redirection
- Persistent user sessions
- Secure user data storage in Firestore

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Firebase project with Authentication and Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recurring-date-picker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password and Google providers
   - Create a Firestore database
   - Add your domain to authorized domains in Authentication settings

4. **Configure environment variables**
   Create a `.env` file with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 🏗️ Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand for global state
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Database**: Firebase Firestore for real-time data sync
- **Authentication**: Firebase Authentication
- **API Pattern**: RESTful API with Express routes

### Key Components

#### 🔄 Recurring Date Picker System
The core feature supporting:
- Multiple recurrence types (daily, weekly, monthly, yearly)
- Advanced customization options
- Real-time date calculation and preview
- Complex patterns like "2nd Tuesday of every 3 months"

#### 🔐 Authentication System
- Firebase Auth integration
- Automatic user document creation in Firestore
- Protected route components
- Session persistence

#### 📋 Task Management
- Professional TickTick-inspired interface
- Task creation with recurring patterns
- Priority levels and due date management
- Real-time data sync with Firestore

## 📱 Usage Guide

### Creating Your First Recurring Task

1. **Sign Up/Login**: Create an account or sign in with Google
2. **Access Dashboard**: Navigate to the main dashboard after authentication
3. **Create Task**: Click the "+" button to open the recurring date picker
4. **Configure Recurrence**:
   - Choose pattern type (Daily, Weekly, Monthly, Yearly)
   - Set custom intervals and specific days
   - Select start and end dates
   - Preview upcoming dates in the calendar
5. **Save Task**: Click "Create Recurring Task" to save

### Supported Recurring Patterns

#### Daily Patterns
- Every day
- Every X days
- Weekdays only

#### Weekly Patterns
- Every week on specific days
- Every X weeks on chosen days
- Custom combinations like "Monday, Wednesday, Friday"

#### Monthly Patterns
- Same date each month (e.g., 15th of every month)
- Relative patterns (e.g., "First Monday", "Last Friday")
- Every X months with custom settings

#### Yearly Patterns
- Same date each year
- Every X years
- Relative yearly patterns

## 🛠️ Development

### Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries and configs
│   │   ├── pages/          # Application pages/routes
│   │   ├── store/          # Zustand state management
│   │   └── utils/          # Helper functions
├── server/                 # Backend Express server
├── shared/                 # Shared types and schemas
└── README.md
```

### Key Technologies
- **React Query**: Server state management and caching
- **date-fns**: Date manipulation and formatting
- **Zod**: Runtime type validation
- **Drizzle ORM**: Type-safe database operations
- **Jest**: Testing framework with React Testing Library

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run test     # Run test suite
npm run lint     # Run ESLint
```

## 🧪 Testing

The project includes comprehensive test coverage:
- Component unit tests
- Integration tests for recurring date calculations
- Authentication flow tests
- Firebase integration tests

Run tests with:
```bash
npm test
```

## 🚀 Deployment

### Replit Deployment
This project is optimized for Replit deployment:
1. Import the project to Replit
2. Set up environment variables in Replit Secrets
3. Click "Run" to start the application
4. Use Replit's deployment feature for production

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Ensure environment variables are configured
4. Set up Firebase hosting rules if needed

## 🔧 Configuration

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication with desired providers
4. Create Firestore database
5. Add your domain to authorized domains
6. Copy configuration values to environment variables

### Environment Variables
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here  
VITE_FIREBASE_APP_ID=your_app_id_here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by TickTick's excellent task management interface
- Built with modern React and TypeScript best practices
- Uses Firebase for reliable authentication and data storage
- Styled with Tailwind CSS and shadcn/ui for a professional look

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs
4. Provide your environment details

---

**Built with ❤️ for professional task management and recurring date scheduling**