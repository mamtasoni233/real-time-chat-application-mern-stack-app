import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Background from '../../assets/login2.png'
import Victory from '../../assets/victory.svg'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import apiRequest from '@/lib/api-client'
import { LOGIN_ROUTES, SIGNUP_ROUTES } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'
import userAppstore from '@/store'


const Auth = () => {
    const navigate = useNavigate();
    const { setUserInfo } = userAppstore();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confrimPassword, setConfrimPassword] = useState('')

    const validateSignup = () => {
        if (!email.length) {
            toast.error("Email is Required!");
            return false;
        }
        if (!password.length) {
            toast.error("Password is Required!");
            return false;
        }
        if (password !== confrimPassword) {
            toast.error("Passwords and confrim password should be same!");
            return false;
        }
        return true;
    }
    const validateLogin = () => {
        if (!email.length) {
            toast.error("Email is Required!");
            return false;
        }
        if (!password.length) {
            toast.error("Password is Required!");
            return false;
        }
        return true;
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            if (validateLogin()) {
                const res = await apiRequest.post(LOGIN_ROUTES, { email, password }, { withCredentials: true });
                console.log("res", res)
                if (res.data.users.id) {
                    setUserInfo(res.data.users);
                    toast.success(res.data.message);
                    if (res.data.users.profileSetup) {
                        navigate('/chat')
                    } else {
                        navigate('/profile')
                    }
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)

        }
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            if (validateSignup()) {
                const res = await apiRequest.post(SIGNUP_ROUTES, { email, password }, { withCredentials: true });
                // console.log("res", res.data)
                if (res.status === 201) {
                    toast.success(res.data.message);
                    setUserInfo(res.data.users);
                    navigate('/profile')
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)

        }

    }
    return (
        <div className='h-screen w-screen flex items-center justify-center' /* style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }} */>
            <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
                <div className='flex flex-col gap-10 items-center justify-center'>
                    <div className='flex items-center justify-center flex-col'>
                        <div className='flex items-center justify-center'>
                            <h1 className='text-5xl font-bold lg:text-6xl'>Welcome</h1>
                            <img src={Victory} alt='victory-emoji' className='h-[100px]'></img>
                        </div>
                        <p className='font-medium text-center'>Fill in the details to get started with the best chat app!</p>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Tabs defaultValue='login' className='w-3/4'>
                            <TabsList className="flex bg-transparent rounded-none w-full">
                                <TabsTrigger value="login" className='data-[state=active]:bg-transparent text=black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state-active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>Login</TabsTrigger>
                                <TabsTrigger value="signup" className='data-[state=active]:bg-transparent text=black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state-active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>Sign Up</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login" className='flex flex-col gap-5 mt-10'>
                                <form onSubmit={handleLogin} className='flex flex-col gap-5'>
                                    <Input type="email" placeholder="Email" className="rounded-full p-6" name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <Input type="password" placeholder="Password" className="rounded-full p-6" name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button className="rounded-full p-6">Login</Button>
                                </form>
                            </TabsContent>
                            <TabsContent value="signup" className='flex flex-col gap-5 '>
                                <form onSubmit={handleSignup} className='flex flex-col gap-5'>
                                    <Input type="email" name="email" placeholder="Email" className="rounded-full p-6"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <Input type="password" placeholder="Password" className="rounded-full p-6"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <Input type="password" name="confrimPassword" placeholder="Confrim Password" className="rounded-full p-6"
                                        value={confrimPassword}
                                        onChange={(e) => setConfrimPassword(e.target.value)} />
                                    <Button className="rounded-full p-6">Signup</Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className=" hidden xl:flex justify-center items-center">
                    <img src={Background} alt="background-login" className="h-[700px]" />
                </div>
            </div>
        </div>
    )
}

export default Auth