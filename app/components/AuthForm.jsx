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
import { Form, Link, useActionData } from "@remix-run/react";
import { FaLock } from "react-icons/fa";

export default function AuthForm() {
  const validationErrors = useActionData();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center">
          <CardTitle>InfancyIT</CardTitle>
          <CardDescription>Your First Choice</CardDescription>
          <FaLock className="rounded-half text-2xl w-4 h-4" />
        </CardHeader>
        <CardContent>
          <Form
            className="flex flex-col max-w-sm w-full justify-center mx-auto gap-4"
            method="post"
          >
            <div className="gap-1.5">
              <Label htmlFor="text" className="font-bold text-lg">
                Username
              </Label>
              <Input type="text" name="uname" placeholder="Username" required />
            </div>
            <div className="gap-1.5">
              <Label htmlFor="password" className="font-bold text-lg">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                minLength="7"
                required
              />
            </div>
            {validationErrors &&
              Object.values(validationErrors).map((err) => (
                <ul>
                  <li key={err} className="text-red-500">
                    {err}
                  </li>
                </ul>
              ))}
            <Button className="font-bold text-lg">
              <Link to="/home">Login</Link>
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}