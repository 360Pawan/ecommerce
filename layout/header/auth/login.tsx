import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoogleLogin } from "./googleLogin";
import { ProfileForm } from "./loginForm";

export function Login() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Login to your account</DialogDescription>
        </DialogHeader>
        <GoogleLogin />
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
}
