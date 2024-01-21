import { redirect, useNavigate } from "@remix-run/react";
import BedForm from "../components/BedForm.jsx";
import Modal from "../components/Modal";
import { deleteBed, getSingleBed, updateBedData } from "../data/hms.server";
import { validateBedInput } from "../data/validation.server.js";

export default function SingleExpense() {
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

export async function action({ request, params }) {
  if (request.method === "PATCH") {
    const formData = await request.formData();
    const bedData = Object.fromEntries(formData);
    console.log("🚀 ~ action ~ bedData:", bedData);

    try {
      validateBedInput(bedData);
    } catch (error) {
      return error;
    }

    await updateBedData(parseInt(params.id), bedData);
  } else if (request.method === "DELETE") {
    try {
      await deleteBed(parseInt(params.id));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return redirect("/home");
}

export async function loader({ request, params }) {
  let bedData = await getSingleBed(parseInt(params.id));

  // console.log("🚀 ~ loader ~ bedData:", bedData);
  return bedData;
}
