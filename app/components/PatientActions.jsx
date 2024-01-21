import { Link, useFetcher } from "@remix-run/react";

export default function PatientActions({ id, due }) {
  const fetcher = useFetcher();
  function handleDelete(e) {
    const proceed = confirm("Are you sure? Do you want to delete this?");
    if (proceed) {
      fetcher.submit(null, {
        method: "DELETE",
        action: `/home/${id}`,
      });
    } else return;
  }
  return (
    <div className="flex w-[50px] items-center justify-center gap-4">
      <Link to={`/patient/${id}`}>
        <img src="pencil.png" alt="edit" className="w-4 h-4" />
      </Link>
      {due === 0 && (
        <button onClick={handleDelete}>
          <img src="delete.png" alt="delete" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
