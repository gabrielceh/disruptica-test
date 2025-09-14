import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



export function LoginForm() {
  return (
    <form>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Password" />
      </div>
    </form>
  )
}
