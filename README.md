# Yugam Finance Portal

A comprehensive role-based financial management web application for the Yugam festival at Kumaraguru College of Technology. The platform enables secure budgeting, approval workflows, real-time expense tracking, and analytics with detailed audit mechanisms.

## 🚀 Features

### 🔐 Role-Based Access Control
- **Admin**: Full system access, user management, venue management, audit logs, notification creation
- **Event Team Lead**: Create events, manage budgets, track expenses
- **Workshop Team Lead**: Create workshops, manage budgets, track expenses
- **Finance Team**: Review and approve budgets, manage categories
- **Facilities Team**: Add expenses to approved events, manage venues, product catalog
- **Event/Workshop Coordinators**: View expense summaries, download reports

### 💰 Financial Management
- **Budget Planning**: Structured budget creation with admin-managed categories
- **Approval Workflow**: Finance team review and approval process
- **Expense Tracking**: Real-time expense recording and budget monitoring
- **Sponsor Management**: Track sponsor contributions and adjustments

### 🏢 Venue Management
- **Venue CRUD**: Admin and Facilities team can manage venues
- **Venue Assignment**: Facilities team assigns venues to approved events
- **Filtering**: Advanced filters for venue assignment based on date, type, status

### 📊 Reporting & Analytics
- **Real-time Dashboards**: Role-specific dashboard views
- **Financial Reports**: Comprehensive event-wise and category-wise reports
- **Export Options**: PDF and CSV export capabilities with bulk upload templates
- **Budget vs Expense Analysis**: Visual tracking of budget utilization

### 🔔 Notifications & Communication
- **Admin Notifications**: Admins can create and send notifications to specific roles or all users
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
- **Styling**: Tailwind CSS (Blue color scheme as per design requirements)
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

# Seed initial data (creates admin user and default data)
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
- **Email**: admin@yugam.in
- **Password**: IamAdmin123!@#
- **Role**: Administrator

## 📱 User Roles & Permissions

### 🔑 Admin
- Full system access and control
- User management (CRUD operations)
- Venue management (CRUD operations)
- Budget category management
- Product catalog management
- System audit logs access
- Create and send notifications to users
- Separate pages for event and workshop management

### 👨‍💼 Event Team Lead
- Create and manage events
- Submit budget proposals (categories managed by admin)
- Track event expenses
- View approval status and feedback

### 👩‍🏫 Workshop Team Lead
- Create and manage workshops
- Submit budget proposals (categories managed by admin)
- Track workshop expenses
- View approval status and feedback

### 💰 Finance Team
- Review and approve/reject budgets
- Modify budget allocations
- Manage budget categories
- Access financial reports
- Product catalog management

### 🏗️ Facilities Team
- Add expenses to approved events
- Manage venues (CRUD operations)
- Assign venues to approved events/workshops
- Manage product catalog
- Real-time expense tracking

### 🎓 Event/Workshop Coordinators
- View assigned event/workshop summaries
- Download financial reports
- Monitor budget utilization
- Receive expense notifications

## 🔄 Workflow Process

### 1. Event/Workshop Creation
1. Team Lead creates event/workshop with budget proposal
2. Budget categories are pre-defined by admin
3. System sends notification to Finance Team
4. Event enters "Pending" status

### 2. Budget Review
1. Finance Team reviews budget proposal
2. Can modify amounts and add sponsor contributions
3. Approve or reject with mandatory remarks
4. Email notifications sent to coordinators

### 3. Venue Assignment
1. Facilities Team views approved events/workshops
2. Assigns venues using filtering system
3. Real-time venue availability tracking

### 4. Expense Management
1. Facilities Team adds expenses to approved events
2. Real-time budget tracking and alerts
3. Product catalog integration for quick entry
4. Automatic notifications to coordinators

### 5. Reporting
1. Real-time dashboard updates
2. Comprehensive financial reports
3. Export capabilities with bulk upload options
4. Audit trail maintenance

## 🎨 Design Guidelines

- **Color Scheme**: Blue-based design as per provided mockups
- **No Gradients**: Clean, flat design approach
- **Consistent UI**: Blue buttons, blue accents, professional appearance
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: High contrast ratios and readable fonts

## 📊 Key Features

### Venue Management
- CRUD operations for venues
- Capacity and facility tracking
- Assignment to events/workshops
- Advanced filtering for assignment

### Notification System
- Admin can create notifications
- Target specific roles or all users
- Real-time in-app notifications
- Email integration

### Bulk Operations
- Bulk upload capabilities with template downloads
- User management bulk operations
- Data export in multiple formats

### Enhanced Security
- JWT-based authentication
- Role-based access control
- Activity logging and audit trails
- Password complexity requirements

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

### v2.0.0
- Added Workshop Team Lead and Workshop Coordinator roles
- Implemented venue management system
- Added admin notification creation
- Separated event and workshop management
- Removed gradients, implemented blue color scheme
- Added bulk upload capabilities
- Enhanced role-based page organization
- Improved security and audit logging

### v1.0.0
- Initial release
- Basic role-based system
- Budget management workflow
- Expense tracking
- Notification system
- Audit logging

---

**Yugam Finance Portal** - Streamlining financial management for Kumaraguru College of Technology's premier festival.