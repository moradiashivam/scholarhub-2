# Installation Guide for ScholarHub

## Prerequisites

1. **Database Setup**
   - MySQL 8.0 or higher
   - MySQL Workbench (optional, for database management)

2. **Environment Setup**
   - Node.js 18 or higher
   - npm 9 or higher

## Step-by-Step Installation

### 1. Database Setup

1. Create a new MySQL database:
```sql
CREATE DATABASE scholarhub;
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=scholarhub
```

### 2. Application Setup

1. Install dependencies:
```bash
npm install
```

2. Run database migrations:
```bash
npm run db:migrate
```

3. Start the application:
```bash
npm run dev
```

### 3. First-Time User Registration

1. Visit `http://localhost:3000/register`
2. Fill in the registration form:
   - Full Name
   - Email ID
   - Password (minimum 8 characters)
   - Confirm Password

### 4. Troubleshooting

#### Database Connection Issues
1. Check if MySQL is running:
```bash
mysql --version
sudo service mysql status
```

2. Verify database credentials in `.env`

3. Test database connection:
```bash
mysql -u your_username -p
```

#### Common Issues

1. **Can't connect to MySQL**
   - Check if MySQL service is running
   - Verify port number
   - Check credentials

2. **Migration fails**
   - Ensure database exists
   - Check user permissions
   - Review migration logs

## Support

For additional help:
- Email: support@scholarhub.com
- Documentation: https://docs.scholarhub.com