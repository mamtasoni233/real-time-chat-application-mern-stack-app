import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from 'react-icons/io5'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getcolor } from "@/lib/utils";
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";
import apiRequest from "@/lib/api-client";
import userAppstore from "@/store";

const Profile = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = userAppstore();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);

    /*   useEffect(() => {
          if (userInfo.profilSetup) {
              setFirstName(userInfo.firstName);
              setLastName(userInfo.lastName);
              setSelectedColor(userInfo.color);
          }
      }, [userInfo]) */
    const validateProfile = () => {
        if (!firstName.length) {
            toast.error("First name is Required!");
            return false;
        }
        if (!lastName.length) {
            toast.error("Last name is Required!");
            return false;
        }
        return true;
    }

    const saveChanges = async (e) => {
        e.preventDefault();
        if (validateProfile()) {
            try {
                const res = await apiRequest.post(UPDATE_PROFILE_ROUTE, { firstName, lastName, color: selectedColor }, { withCredentials: true })
                if (res.status === 200 && res.data) {
                    setUserInfo({ ...res.data });
                    toast.success("Profile updated successfully");
                    navigate("/chat");
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response.data.message)
            }
        }

    }

    return (
        <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10" >
            <div className="flex flex-col gap-10 w-[80vh] md:w-max">
                <div>
                    <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
                </div>
                <div className="grid grid-cols-2">
                    <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                            {
                                avatar ? <AvatarImage src={avatar} alt="profile" className="object-cover w-full h-full bg-black"
                                /> : <div className={` uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getcolor(selectedColor)}`}>
                                    {
                                        firstName ? firstName.split("").shift() : userInfo.email.split("").shift()
                                    }
                                </div>
                            }
                        </Avatar>
                        {
                            hovered && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full ">
                                    {
                                        avatar ? <FaTrash className="text-white text-3xl cursor-pointer" /> : <FaPlus className=" text-white text-3xl cursor-pointer" />
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className="flex min-w-32 md:min-w-64 flex-col text-white gap-5 items-center justify-center">
                        <div className="w-full">
                            <input
                                placeholder="email" type="email" className="rounded-lg p-6 bg-[#2c2e3b] border-none " disabled value={userInfo.email} />
                        </div>
                        <div className="w-full">
                            <input
                                placeholder="First Name" type="text" className="rounded-lg p-6 bg-[#2c2e3b] border-none " value={userInfo.firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="w-full">
                            <input
                                placeholder="Last Name" type="text" className="rounded-lg p-6 bg-[#2c2e3b] border-none " value={userInfo.lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div>
                            <div className="w-full flex gap-5">
                                {
                                    colors.map((color, index) => {
                                        return <div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 
                                        ${selectedColor === index ? "outline outline-white/50 outline-4" : ""
                                            }
                                        `} key={index} onClick={() => setSelectedColor(index)} >
                                        </div>
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <Button type="submit" className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>Save Change</Button>
                </div>
            </div>

        </div >
    )
}

export default Profile