import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import LoginForm from "~/components/auth/LoginForm";
import Layout from "~/components/Layout";
import { supabase } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Login | Schooly" },
    { name: "description", content: "Login to Schooly School Management System" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    // In a real app, this would use Supabase auth
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    
    // if (error) throw error;
    
    // return redirect("/dashboard");
    
    // For demo purposes, we'll just return success
    return json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return json({ error: "Invalid email or password" }, { status: 401 });
  }
}

export default function LoginPage() {
  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Welcome to Schooly
        </h1>
        <LoginForm />
      </div>
    </Layout>
  );
}