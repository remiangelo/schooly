import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import * as React from "react";
import Layout from "~/components/Layout";
import { supabase } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Students | Schooly" },
    { name: "description", content: "Manage students" },
  ];
};

// In a real app, this would check for authentication and admin/teacher role
export async function loader({ request }: LoaderFunctionArgs) {
  // const { data: { session } } = await supabase.auth.getSession();
  // if (!session) {
  //   return redirect("/login");
  // }
  
  // const { data: userData } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("id", session.user.id)
  //   .single();
  
  // if (userData?.role !== "admin" && userData?.role !== "teacher") {
  //   return redirect("/dashboard");
  // }
  
  // let studentsData;
  // if (userData?.role === "admin") {
  //   // Admins see all students
  //   const { data } = await supabase
  //     .from("users")
  //     .select(`
  //       *,
  //       students (*)
  //     `)
  //     .eq("role", "student")
  //     .order("last_name", { ascending: true });
  //   studentsData = data;
  // } else {
  //   // Teachers see students in their classes
  //   const { data: teacherClasses } = await supabase
  //     .from("classes")
  //     .select("id")
  //     .eq("teacher_id", session.user.id);
  //   
  //   const classIds = teacherClasses?.map(c => c.id) || [];
  //   
  //   const { data: enrollments } = await supabase
  //     .from("class_enrollments")
  //     .select(`
  //       student_id
  //     `)
  //     .in("class_id", classIds)
  //     .eq("status", "active");
  //   
  //   const studentIds = [...new Set(enrollments?.map(e => e.student_id) || [])];
  //   
  //   const { data } = await supabase
  //     .from("users")
  //     .select(`
  //       *,
  //       students (*)
  //     `)
  //     .in("id", studentIds)
  //     .order("last_name", { ascending: true });
  //   studentsData = data;
  // }
  
  // return json({ user: userData, students: studentsData });
  
  // For demo purposes, we'll just return mock data
  return json({
    user: null,
    students: [
      {
        id: "1",
        email: "alice.johnson@example.com",
        first_name: "Alice",
        last_name: "Johnson",
        role: "student",
        students: {
          student_id: "S10001",
          grade_level: 10,
          parent_contact: "parent.johnson@example.com"
        }
      },
      {
        id: "2",
        email: "bob.smith@example.com",
        first_name: "Bob",
        last_name: "Smith",
        role: "student",
        students: {
          student_id: "S10002",
          grade_level: 10,
          parent_contact: "parent.smith@example.com"
        }
      },
      {
        id: "3",
        email: "charlie.brown@example.com",
        first_name: "Charlie",
        last_name: "Brown",
        role: "student",
        students: {
          student_id: "S10003",
          grade_level: 11,
          parent_contact: "parent.brown@example.com"
        }
      },
      {
        id: "4",
        email: "diana.miller@example.com",
        first_name: "Diana",
        last_name: "Miller",
        role: "student",
        students: {
          student_id: "S10004",
          grade_level: 11,
          parent_contact: "parent.miller@example.com"
        }
      },
      {
        id: "5",
        email: "edward.davis@example.com",
        first_name: "Edward",
        last_name: "Davis",
        role: "student",
        students: {
          student_id: "S10005",
          grade_level: 12,
          parent_contact: "parent.davis@example.com"
        }
      }
    ]
  });
}

export default function StudentsPage() {
  const { students } = useLoaderData<typeof loader>();
  const [userData, setUserData] = React.useState<{
    role: "admin" | "teacher" | "student";
  } | null>(null);
  
  React.useEffect(() => {
    // In a real app, this would come from the loader
    const mockAuth = localStorage.getItem("mockAuth");
    if (mockAuth) {
      setUserData(JSON.parse(mockAuth));
    } else {
      window.location.href = "/login";
    }
  }, []);
  
  if (!userData) {
    return (
      <Layout>
        <div className="py-8 text-center">Loading...</div>
      </Layout>
    );
  }
  
  if (userData.role === "student") {
    return (
      <Layout>
        <div className="py-8 text-center">
          <p className="text-red-600">You do not have permission to access this page.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Students</h1>
          <Link to="/students/new" className="btn btn-primary">
            Add New Student
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.students.student_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.students.grade_level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.students.parent_contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/students/${student.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </Link>
                    <Link
                      to={`/students/${student.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <Outlet />
      </div>
    </Layout>
  );
}