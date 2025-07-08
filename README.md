# Yugam Finance Portal

A comprehensive role-based financial management web application for the Yugam festival at Kumaraguru College of Technology. The platform enables secure budgeting, approval workflows, real-time expense tracking, and analytics with detailed audit mechanisms.

## 🚀 Features

### 🔐 Role-Based Access Control
- **Admin**: Full system access, user management, audit logs
- **Event Team Lead**: Create events, manage budgets, track expenses
- **Finance Team**: Review and approve budgets, manage categories
- **Facilities Team**: Add expenses to approved events, manage product catalog
- **Event/Workshop Coordinators**: View expense summaries, download reports

### 💰 Financial Management
- **Budget Planning**: Structured budget creation with predefined categories
- **Approval Workflow**: Finance team review and approval process
- **Expense Tracking**: Real-time expense recording and budget monitoring
- **Sponsor Management**: Track sponsor contributions and adjustments

### 📊 Reporting & Analytics
- **Real-time Dashboards**: Role-specific dashboard views
- **Financial Reports**: Comprehensive event-wise and category-wise reports
- **Export Options**: PDF and CSV export capabilities
- **Budget vs Expense Analysis**: Visual tracking of budget utilization

### 🔔 Notifications & Communication
- **Real-time Notifications**: In-app notification system
- **Email Alerts**: Automated email notifications for key events
- **Activity Logging**: Comprehensive audit trail of all user actions

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **Email**: SMTP integration for notifications
- **Logging**: Winston logger for comprehensive audit trails

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **State Management**: React Context API
- **Routing**: React Router v6

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- SMTP email server access

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd yugam-finance-portal
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your configuration
# DATABASE_URL, JWT_SECRET, EMAIL_* variables

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed initial data (creates admin user)
npm run db:seed

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

## 🔧 Environment Configuration

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Frontend URL
FRONTEND_URL="http://localhost:5173"

# Email Configuration
EMAIL_HOST="smtp.office365.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@domain.com"
EMAIL_PASS="your-email-password"
EMAIL_FROM="Yugam Finance Portal <your-email@domain.com>"

# Server
PORT=5000
NODE_ENV="development"
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 👥 Default User Accounts

### Admin Account
- **Email**: admin@yugam.com
- **Password**: IamAdmin123!@#
- **Role**: Administrator

## 📱 User Roles & Permissions

### 🔑 Admin
- Full system access and control
- User management (CRUD operations)
- Budget category management
- Product catalog management
- System audit logs access
- All financial data visibility

### 👨‍💼 Event Team Lead
- Create and manage events/workshops
- Submit budget proposals
- Track event expenses
- View approval status and feedback
- Receive email notifications

### 💰 Finance Team
- Review and approve/reject budgets
- Modify budget allocations
- Manage budget categories
- Access financial reports
- Product catalog management

### 🏗️ Facilities Team
- Add expenses to approved events
- Manage product catalog
- View approved event budgets
- Real-time expense tracking

### 🎓 Event/Workshop Coordinators
- View assigned event summaries
- Download financial reports
- Monitor budget utilization
- Receive expense notifications

## 🔄 Workflow Process

### 1. Event Creation
1. Event Team Lead creates event with budget proposal
2. System sends notification to Finance Team
3. Event enters "Pending" status

### 2. Budget Review
1. Finance Team reviews budget proposal
2. Can modify amounts and add sponsor contributions
3. Approve or reject with mandatory remarks
4. Email notifications sent to coordinators

### 3. Expense Management
1. Facilities Team adds expenses to approved events
2. Real-time budget tracking and alerts
3. Product catalog integration for quick entry
4. Automatic notifications to coordinators

### 4. Reporting
1. Real-time dashboard updates
2. Comprehensive financial reports
3. Export capabilities for external use
4. Audit trail maintenance

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/me` - Get current user

### Events
- `GET /api/events` - List events (role-filtered)
- `POST /api/events` - Create event
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event

### Budgets
- `GET /api/budgets/event/:eventId` - Get event budgets
- `POST /api/budgets/event/:eventId` - Create/update budgets
- `POST /api/budgets/event/:eventId/approve` - Approve/reject budget

### Expenses
- `GET /api/expenses/event/:eventId` - Get event expenses
- `POST /api/expenses` - Create expense
- `GET /api/expenses/event/:eventId/summary` - Get expense summary

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/mark-all-read` - Mark all as read

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet.js security headers

## 📝 Logging & Audit

- Comprehensive activity logging
- User action tracking
- API request/response logging
- Error logging with Winston
- Admin-accessible audit trails

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

### Environment Variables
Ensure all production environment variables are properly configured, especially:
- Database connection strings
- JWT secrets
- Email server credentials
- CORS origins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

### v1.0.0
- Initial release
- Complete role-based system
- Budget management workflow
- Expense tracking
- Notification system
- Audit logging

---

**Yugam Finance Portal** - Streamlining financial management for Kumaraguru College of Technology's premier festival.