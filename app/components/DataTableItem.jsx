import { TableCell, TableRow } from "@/components/ui/table";
import { Link, useFetcher } from "@remix-run/react";

export default function DataTableItem({ p }) {
  console.log("🚀 ~ DataTableItem ~ p:", p)
  
  const fetcher = useFetcher();
  function handleDelete(e) {
    const proceed = confirm("Are you sure? Do you want to delete this?");
    if (proceed) {
      fetcher.submit(null, {
        method: "DELETE",
        action: `/home/${p.id}`,
      });
    } else return; 
  }
  return (
    <TableRow>
      <TableCell className="font-medium">{p.id}</TableCell>
      <TableCell>{p.name}</TableCell>
      <TableCell>{p.phone}</TableCell>
      <TableCell>{p.due} $</TableCell>
      <TableCell>{p.bed.name}</TableCell>
      <TableCell>
        <div className="flex w-[50px] items-center justify-center gap-4">
          <Link to={`/bed/${p.id}`}>
            <img src="pencil.png" alt="edit" className="w-4 h-4" />
          </Link>
          {p.due === 0 && (
            <button onClick={handleDelete}>
              <img src="delete.png" alt="delete" className="w-4 h-4" />
            </button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
