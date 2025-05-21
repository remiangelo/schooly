import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import * as React from "react";
import StudentForm from "~/components/students/StudentForm";
import Layout from "~/components/Layout";
import { supabase } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Student | Schooly" },
    { name: "description", content: "Add a new student to the system" },
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
  
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const studentId = formData.get("student_id") as string;
  const gradeLevel = parseInt(formData.get("grade_level") as string, 10);
  const parentContact = formData.get("parent_contact") as string;

  if (!firstName || !lastName || !email || !studentId || isNaN(gradeLevel) || !parentContact) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    // In a real app, this would save to Supabase
    // First create the user
    // const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    //   email,
    //   password: generateRandomPassword(), // You'd need a function to generate a secure random password
    //   email_confirm: true,
    //   user_metadata: {
    //     first_name: firstName,
    //     last_name: lastName,
    //     role: "student"
    //   }
    // });
    
    // if (userError) throw userError;
    
    // Then add the user to the users table
    // const { data: userRecord, error: userRecordError } = await supabase
    //   .from("users")
    //   .insert({
    //     id: userData.user.id,
    //     email,
    //     first_name: firstName,
    //     last_name: lastName,
    //     role: "student"
    //   });
    
    // if (userRecordError) throw userRecordError;
    
    // Then add the student-specific data
    // const { error: studentError } = await supabase
    //   .from("students")
    //   .insert({
    //     user_id: userData.user.id,
    //     student_id: studentId,
    //     grade_level: gradeLevel,
    //     parent_contact: parentContact
    //   });
    
    // if (studentError) throw studentError;
    
    // return redirect("/students");
    
    // For demo purposes, we'll just return success
    console.log("Student added:", {
      firstName,
      lastName,
      email,
      studentId,
      gradeLevel,
      parentContact,
    });
    
    return json({ success: true });
  } catch (error) {
    console.error("Error adding student:", error);
    return json({ error: "Failed to add student" }, { status: 500 });
  }
}

export default function NewStudentPage() {
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
        <h1 className="text-2xl font-bold mb-6">Add New Student</h1>
        <StudentForm />
      </div>
    </Layout>
  );
}