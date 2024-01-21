import { Form, useLoaderData } from "@remix-run/react";

export default function Navbar() {
  return (
    <div className="pt-10 px-20 flex items-center justify-between text-xl">
      <div className="flex gap-4 items-center">
        <img
          src="infancy.png"
          alt="infancyIt"
          className="w-12 h-12 rounded-full"
        />
        <div className="font-bold">Infancy IT</div>
      </div>
      <div>
        <ul className="flex justify-between gap-16 font-bold">
          <li>
            <button>Home</button>
          </li>
          <li>
            <button>Patients</button>
          </li>
          <li>
            <button>Beds</button>
          </li>
        </ul>
      </div>
      <div className="flex gap-4">
        <div className="font-semibold">Admin</div>
        <Form method="post" action="/logout">
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="22"
              className="pt-1 hover:cursor-pointer"
            >
              <path d="M15 3h5a2 2 0 012 2v14a2 2 0 01-2 2h-5M10 17l5-5-5-5M15 12H3" />
            </svg>
          </button>
        </Form>
      </div>
    </div>
  );
}