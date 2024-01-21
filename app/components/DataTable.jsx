import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fragment } from "react";
import { FaPlus } from "react-icons/fa";

import DataTableItem from "./DataTableItem";
import { Link } from "@remix-run/react";
export default function TableDemo({ data }) {
  let due = 0;
  return (
    <div className="flex flex-col pt-12 gap-8 w-[60%]">
      <div className="flex gap-8">
        <h2 className="font-bold text-2xl">List of Patients</h2>
        <Button className="rounded-3xl font-bold">
          <Link to="add">
            <div className="flex gap-2 items-center">
              <FaPlus />
              Admit Patient
            </div>
          </Link>
        </Button>
      </div>

      <Table className="">
        <TableCaption>A list of patients</TableCaption>
        <TableHeader>
          <hr />
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Bed</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => {
            due += p.due;
            return (
              <Fragment key={p.id}>
                <DataTableItem p={p} />
              </Fragment>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Due</TableCell>
            <TableCell className="font-bold">{due} $</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
