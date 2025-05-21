export interface User {
  id: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export interface Student extends User {
  role: 'student';
  student_id: string; // Unique student ID
  grade_level: number;
  parent_contact: string;
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
  department: string;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export interface Class {
  id: string;
  name: string;
  description: string;
  teacher_id: string;
  grade_level: number;
  subject: string;
  room: string;
  created_at: string;
  updated_at: string;
}

export interface ClassEnrollment {
  id: string;
  class_id: string;
  student_id: string;
  enrollment_date: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  class_id: string;
  teacher_id: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  max_score: number;
}

export interface HomeworkSubmission {
  id: string;
  homework_id: string;
  student_id: string;
  submission_date: string;
  status: 'submitted' | 'late' | 'graded';
  score: number | null;
  feedback: string | null;
  attachment_url: string | null;
}

export interface Schedule {
  id: string;
  class_id: string;
  day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  start_time: string;
  end_time: string;
  recurring: boolean;
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: string;
  class_id: string;
  student_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author_id: string;
  target_audience: 'all' | 'teachers' | 'students' | 'parents' | 'class';
  target_class_id: string | null;
  created_at: string;
  updated_at: string;
}