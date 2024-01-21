import { redirect, useNavigate } from "@remix-run/react";
import BedForm from "../components/BedForm.jsx";
import Modal from "../components/Modal";
import { addBed, addPatient } from "../data/hms.server";
import { validateBedInput } from "../data/validation.server.js";

export default function AddBed() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("/home");
  }

  return (
    <Modal onClose={closeHandler}>
      <BedForm />
    </Modal>
  );
}

export async function loader() {
    return null;
}

export async function action({ request }) {
  if (request.method === "POST") {
    const formData = await request.formData();
    const bedData = Object.fromEntries(formData);
    console.log("🚀 ~ action ~ bedData from add:", bedData);

    try {
      validateBedInput(bedData);
    } catch (error) {
      return error;
    }

    await addBed(bedData);
  }
  return redirect("/home");
}
