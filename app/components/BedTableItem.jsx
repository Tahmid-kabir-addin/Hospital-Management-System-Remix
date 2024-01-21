import { TableCell, TableRow } from "@/components/ui/table";
import { Link, useFetcher } from "@remix-run/react";

export default function DataTableItem({ bed }) {
  console.log("🚀 ~ DataTableItem ~ p:", bed);

  const fetcher = useFetcher();
  function handleDelete(e) {
    const proceed = confirm("Are you sure? Do you want to delete this bed?");
    if (proceed) {
      fetcher.submit(null, {
        method: "DELETE",
        action: `/home/bed/${bed.id}`,
      });
    } else return;
  }
  return (
    <TableRow>
      <TableCell className="font-medium">{bed.id}</TableCell>
      <TableCell>{bed.name}</TableCell>
      <TableCell>{bed.free ? "Yes" : "No"}</TableCell>
      <TableCell>{bed.patientId ?? "NaN"}</TableCell>
      <TableCell>
        <div className="flex w-[50px] items-center justify-center gap-4">
          <Link to={`bed/${bed.id}`}>
            <img src="pencil.png" alt="edit" className="w-4 h-4" />
          </Link>
          {!bed.patientId && (
            <button onClick={handleDelete}>
              <img src="delete.png" alt="delete" className="w-4 h-4" />
            </button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
