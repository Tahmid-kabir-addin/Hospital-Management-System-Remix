import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";

export default function BedForm() {
  const validationErrors = useActionData();
  console.log("🚀 ~ BedForm ~ validationErrors:", validationErrors)

  let bed = useLoaderData();
  console.log("🚀 ~ BedForm ~ bed:", bed)

  bed = bed ?? {
    name: "",
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="w-[400px] max-w-lg">
        <CardHeader className="items-center">
          <CardTitle>Bed Information</CardTitle>
          <CardDescription>Update Bed Information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            className="flex flex-col max-w-sm w-full justify-center mx-auto gap-4"
            method={bed?.name ? "patch" : "post"}
          >
            <div className="gap-1.5">
              <Label htmlFor="pname" className="font-bold text-lg">
                Bed Name (Must Be Unique)
              </Label>
              <Input
                type="text"
                name="name"
                placeholder="Patient Name"
                required
                defaultValue={bed.name ?? ""}
              />
            </div>

            {/* <input type="hidden" value={p.bed?.name ?? ""} name="currentBed" /> */}
            {/* <input type="hidden" value={p.id} name="pid" /> */}
            {validationErrors &&
              Object.values(validationErrors).map((err) => (
                <ul>
                  <li key={err} className="text-red-500">
                    {err}
                  </li>
                </ul>
              ))}
            <div className="flex justify-center gap-16">
              <Button className="font-bold text-lg bg-red-500 hover:bg-red-430">
                <Link to="/home">Cancel</Link>
              </Button>
              <Button className="font-bold text-lg">Submit</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
