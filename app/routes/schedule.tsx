import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import * as React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Layout from "~/components/Layout";
import { supabase } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Schedule | Schooly" },
    { name: "description", content: "View your class schedule" },
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
  
  // let scheduleData;
  // if (userData?.role === "teacher" || userData?.role === "admin") {
  //   // Teachers see their teaching schedule
  //   const { data } = await supabase
  //     .from("schedules")
  //     .select(`
  //       *,
  //       classes:class_id (
  //         id,
  //         name,
  //         grade_level,
  //         room
  //       )
  //     `)
  //     .eq("classes.teacher_id", session.user.id)
  //     .order("day_of_week", { ascending: true })
  //     .order("start_time", { ascending: true });
  //   scheduleData = data;
  // } else {
  //   // Students see their class schedule
  //   const { data: enrollments } = await supabase
  //     .from("class_enrollments")
  //     .select(`
  //       class_id
  //     `)
  //     .eq("student_id", session.user.id)
  //     .eq("status", "active");
  //   
  //   const classIds = enrollments?.map(enrollment => enrollment.class_id) || [];
  //   
  //   const { data } = await supabase
  //     .from("schedules")
  //     .select(`
  //       *,
  //       classes:class_id (
  //         id,
  //         name,
  //         grade_level,
  //         room,
  //         teacher:teacher_id (
  //           first_name,
  //           last_name
  //         )
  //       )
  //     `)
  //     .in("class_id", classIds)
  //     .order("day_of_week", { ascending: true })
  //     .order("start_time", { ascending: true });
  //   scheduleData = data;
  // }
  
  // return json({ user: userData, schedule: scheduleData });
  
  // For demo purposes, we'll just return mock data
  return json({
    user: null,
    schedule: [
      {
        id: "1",
        day_of_week: "monday",
        start_time: "09:00:00",
        end_time: "10:30:00",
        classes: {
          id: "1",
          name: "Mathematics - Grade 10",
          room: "101",
          teacher: {
            first_name: "John",
            last_name: "Smith"
          }
        }
      },
      {
        id: "2",
        day_of_week: "monday",
        start_time: "11:00:00",
        end_time: "12:30:00",
        classes: {
          id: "2",
          name: "Mathematics - Grade 11",
          room: "103",
          teacher: {
            first_name: "John",
            last_name: "Smith"
          }
        }
      },
      {
        id: "3",
        day_of_week: "tuesday",
        start_time: "09:00:00",
        end_time: "10:30:00",
        classes: {
          id: "3",
          name: "Science - Grade 10",
          room: "205",
          teacher: {
            first_name: "Jane",
            last_name: "Doe"
          }
        }
      },
      {
        id: "4",
        day_of_week: "wednesday",
        start_time: "09:00:00",
        end_time: "10:30:00",
        classes: {
          id: "1",
          name: "Mathematics - Grade 10",
          room: "101",
          teacher: {
            first_name: "John",
            last_name: "Smith"
          }
        }
      },
      {
        id: "5",
        day_of_week: "wednesday",
        start_time: "11:00:00",
        end_time: "12:30:00",
        classes: {
          id: "2",
          name: "Mathematics - Grade 11",
          room: "103",
          teacher: {
            first_name: "John",
            last_name: "Smith"
          }
        }
      },
      {
        id: "6",
        day_of_week: "thursday",
        start_time: "09:00:00",
        end_time: "10:30:00",
        classes: {
          id: "3",
          name: "Science - Grade 10",
          room: "205",
          teacher: {
            first_name: "Jane",
            last_name: "Doe"
          }
        }
      },
      {
        id: "7",
        day_of_week: "friday",
        start_time: "09:00:00",
        end_time: "10:30:00",
        classes: {
          id: "1",
          name: "Mathematics - Grade 10",
          room: "101",
          teacher: {
            first_name: "John",
            last_name: "Smith"
          }
        }
      },
      {
        id: "8",
        day_of_week: "friday",
        start_time: "11:00:00",
        end_time: "12:30:00",
        classes: {
          id: "4",
          name: "History - Grade 11",
          room: "302",
          teacher: {
            first_name: "Robert",
            last_name: "Johnson"
          }
        }
      }
    ]
  });
}

export default function SchedulePage() {
  const { schedule } = useLoaderData<typeof loader>();
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
  
  // Group schedule by day of week
  const scheduleByDay = schedule.reduce((acc, item) => {
    const day = item.day_of_week;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {} as Record<string, typeof schedule>);
  
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Class Schedule</h1>
        
        <Tabs.Root defaultValue="monday" className="w-full">
          <Tabs.List className="flex border-b border-gray-200 mb-4 overflow-x-auto">
            {days.map((day, index) => (
              scheduleByDay[day] && (
                <Tabs.Trigger
                  key={day}
                  value={day}
                  className="px-4 py-2 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 whitespace-nowrap"
                >
                  {dayLabels[index]}
                </Tabs.Trigger>
              )
            ))}
          </Tabs.List>
          
          {days.map((day) => (
            scheduleByDay[day] && (
              <Tabs.Content key={day} value={day} className="p-4 bg-gray-50 rounded-md">
                <div className="space-y-3">
                  {scheduleByDay[day].map((item) => (
                    <div key={item.id} className="p-4 bg-white rounded border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{item.classes.name}</h3>
                          <p className="text-sm text-gray-600">
                            Room: {item.classes.room} • {formatTime(item.start_time)} - {formatTime(item.end_time)}
                          </p>
                          {userData.role === "student" && (
                            <p className="text-sm text-gray-600 mt-1">
                              Teacher: {item.classes.teacher.first_name} {item.classes.teacher.last_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tabs.Content>
            )
          ))}
        </Tabs.Root>
      </div>
    </Layout>
  );
}

function formatTime(timeString: string) {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}