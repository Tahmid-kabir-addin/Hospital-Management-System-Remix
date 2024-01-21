import { json } from "@remix-run/react";
import { destroyUserSession } from "../data/auth.server";

export function action({ request }) {
  if (request.method !== "POST")
    throw json({ message: "Invalid Request Method" }, { status: 404 });

  return destroyUserSession(request);
}
