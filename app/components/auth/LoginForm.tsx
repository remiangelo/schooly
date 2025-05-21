import * as React from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import * as Label from "@radix-ui/react-label";
import * as Toast from "@radix-ui/react-toast";
import { getSupabaseClient } from "~/utils/supabase.client";

export default function LoginForm() {
  const actionData = useActionData<{ error?: string; success?: boolean }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(false);
  
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.error) {
      setMessage(actionData.error);
      setError(true);
      setOpen(true);
    } else if (actionData?.success) {
      setMessage("Login successful!");
      setError(false);
      setOpen(true);
    }
  }, [actionData]);

  const handleDemoLogin = async (role: "admin" | "teacher" | "student") => {
    // This is just for demo purposes
    // In a real app, you would use Supabase auth
    localStorage.setItem("mockAuth", JSON.stringify({ 
      role, 
      email: `demo-${role}@schooly.com`,
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`
    }));
    window.location.href = "/dashboard";
  };

  return (
    <div className="max-w-md mx-auto">
      <Toast.Provider swipeDirection="right">
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Login</h2>
          </div>
          <div className="card-body">
            <Form method="post" className="space-y-4">
              <div>
                <Label.Root className="form-label" htmlFor="email">
                  Email
                </Label.Root>
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <Label.Root className="form-label" htmlFor="password">
                  Password
                </Label.Root>
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </Form>
            
            <div className="mt-6">
              <p className="text-center text-sm text-gray-600 mb-2">
                Demo Accounts (No password required)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleDemoLogin("admin")}
                  className="btn btn-secondary text-sm"
                >
                  Admin Demo
                </button>
                <button
                  onClick={() => handleDemoLogin("teacher")}
                  className="btn btn-secondary text-sm"
                >
                  Teacher Demo
                </button>
                <button
                  onClick={() => handleDemoLogin("student")}
                  className="btn btn-secondary text-sm"
                >
                  Student Demo
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Toast.Root
          className={`${
            error ? "bg-red-100 border-red-400" : "bg-green-100 border-green-400"
          } border rounded-md shadow-md p-4 fixed bottom-4 right-4 z-50`}
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="font-medium">
            {error ? "Error" : "Success"}
          </Toast.Title>
          <Toast.Description>{message}</Toast.Description>
          <Toast.Close className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            ✕
          </Toast.Close>
        </Toast.Root>
        
        <Toast.Viewport />
      </Toast.Provider>
    </div>
  );
}