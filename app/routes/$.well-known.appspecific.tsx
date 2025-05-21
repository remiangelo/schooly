import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export function loader({ request }: LoaderFunctionArgs) {
  // Return an empty JSON response for any requests to /.well-known/appspecific/
  return json({});
}

// No need for a default export since we're just handling the API request