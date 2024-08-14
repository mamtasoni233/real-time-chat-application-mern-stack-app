import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Background from '../../assets/login2.png'
import Victory from '../../assets/victory.svg'
// import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'



const Auth = () => {
    // const [email, setEmail] = useState('')
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [confrimPassword, setConfrimPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const email = formData.get("email")
        const password = formData.get("password")
        const confrimPassword = formData.get("confrimPassword")
        const firstName = formData.get("firstName")
        const lastName = formData.get("lastName")
        console.log(email, firstName, lastName, password, confrimPassword)
    }
    const handleSignup = (e) => {
        e.preventDefault()
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
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
                                    <Input type="email" placeholder="Email" className="rounded-full p-6" name="email" />
                                    <Input type="password" placeholder="Password" className="rounded-full p-6" name="password" />
                                    <Button className="rounded-full p-6">Login</Button>
                                </form>
                            </TabsContent>
                            <TabsContent value="signup" className='flex flex-col gap-5 '>
                                <form onSubmit={handleSignup} className='flex flex-col gap-5'>
                                    <Input type="text" placeholder="First Name" name="firstName" className="rounded-full p-6" />
                                    <Input type="text" placeholder="Last Name" name="lastName" className="rounded-full p-6" />
                                    <Input type="email" name="email" placeholder="Email" className="rounded-full p-6" />
                                    <Input type="password" placeholder="Password" className="rounded-full p-6" />
                                    <Input type="password" name="confrimPassword" placeholder="Confrim Password" className="rounded-full p-6" />
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