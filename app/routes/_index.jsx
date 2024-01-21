import AuthForm from "../components/AuthForm.jsx";
import { login } from "../data//auth.server.js";
import { validateCredentials } from "../data/validation.server.js";

export default function _index() {
  return <AuthForm />
}

export async function action({ request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  console.log("🚀 ~ action ~ formData:", credentials);

  try {
    validateCredentials(credentials);
    return login(credentials);
  } catch (error) {
    // console.log("🚀 ~ action ~ error:", error);

    if (error.status === 401) {
      return { credentials: error.message };
    }
    return error;
  }

  console.log(credentials);
}