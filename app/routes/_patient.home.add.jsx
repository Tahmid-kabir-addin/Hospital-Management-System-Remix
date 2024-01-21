import { redirect, useNavigate } from "@remix-run/react";
import Modal from "../components/Modal";
import PatientForm from "../components/PatientForm";
import { addPatient, getAllFreeBeds } from "../data/hms.server";
import { validatePatientInput } from "../data/validation.server.js";


export default function AddPatient() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("/home");
  }

  return (
    <Modal onClose={closeHandler}>
      <PatientForm />
    </Modal>
  );
}

export async function loader() {
  let freeBeds = await getAllFreeBeds();
  let p = { freeBeds };
  // console.log("🚀 ~ loader ~ patientData:", patientData);
  return p;
}

export async function action({ request }) {
  if (request.method === "POST") {
    const formData = await request.formData();
    const patientData = Object.fromEntries(formData);
    console.log("🚀 ~ action ~ patientData from add:", patientData)

    try {
      validatePatientInput(patientData);
    } catch (error) {
      return error;
    }

    await addPatient(patientData);
  }
  return redirect("/home");
}
