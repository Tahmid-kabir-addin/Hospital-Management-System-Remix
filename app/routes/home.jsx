import { redirect, useLoaderData, useMatches } from "@remix-run/react";
import DataTable from "../components/DataTable";
import Navbar from "../components/Navbar";
import { getUserFromSession } from "../data/auth.server";

import BedTable from "../components/BedTable.jsx";
import { getAllBeds, getAllPatients } from "../data/hms.server.js";

export default function home() {
  const routes = useMatches();
  const data = useLoaderData();

  return (
    <>
      <Navbar />
      <div className="flex w-screen justify-center px-20 mt-10">
        <DataTable data={data[0]} />
        <div className="border-r-2 border-dotted border-gray-400 pr-4 mt-10"></div>
        <BedTable beds={data[1]} />
      </div>
    </>
  );
}

export async function loader({ request }) {
  const uname = await getUserFromSession(request);
  // console.log("🚀 ~ loader ~ uname:", uname);
  if (!uname) return redirect("/");
  const patientData = await getAllPatients();
  const beds = await getAllBeds();
  const data = [patientData, beds];
  console.log("🚀 ~ loader ~ data:", data);
  // console.log("🚀 ~ loader ~ patientData:", patientData);
  return data;
}
