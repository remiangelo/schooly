import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import * as React from "react";
import Layout from "~/components/Layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Schooly - School Management System" },
    { name: "description", content: "A comprehensive school management system for teachers, students, and administrators" },
  ];
};

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  React.useEffect(() => {
    const mockAuth = localStorage.getItem("mockAuth");
    if (mockAuth) {
      setIsLoggedIn(true);
    }
  }, []);
  
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Schooly</h1>
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive school management system for teachers, students, and administrators
          </p>
          
          {!isLoggedIn && (
            <div className="flex justify-center space-x-4">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold">For Teachers</h2>
            </div>
            <div className="card-body">
              <ul className="space-y-2">
                <li>✓ Manage your classes</li>
                <li>✓ Assign and grade homework</li>
                <li>✓ Track student attendance</li>
                <li>✓ Communicate with students and parents</li>
                <li>✓ View your teaching schedule</li>
              </ul>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold">For Students</h2>
            </div>
            <div className="card-body">
              <ul className="space-y-2">
                <li>✓ View and submit homework</li>
                <li>✓ Check your grades</li>
                <li>✓ Access your class schedule</li>
                <li>✓ Communicate with teachers</li>
                <li>✓ Receive important announcements</li>
              </ul>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold">For Administrators</h2>
            </div>
            <div className="card-body">
              <ul className="space-y-2">
                <li>✓ Manage users and permissions</li>
                <li>✓ Create and organize classes</li>
                <li>✓ Generate reports and analytics</li>
                <li>✓ Send school-wide announcements</li>
                <li>✓ Configure system settings</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Get Started Today</h2>
          <p className="text-lg text-gray-600 mb-8">
            Schooly makes school management easy and efficient. Join thousands of schools already using our platform.
          </p>
          
          {!isLoggedIn ? (
            <Link to="/login" className="btn btn-primary">
              Login to Your Account
            </Link>
          ) : (
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
}