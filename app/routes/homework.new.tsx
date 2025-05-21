import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import * as React from "react";
import HomeworkForm from "~/components/homework/HomeworkForm";
import Layout from "~/components/Layout";
import { supabase } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Assign Homework | Schooly" },
    { name: "description", content: "Assign homework to students" },
  ];
};

// In a real app, this would check for authentication and teacher role
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
  
  // if (userData?.role !== "teacher" && userData?.role !== "admin") {
  //   return redirect("/dashboard");
  // }
  
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const classId = formData.get("class_id") as string;
  const dueDate = formData.get("due_date") as string;
  const dueTime = formData.get("due_time") as string;
  const maxScore = parseInt(formData.get("max_score") as string, 10);
  const notifyStudents = formData.get("notify_students") === "on";

  if (!title || !description || !classId || !dueDate || !dueTime || isNaN(maxScore)) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    // In a real app, this would save to Supabase
    // const { data, error } = await supabase.from("homework").insert({
    //   title,
    //   description,
    //   class_id: classId,
    //   teacher_id: session.user.id,
    //   due_date: `${dueDate}T${dueTime}:00`,
    //   max_score: maxScore,
    // });
    
    // if (error) throw error;
    
    // if (notifyStudents) {
    //   // Send email notifications to students
    // }
    
    // return redirect("/homework");
    
    // For demo purposes, we'll just return success
    console.log("Homework assigned:", {
      title,
      description,
      classId,
      dueDate,
      dueTime,
      maxScore,
      notifyStudents,
    });
    
    return json({ success: true });
  } catch (error) {
    console.error("Error assigning homework:", error);
    return json({ error: "Failed to assign homework" }, { status: 500 });
  }
}

export default function NewHomeworkPage() {
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Assign New Homework</h1>
        <HomeworkForm />
      </div>
    </Layout>
  );
}