import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from "../hooks/useGeAppliedJobs";

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    console.log(user);

    return (
        <div>
            <div className=' backdrop-blur max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xlhover:shadow-2xl transition-all duration-300my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={
                                    user?.profile?.profilePhoto
                                        ? user.profile.profilePhoto
                                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                }
                                alt="profile"
                                className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-200 shadow-lg"
                            />
                        </Avatar>

                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className="font-medium mb-2">Skills</h1>
                    <div className='flex  items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) =>
                                <Badge key={index} className="bg-indigo-100 text-black-700 px-3 py-1 rounded-full text-md hover:scale-105 transition"> {item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {user?.profile?.resume ? (
                        <a
                            href={user.profile.resume}
                            download
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            View Resume
                        </a>




                    ) : (
                        <p>No resume uploaded</p>
                    )}
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile

