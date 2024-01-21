import { prisma } from "./database.server.js";

export async function addAdmin() {
  try {
    await prisma.Admin.create({
      data: {
        uname: "admin",
        password: "infancy24",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addBed({ name }) {
  try {
    await prisma.Bed.create({
      data: {
        name,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addPatient({
  pname: name,
  mobile: phone,
  bed: bedName,
  due,
}) {
  console.log(
    "🚀 ~ addPatient ~ name, mobile, bed, due:",
    name,
    phone,
    bedName,
    due
  );

  try {
    let bed = null;
    try {
      bed = await prisma.Bed.findFirst({
        where: {
          name: bedName,
        },
      });
      console.log("🚀 ~ addPatient ~ bed:", bed);
      if (!bed || !bed.free) {
        console.log("Bed is occupied");
        throw new Error("Bed is occupied. Patient cannot be admitted.");
      }
    } catch (error) {
      console.log("An error occurred while trying to find a free bed.");
      throw error;
    }
    const patient = await prisma.Patient.create({
      data: {
        name,
        phone,
        due: parseFloat(due),
        bed: {
          connect: {
            id: bed.id,
          },
        },
      },
    });
    await prisma.Bed.update({
      where: {
        id: bed.id,
      },
      data: {
        free: false,
        patientId: patient.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateBedName({ id, name }) {
  try {
    const bed = await prisma.Bed.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    console.log(bed);
  } catch (error) {
    console.log(error);
  }
}

export async function releasePatient({ id }) {
  console.log("🚀 ~ releasePatient ~ id:", id);

  try {
    const bed = await prisma.bed.findFirst({
      where: {
        patientId: id,
      },
    });

    const existingPatient = await prisma.patient.findUnique({
      where: {
        id,
      },
    });
    if (existingPatient && !existingPatient.due) {
      if (bed) {
        await prisma.bed.update({
          where: {
            id: bed.id,
          },
          data: {
            patientId: null,
            free: true,
          },
        });
      } else {
        throw new Error("Bed not found");
      }
      const deletedPatient = await prisma.patient.delete({
        where: {
          id,
        },
      });
      console.log(deletedPatient);
    } else {
      console.log(
        "Patient record does not exist or patient due is not cleared."
      );
    }
  } catch (error) {
    console.log(error);
  }
}

async function addPayment({ pid, amount }) {
  try {
    let patient = await prisma.Patient.findFirst({
      where: {
        id: pid,
      },
    });
    if (patient && patient.due >= amount) {
      const due = patient.due - amount;
      patient = await prisma.patient.update({
        where: {
          id: pid,
        },
        data: {
          due,
        },
      });
    } else {
      console.log("Can't add");
      throw new Error("Can't add");
    }
  } catch (error) {
    console.log(error);
  }
}

async function addDue({ pid, amount }) {
  try {
    let patient = await prisma.Patient.findFirst({
      where: {
        id: pid,
      },
    });
    if (patient) {
      const due = patient.due + amount;
      patient = await prisma.patient.update({
        where: {
          id: pid,
        },
        data: {
          due,
        },
      });
    } else {
      console.log("Can't add");
      throw new Error("Can't add");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllBeds() {
  const beds = await prisma.Bed.findMany();
  console.log(beds);
  return beds;
}

export async function getAllPatients() {
  const pateints = await prisma.Patient.findMany({ include: { bed: true } });
  console.log(pateints);
  return pateints;
}

export async function getSinglePatient({ id }) {
  // console.log("🚀 ~ getSinglePatient ~ id:", id)
  try {
    const singlePatient = await prisma.Patient.findFirst({
      where: { id },
      include: { bed: true },
    });
    // console.log("🚀 ~ getSinglePatient ~ singlePatient:", singlePatient)
    return singlePatient;
  } catch (error) {
    return error;
  }
}

export async function removePatientFromBed(bedName) {
  console.log("🚀 ~ removePatientFromBed ~ bedName:", bedName);
  const bed = await prisma.Bed.findUnique({
    where: {
      name: bedName,
    },
  });
  try {
    await prisma.Bed.update({
      where: {
        id: bed.id,
      },
      data: {
        patientId: null,
        free: true,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function addPatientToBed(pid, bedName) {
  try {
    const bed = await prisma.Bed.findFirst({
      where: {
        name: bedName,
      },
    });
    console.log("🚀 ~ addPatientToBed ~ bed:", bedName);
    await prisma.Bed.update({
      where: {
        id: bed.id,
      },
      data: {
        free: false,
        patientId: pid,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function updatePatientData(id, input) {
  try {
    await removePatientFromBed(input.currentBed);
    await addPatientToBed(id, input.bed.name);
    await prisma.Patient.update({
      where: {
        id,
      },
      data: {
        name: input.pname,
        phone: input.mobile,
        due: parseInt(input.due),
        bed: {
          connect: {
            name: input.bed,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function updateBedData(id, input) {
  await prisma.bed.update({
    where: {
      id,
    },
    data: {
      name: input.name,
    },
  });
}

export async function getAllFreeBeds() {
  const freeBeds = await prisma.bed.findMany({
    where: {
      free: true,
    },
  });
  return freeBeds;
}

export async function getSingleBed(id) {
  return await prisma.bed.findFirst({ where: { id } });
}

export async function deleteBed(id) {
  await prisma.bed.delete({ where: { id } });
}

export async function findBedByName(name) {
  const bed = await prisma.Bed.findFirst({ where: { name } });
  return bed;
}

await addBed({ name: "Bed1" });
// await addPatientToBed({
//   name: "Fardin Kabir",
//   phone: "01234567890",
//   bedId: 8,
//   due: 100.0,
// });
// await releasePatient({ id: 8 });
// await releasePatient({id: 5});

// await addPayment({ pid: 8, amount: 149.7 });
// await addDue({ pid: 8, amount: 50 });

// await getAllBeds();
// await getAllPatients();
// await addPatientToBed(13, "Bed3");
