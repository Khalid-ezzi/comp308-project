import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "@/components/loading/loading-icon";
import { login } from "@/services/accountService";
import { useCookies } from "react-cookie";

const LoginPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['Authorization']);
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    
    const handleLogin = async (event?: any) => {
        if (event) {
            event.preventDefault();
        }
        if (checkFields()) {
            setLoading(true);
            try {
                const { token, userId, role }:any = await login({ username: userInfo.username, password: userInfo.password });

                // Store the token in cookies
                setCookie('Authorization', token, { path: '/', maxAge: 3600 });
                
                // Optionally store other user info in local storage
                localStorage.setItem('userId', userId);
                localStorage.setItem('role', role);
                
                // Redirect to the home page or dashboard
                navigate('/');
                location.reload();
            } catch (error) {
                console.error(error);
                setError('Login failed. Please check your credentials.');
            } finally {
                setLoading(false);
            }
        }
    };

    const checkEmail = () => {
        if (userInfo.username.includes('@')) {
            return true;
        }
        setError('Invalid email')
        return false;
    }
    const checkFields = () => {
        if (!userInfo.username || !userInfo.password) {
            setError('Please fill all fields');
            return false;
        }
        else if (!checkEmail()) {
            return false;
        }
        return true;
    }

    return (
        <form onSubmit={handleLogin}>


            <div
            >
                <Card
                    className="w-96 m-auto mt-20"
                >
                    <CardHeader>
                        <CardTitle>
                            Login
                        </CardTitle>
                    </CardHeader>
                    <CardContent
                        className="text-start"
                    >
                        <div
                            className="my-4"
                        >
                            <Label>
                                Email
                            </Label>
                            <Input type="email" name="username" value={userInfo.username} onChange={handleChange} />
                        </div>

                        <div
                            className="my-4"
                        >
                            <Label>
                                Password
                            </Label>
                            <Input type="password" name="password" value={userInfo.password} onChange={handleChange} />
                        </div>
                        <CardDescription
                            className="text-danger text-red-500 font-bold"
                        >
                            {error}

                        </CardDescription>
                    </CardContent>
                    <CardFooter
                        className="flex flex-col"
                    >
                                <Button
                                    onClick={() => handleLogin()}
                                    disabled={loading}
                                    className="m-auto"
                                    type="submit"
                                >
                                    {loading ?
                                        <LoadingIcon />
                                        :
                                        "Login"
                                    }
                                </Button>


                        <div
                            className="flex justify-start w-full mt-4 text-start flex-col gap-2"
                        >
                            <div>
                                <Label
                                    className=""
                                >
                                    Don't have an account?
                                </Label>
                                <Button
                                    onClick={() => navigate('/register')}
                                    variant={"link"}
                                >

                                    Register
                                </Button>
                            </div>
                        </div>

                    </CardFooter>
                </Card>
            </div>

        </form>
    );
};

export default LoginPage;
