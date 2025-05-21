# Schooly - School Management System

Schooly is a comprehensive school management system built with RemixJS, Radix UI, and Supabase. It provides tools for teachers, students, and administrators to manage classes, homework, schedules, and more.

## Features

### For Teachers
- Manage classes and students
- Assign and grade homework
- Track student attendance
- View teaching schedule
- Communicate with students and parents

### For Students
- View and submit homework assignments
- Check grades
- Access class schedule
- Communicate with teachers
- Receive important announcements

### For Administrators
- Manage users and permissions
- Create and organize classes
- Generate reports and analytics
- Send school-wide announcements
- Configure system settings

## Tech Stack

- **Frontend**: [RemixJS](https://remix.run/), [Radix UI](https://www.radix-ui.com/), [TailwindCSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/schooly.git
   cd schooly
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

1. Create a new Supabase project.
2. Use the SQL script in `app/models/database.sql` to set up the database schema.

## Project Structure

- `app/`: Main application code
  - `components/`: Reusable UI components
  - `models/`: Data models and database schema
  - `routes/`: Application routes
  - `styles/`: CSS styles
  - `utils/`: Utility functions
  - `services/`: Service layer for API calls
- `public/`: Static assets

## Demo Accounts

For demonstration purposes, you can use the following accounts:

- **Admin**: Use the "Admin Demo" button on the login page
- **Teacher**: Use the "Teacher Demo" button on the login page
- **Student**: Use the "Student Demo" button on the login page

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [RemixJS](https://remix.run/) for the web framework
- [Radix UI](https://www.radix-ui.com/) for the UI components
- [Supabase](https://supabase.com/) for the backend services
- [TailwindCSS](https://tailwindcss.com/) for styling