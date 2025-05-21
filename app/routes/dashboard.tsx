import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import * as React from "react";
import Layout from "~/components/Layout";
import * as Tabs from "@radix-ui/react-tabs";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | Schooly" },
    { name: "description", content: "Schooly School Management System Dashboard" },
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
  
  // return json({ user: userData });
  
  // For demo purposes, we'll just return mock data
  return json({ user: null });
}

export default function DashboardPage() {
  const { user } = useLoaderData<typeof loader>();
  const [userData, setUserData] = React.useState<{
    role: "admin" | "teacher" | "student";
    name: string;
    email: string;
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
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="card mb-6">
          <div className="card-header">
            <h2 className="text-lg font-semibold">Welcome, {userData.name}</h2>
          </div>
          <div className="card-body">
            <p>Role: {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}</p>
            <p>Email: {userData.email}</p>
          </div>
        </div>
        
        <Tabs.Root defaultValue="overview" className="w-full">
          <Tabs.List className="flex border-b border-gray-200 mb-4">
            <Tabs.Trigger
              value="overview"
              className="px-4 py-2 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
            >
              Overview
            </Tabs.Trigger>
            
            {userData.role === "admin" && (
              <Tabs.Trigger
                value="stats"
                className="px-4 py-2 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                School Statistics
              </Tabs.Trigger>
            )}
            
            {userData.role === "teacher" && (
              <Tabs.Trigger
                value="classes"
                className="px-4 py-2 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                My Classes
              </Tabs.Trigger>
            )}
            
            {userData.role === "student" && (
              <Tabs.Trigger
                value="assignments"
                className="px-4 py-2 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                My Assignments
              </Tabs.Trigger>
            )}
            
            <Tabs.Trigger
              value="announcements"
              className="px-4 py-2 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
            >
              Announcements
            </Tabs.Trigger>
          </Tabs.List>
          
          <Tabs.Content value="overview" className="p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-4">Today's Schedule</h3>
            <div className="space-y-2">
              {userData.role === "admin" ? (
                <p>No classes scheduled for administrators.</p>
              ) : userData.role === "teacher" ? (
                <>
                  <div className="p-3 bg-white rounded border border-gray-200">
                    <p className="font-medium">Mathematics - Grade 10</p>
                    <p className="text-sm text-gray-600">Room 101 • 9:00 AM - 10:30 AM</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-gray-200">
                    <p className="font-medium">Mathematics - Grade 11</p>
                    <p className="text-sm text-gray-600">Room 103 • 11:00 AM - 12:30 PM</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-white rounded border border-gray-200">
                    <p className="font-medium">Mathematics</p>
                    <p className="text-sm text-gray-600">Room 101 • 9:00 AM - 10:30 AM</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-gray-200">
                    <p className="font-medium">Science</p>
                    <p className="text-sm text-gray-600">Room 205 • 11:00 AM - 12:30 PM</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-gray-200">
                    <p className="font-medium">History</p>
                    <p className="text-sm text-gray-600">Room 302 • 2:00 PM - 3:30 PM</p>
                  </div>
                </>
              )}
            </div>
          </Tabs.Content>
          
          {userData.role === "admin" && (
            <Tabs.Content value="stats" className="p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium mb-4">School Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded border border-gray-200">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">1,245</p>
                </div>
                <div className="p-4 bg-white rounded border border-gray-200">
                  <p className="text-sm text-gray-600">Total Teachers</p>
                  <p className="text-2xl font-bold">78</p>
                </div>
                <div className="p-4 bg-white rounded border border-gray-200">
                  <p className="text-sm text-gray-600">Total Classes</p>
                  <p className="text-2xl font-bold">92</p>
                </div>
              </div>
            </Tabs.Content>
          )}
          
          {userData.role === "teacher" && (
            <Tabs.Content value="classes" className="p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium mb-4">My Classes</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Mathematics - Grade 10</h4>
                      <p className="text-sm text-gray-600">Room 101 • MWF 9:00 AM - 10:30 AM</p>
                      <p className="text-sm text-gray-600 mt-1">32 students enrolled</p>
                    </div>
                    <div>
                      <button className="btn btn-secondary text-sm">View Details</button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Mathematics - Grade 11</h4>
                      <p className="text-sm text-gray-600">Room 103 • MWF 11:00 AM - 12:30 PM</p>
                      <p className="text-sm text-gray-600 mt-1">28 students enrolled</p>
                    </div>
                    <div>
                      <button className="btn btn-secondary text-sm">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Content>
          )}
          
          {userData.role === "student" && (
            <Tabs.Content value="assignments" className="p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium mb-4">My Assignments</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Mathematics - Quadratic Equations</h4>
                      <p className="text-sm text-gray-600">Due: Tomorrow at 11:59 PM</p>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Science - Lab Report</h4>
                      <p className="text-sm text-gray-600">Due: Friday at 11:59 PM</p>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">History - Essay</h4>
                      <p className="text-sm text-gray-600">Due: Next Monday at 11:59 PM</p>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Content>
          )}
          
          <Tabs.Content value="announcements" className="p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-4">Announcements</h3>
            <div className="space-y-3">
              <div className="p-4 bg-white rounded border border-gray-200">
                <h4 className="font-medium">School Closure - Staff Development Day</h4>
                <p className="text-sm text-gray-600 mb-2">Posted by: Admin • 2 days ago</p>
                <p>The school will be closed on Friday, October 15th for staff development. Classes will resume on Monday, October 18th.</p>
              </div>
              <div className="p-4 bg-white rounded border border-gray-200">
                <h4 className="font-medium">Parent-Teacher Conferences</h4>
                <p className="text-sm text-gray-600 mb-2">Posted by: Admin • 1 week ago</p>
                <p>Parent-teacher conferences will be held on October 20th and 21st. Please sign up for a time slot with your child's teachers.</p>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Layout>
  );
}