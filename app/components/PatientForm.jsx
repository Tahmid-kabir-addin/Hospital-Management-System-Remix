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

export default function PatientForm() {
  const validationErrors = useActionData();
  console.log("🚀 ~ PatientForm ~ validationErrors:", validationErrors);

  let p = useLoaderData();

  console.log("🚀 ~ PatientForm ~ p:", p);
  // p = p ?? {
  //   name: "",
  //   phone: "",
  //   due: 0,
  //   bed:{name:""},
  //   freeBeds:""

  // };

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="w-[400px] max-w-lg">
        <CardHeader className="items-center">
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>Update Patient Information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            className="flex flex-col max-w-sm w-full justify-center mx-auto gap-4"
            method={p.name ? "patch" : "post"}
          >
            <div className="gap-1.5">
              <Label htmlFor="pname" className="font-bold text-lg">
                Patient Name
              </Label>
              <Input
                type="text"
                name="pname"
                placeholder="Patient Name"
                required
                defaultValue={p.name ?? ""}
              />
            </div>
            <div className="gap-1.5">
              <Label htmlFor="mobile" className="font-bold text-lg">
                Phone No
              </Label>
              <Input
                type="tel"
                name="mobile"
                placeholder="phone number"
                maxLength="11"
                minLength="11"
                required
                defaultValue={p.phone ?? ""}
              />
            </div>
            <div className="gap-1.5">
              <Label htmlFor="numeric" className="font-bold text-lg">
                Due
              </Label>
              <Input
                type="number"
                name="due"
                placeholder="$0"
                min="0"
                step="1"
                required
                defaultValue={p.due ?? 0}
              />
            </div>

            <Select name="bed" defaultValue={p.bed?.name ?? ""}>
              <SelectTrigger className="w-mx">
                <SelectValue placeholder="Select Bed" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Bed Name</SelectLabel>
                  {p.freeBeds.map((bed) => {
                    return (
                      <SelectItem key={bed.id} value={bed.name}>
                        {bed.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <input type="hidden" value={p.bed?.name ?? ""} name="currentBed" />
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
