import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./database.server.js";

const sessionSecret = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(uname, redirectPath) {
  console.log("🚀 ~ createUserSession ~ uname:", uname);
  const session = await sessionStorage.getSession();

  session.set("uname", uname);
  console.log("🚀 ~ createUserSession ~ session:", session.get("uname"));

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function login({ uname, password }) {
  const user = await prisma.Admin.findFirst({ where: { uname } });

  if (!user) {
    const error = new Error("A user with the provided username doesn't exist.");
    error.status = 401;
    throw error;
  }
  if (user.password !== password) {
    const error = new Error("Incorrect password. Please try again.");
    error.status = 401;
    throw error;
  }

  // creating session cookie
  return createUserSession(uname, "/home");
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const uname = session.get("uname");

  return uname ?? null;
}

export async function destroyUserSession(request) {
  console.log("🚀 ~ destroyUserSession ~ request:", request.headers);

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request) {
  const uname = await getUserFromSession(request);

  if (!uname) {
    throw redirect("/");
  } else throw redirect("/home");
}
