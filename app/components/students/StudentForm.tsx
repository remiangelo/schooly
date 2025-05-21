import * as React from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import * as Label from "@radix-ui/react-label";
import * as Toast from "@radix-ui/react-toast";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export default function StudentForm() {
  const actionData = useActionData<{ error?: string; success?: boolean }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(false);
  
  React.useEffect(() => {
    if (actionData?.error) {
      setMessage(actionData.error);
      setError(true);
      setOpen(true);
    } else if (actionData?.success) {
      setMessage("Student added successfully!");
      setError(false);
      setOpen(true);
    }
  }, [actionData]);

  return (
    <div className="max-w-2xl mx-auto">
      <Toast.Provider swipeDirection="right">
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Add New Student</h2>
          </div>
          <div className="card-body">
            <Form method="post" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label.Root className="form-label" htmlFor="first_name">
                    First Name
                  </Label.Root>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <Label.Root className="form-label" htmlFor="last_name">
                    Last Name
                  </Label.Root>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label.Root className="form-label" htmlFor="email">
                  Email
                </Label.Root>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <Label.Root className="form-label" htmlFor="student_id">
                  Student ID
                </Label.Root>
                <input
                  id="student_id"
                  name="student_id"
                  type="text"
                  className="form-input"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Unique identifier for the student
                </p>
              </div>
              
              <div>
                <Label.Root className="form-label" htmlFor="grade_level">
                  Grade Level
                </Label.Root>
                <div className="relative">
                  <Select.Root name="grade_level">
                    <Select.Trigger
                      className="form-input flex justify-between items-center"
                      aria-label="Grade Level"
                    >
                      <Select.Value placeholder="Select a grade level" />
                      <Select.Icon>
                        <ChevronDownIcon />
                      </Select.Icon>
                    </Select.Trigger>
                    
                    <Select.Portal>
                      <Select.Content
                        className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden"
                        position="popper"
                      >
                        <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                          <ChevronUpIcon />
                        </Select.ScrollUpButton>
                        
                        <Select.Viewport className="p-1">
                          {[9, 10, 11, 12].map((grade) => (
                            <Select.Item
                              key={grade}
                              value={grade.toString()}
                              className="relative flex items-center px-8 py-2 rounded text-sm text-gray-700 hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100"
                            >
                              <Select.ItemText>Grade {grade}</Select.ItemText>
                              <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                <CheckIcon />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                        
                        <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                          <ChevronDownIcon />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </div>
              
              <div>
                <Label.Root className="form-label" htmlFor="parent_contact">
                  Parent Contact
                </Label.Root>
                <input
                  id="parent_contact"
                  name="parent_contact"
                  type="text"
                  className="form-input"
                  placeholder="Email or phone number"
                  required
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Student"}
                </button>
              </div>
            </Form>
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