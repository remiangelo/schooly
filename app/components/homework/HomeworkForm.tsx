import * as React from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import * as Label from "@radix-ui/react-label";
import * as Toast from "@radix-ui/react-toast";
import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export default function HomeworkForm() {
  const actionData = useActionData<{ error?: string; success?: boolean }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(false);
  
  // Mock data for classes
  const classes = [
    { id: "1", name: "Mathematics - Grade 10" },
    { id: "2", name: "Mathematics - Grade 11" },
    { id: "3", name: "Science - Grade 10" },
    { id: "4", name: "History - Grade 11" },
  ];

  React.useEffect(() => {
    if (actionData?.error) {
      setMessage(actionData.error);
      setError(true);
      setOpen(true);
    } else if (actionData?.success) {
      setMessage("Homework assigned successfully!");
      setError(false);
      setOpen(true);
    }
  }, [actionData]);

  return (
    <div className="max-w-2xl mx-auto">
      <Toast.Provider swipeDirection="right">
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Assign Homework</h2>
          </div>
          <div className="card-body">
            <Form method="post" className="space-y-4">
              <div>
                <Label.Root className="form-label" htmlFor="title">
                  Title
                </Label.Root>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <Label.Root className="form-label" htmlFor="description">
                  Description
                </Label.Root>
                <textarea
                  id="description"
                  name="description"
                  className="form-input min-h-[100px]"
                  required
                />
              </div>
              
              <div>
                <Label.Root className="form-label" htmlFor="class">
                  Class
                </Label.Root>
                <div className="relative">
                  <Select.Root name="class_id">
                    <Select.Trigger
                      className="form-input flex justify-between items-center"
                      aria-label="Class"
                    >
                      <Select.Value placeholder="Select a class" />
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
                          {classes.map((classItem) => (
                            <Select.Item
                              key={classItem.id}
                              value={classItem.id}
                              className="relative flex items-center px-8 py-2 rounded text-sm text-gray-700 hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100"
                            >
                              <Select.ItemText>{classItem.name}</Select.ItemText>
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label.Root className="form-label" htmlFor="due_date">
                    Due Date
                  </Label.Root>
                  <input
                    id="due_date"
                    name="due_date"
                    type="date"
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <Label.Root className="form-label" htmlFor="due_time">
                    Due Time
                  </Label.Root>
                  <input
                    id="due_time"
                    name="due_time"
                    type="time"
                    className="form-input"
                    defaultValue="23:59"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label.Root className="form-label" htmlFor="max_score">
                  Maximum Score
                </Label.Root>
                <input
                  id="max_score"
                  name="max_score"
                  type="number"
                  min="0"
                  className="form-input"
                  defaultValue="100"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox.Root
                  id="notify_students"
                  name="notify_students"
                  className="w-5 h-5 border border-gray-300 rounded bg-white flex items-center justify-center"
                  defaultChecked
                >
                  <Checkbox.Indicator>
                    <CheckIcon className="text-blue-600" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <Label.Root className="text-sm text-gray-700" htmlFor="notify_students">
                  Notify students via email
                </Label.Root>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Assigning..." : "Assign Homework"}
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