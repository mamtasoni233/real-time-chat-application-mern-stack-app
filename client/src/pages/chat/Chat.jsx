import userAppstore from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Chat = () => {

    const { userInfo } = userAppstore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userInfo.profileSetup) {
            toast.error("Please setup the profile to continue..", { theme: "colored", });
            navigate('/profile');
        }
    }, [userInfo, navigate])

    return (
        <div>Chat</div>
    )
}

export default Chat