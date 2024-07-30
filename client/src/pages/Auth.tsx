import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { UploadIcon } from "@/icons"
import { useState } from "react"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"
import { useNavigate } from "react-router-dom"
import { SIGNUP_ROUTE, LOGIN_ROUTE } from "@/lib/constants"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "@/slices/authSlice"
export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const validateSignup = () => {
    if (!email || !password) {
      toast.error("Please fill all fields")
      return false;
    }
    return true;
  }
  const validateLogin = () => {
    if (!email || !password) {
      toast.error("Please fill all fields")
      return false;
    }
    return true;
  }
  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(LOGIN_ROUTE, { email, password })
      dispatch(setUserInfo(response.data.user))
      if (response.data.user.profileSetup) {
        navigate("/chat")
      }
      else navigate("/profile")
    }
  }
  const handleSignup = async () => {
    if (validateSignup()) {
      const res = await apiClient.post(SIGNUP_ROUTE, { email, password })
      console.log(res)
      if (res.status === 201) {
        navigate("/profile")
      }
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img src="/placeholder.svg" alt="Your Company" width={48} height={48} className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
        </div>
        <Tabs defaultValue="login" className="space-y-8">
          <TabsList className="flex justify-center">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="space-y-6">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                  Email address
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                  Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" name="remember-me" className="h-4 w-4 rounded" />
                  <Label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary-foreground">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={(e) => { e.preventDefault(); handleLogin() }}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                  Name
                </Label>
                <div className="mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                  Email address
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                  Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="avatar" className="block text-sm font-medium text-muted-foreground">
                  Avatar
                </Label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-muted px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="flex text-sm text-muted-foreground">
                      <label
                        htmlFor="avatar"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-foreground"
                      >
                        <span>Upload a file</span>
                        <Input id="avatar" name="avatar" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={(event) => { event.preventDefault(); handleSignup() }}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

