import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import * as React from "react";
import Layout from "~/components/Layout";
import { supabase } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Homework | Schooly" },
    { name: "description", content: "Manage homework assignments" },
  ];
};

// In a real app, this would check for authentication
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
  
  // let homeworkData;
  // if (userData?.role === "teacher" || userData?.role === "admin") {
  //   // Teachers see homework they've assigned
  //   const { data } = await supabase
  //     .from("homework")
  //     .select(`
  //       *,
  //       classes:class_id (name)
  //     `)
  //     .eq("teacher_id", session.user.id)
  //     .order("due_date", { ascending: true });
  //   homeworkData = data;
  // } else {
  //   // Students see homework assigned to their classes
  //   const { data } = await supabase
  //     .from("class_enrollments")
  //     .select(`
  //       class_id
  //     `)
  //     .eq("student_id", session.user.id)
  //     .eq("status", "active");
  //   
  //   const classIds = data?.map(enrollment => enrollment.class_id) || [];
  //   
  //   const { data: homeworkForClasses } = await supabase
  //     .from("homework")
  //     .select(`
  //       *,
  //       classes:class_id (name),
  //       submissions:homework_submissions (
  //         id,
  //         status,
  //         score
  //       )
  //     `)
  //     .in("class_id", classIds)
  //     .order("due_date", { ascending: true });
  //   
  //   homeworkData = homeworkForClasses;
  // }
  
  // return json({ user: userData, homework: homeworkData });
  
  // For demo purposes, we'll just return mock data
  return json({
    user: null,
    homework: [
      {
        id: "1",
        title: "Quadratic Equations",
        description: "Complete problems 1-10 on page 45 of the textbook.",
        class_id: "1",
        classes: { name: "Mathematics - Grade 10" },
        due_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        max_score: 100,
        submissions: []
      },
      {
        id: "2",
        title: "Lab Report",
        description: "Write a lab report on the experiment conducted in class.",
        class_id: "3",
        classes: { name: "Science - Grade 10" },
        due_date: new Date(Date.now() + 4 * 86400000).toISOString(), // 4 days from now
        max_score: 50,
        submissions: []
      },
      {
        id: "3",
        title: "History Essay",
        description: "Write a 500-word essay on the Industrial Revolution.",
        class_id: "4",
        classes: { name: "History - Grade 11" },
        due_date: new Date(Date.now() + 7 * 86400000).toISOString(), // 7 days from now
        max_score: 100,
        submissions: []
      }
    ]
  });
}

export default function HomeworkPage() {
  const { homework } = useLoaderData<typeof loader>();
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
  
  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Homework Assignments</h1>
          {(userData.role === "teacher" || userData.role === "admin") && (
            <Link to="/homework/new" className="btn btn-primary">
              Assign New Homework
            </Link>
          )}
        </div>
        
        <div className="space-y-4">
          {homework.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No homework assignments found.
            </p>
          ) : (
            homework.map((hw) => (
              <div key={hw.id} className="card">
                <div className="card-header flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{hw.title}</h2>
                  <span className="text-sm text-gray-600">
                    Due: {new Date(hw.due_date).toLocaleDateString()} at{" "}
                    {new Date(hw.due_date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="card-body">
                  <p className="text-sm text-gray-600 mb-2">
                    Class: {hw.classes.name}
                  </p>
                  <p className="mb-4">{hw.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      Maximum Score: {hw.max_score} points
                    </span>
                    {userData.role === "student" ? (
                      <Link
                        to={`/homework/${hw.id}/submit`}
                        className="btn btn-primary text-sm"
                      >
                        Submit
                      </Link>
                    ) : (
                      <Link
                        to={`/homework/${hw.id}/view`}
                        className="btn btn-secondary text-sm"
                      >
                        View Submissions
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <Outlet />
      </div>
    </Layout>
  );
}