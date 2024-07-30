import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UploadIcon } from '@/icons'
import apiClient from '@/lib/apiClient'
import { LOGOUT_ROUTE } from '@/lib/constants'
import { useNavigate } from 'react-router-dom'
import { setUserInfo } from '@/slices/authSlice'
import { toast } from 'sonner'
function Profile() {
  const userInfo = useSelector((state: any) => state.userInfo.userInfo)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
  }
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: userInfo?.email,
    bio: "",
  })
  const handleChange = (event: any) => {
    console.log(event.target.value)
    const name = event.target.name;
    const value = event.target.value;
    setUserProfile(() => {
      return {
        ...userProfile,
        [name]: value
      }
    })
  }
  const handleLogout = async (event: any) => {
    event.preventDefault();
    try {
      const res = await apiClient(LOGOUT_ROUTE, {});
      if (res.status === 200) {
        dispatch(setUserInfo(null))
      }
      toast(res.data.msg);
      navigate("/auth")
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="w-full max-w-md mx-auto p-6 md:p-8">
      <div className="flex flex-col items-center gap-6">
        <Avatar className="w-24 h-24 ring-2 ring-primary">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <UploadIcon className="h-5 w-5" />
            <span className="sr-only">Upload profile picture</span>
          </Button>
          <p className="text-sm text-muted-foreground">Click to upload a new profile picture</p>
        </div>
      </div>
      <form className="space-y-6 mt-6" onSubmit={handleSubmitForm}>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name='name' onChange={handleChange} placeholder="Enter your name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name='email' placeholder="Enter email" value={userInfo?.email} readOnly />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" onChange={handleChange} placeholder="Write a short bio about yourself" className="min-h-[100px]" />
        </div>
        <div className="grid gap-2">
          <Label>Online Status</Label>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="sr-only">Online</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="sr-only">Away</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="sr-only">Busy</span>
            </Button>
          </div>
        </div>
        <Button className="w-full">Save Profile</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </form>
    </div>
  )
}

export default Profile
