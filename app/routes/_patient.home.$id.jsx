import { redirect, useNavigate } from "@remix-run/react";
import Modal from "../components/Modal";
import PatientForm from "../components/PatientForm";
import {
  getAllFreeBeds,
  getSinglePatient,
  releasePatient,
  updatePatientData,
} from "../data/hms.server";
import { validatePatientInput } from "../data/validation.server.js";

export default function SingleExpense() {
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

export async function action({ request, params }) {
  if (request.method === "PATCH") {
    const formData = await request.formData();
    const patientData = Object.fromEntries(formData);
    console.log("🚀 ~ action ~ patientData:", patientData);

    try {
      validatePatientInput(patientData);
    } catch (error) {
      return error;
    }
  
    await updatePatientData(parseInt(params.id), patientData);
  } else if (request.method === "DELETE") {
    try {
      await releasePatient({ id: parseInt(params.id) });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return redirect("/home");
}

export async function loader({ request, params }) {
  let patientData = await getSinglePatient({ id: parseInt(params.id) });

  let freeBeds = await getAllFreeBeds();
  freeBeds.unshift(patientData.bed);
  patientData.freeBeds = freeBeds;

  // console.log("🚀 ~ loader ~ patientData:", patientData);
  return patientData;
}
