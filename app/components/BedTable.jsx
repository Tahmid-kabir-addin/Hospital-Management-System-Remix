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
import BedTableItem from "./BedTableItem";
export default function BedTable({ beds }) {
  console.log("🚀 ~ BedTable ~ beds:", beds)
  return (
    <div className="flex flex-col pt-12 pl-20 gap-8">
      <div className="flex gap-8">
        <h2 className="font-bold text-2xl">List of Beds</h2>
        <Button className="rounded-3xl font-bold">
          <Link to="addBed">
            <div className="flex gap-2 items-center">
              <FaPlus />
              Add Bed
            </div>
          </Link>
        </Button>
      </div>

      <Table className="">
        <TableCaption>A list of Beds</TableCaption>
        <TableHeader>
          <hr />
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Free</TableHead>
            <TableHead>Patient ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {beds.map((bed) => {
            return (
              <Fragment key={bed.id}>
                <BedTableItem bed={bed} />
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
