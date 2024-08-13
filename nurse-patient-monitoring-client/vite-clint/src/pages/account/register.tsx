import LoadingIcon from "@/components/loading/loading-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const Register = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
    });
    const [error, setError] = useState('');
    const navigate  = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [role, setRole] = useState([
        { id: '1', name: 'nurse' },
        { id: '2', name: 'patient' },
    ]);

    const handleChange = (e:any) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };
    const handleRegister = async () => {
        if (checkFields()) {
            console.log(userInfo);
            let data = {
                email: userInfo.email,
                username: userInfo.firstName + userInfo.lastName,
                password: userInfo.password,
                role: userInfo.role,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
            };
    
            const query = `
                mutation Register($email: String!, $username: String!, $password: String!, $firstName: String!, $lastName: String!, $role: String!) {
                    createUser(email: $email, username: $username, password: $password, firstName: $firstName, lastName: $lastName, role: $role) {
                        id
                        username
                        email
                        role
                        firstName
                        lastName
                    }
                }
            `;
    
            setLoading(true);
    
            try {
                const response = await fetch('http://localhost:4000/graphql', {  // Ensure this is your correct GraphQL endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query,
                        variables: data,
                    }),
                });
    
                const responseData = await response.json();
    
                if (responseData.errors) {
                    setError(responseData.errors[0].message);
                } else {
                    setIsSuccess(true);
                }
            } catch (err) {
                setError('Registration failed. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
    };
    

    const checkEmail = () => {
        if (userInfo.email.includes('@')) {
            return true;
        }
        setError('Invalid email')
        return false;
      }

    const checkFields = () => {
        if (!userInfo.firstName || !userInfo.lastName || !userInfo.email || !userInfo.password) {
            setError('Please fill all fields');
            return false;
        }
        else if (!userInfo.role) {
            setError('Please select a role');
            return false;
        }
        else if (!checkEmail()) {
            return false;
        }
        setError('');
        return true;
    };


    return (
        <Card
            className="w-96 m-auto lg:mt-10 md:mt-10 p-4"
        >
            <CardContent
                className="flex flex-col text-start "
            >
                    <div
                        className="flex justify-start"
                    >
                    </div>
                <CardTitle
                    className="text-2xl font-bold text-center"
                >
                    Register
                </CardTitle>
                {isSuccess ?
                    <CardDescription
                        className="text-green-500 font-bold text-center my-4"
                    >
                        <p
                            className="text-green-500 font-bold text-center my-4"
                        >
                            Registration successful
                        </p>
                    </CardDescription>
                    : 
                    <>                    
                        <div
                            className="my-4"
                        >
                            <Label>
                                First Name
                            </Label>
                            <Input type="text" name="firstName" value={userInfo.firstName} onChange={handleChange} />
                        </div>
                        <div
                            className="my-4"
                        >
                            <Label>
                                Last Name
                            </Label>
                            <Input type="text" name="lastName" value={userInfo.lastName} onChange={handleChange} />
                        </div>
                        <div
                            className="my-4"
                        >
                            <Label>
                                Email
                            </Label>
                            <Input type="email" name="email" value={userInfo.email} onChange={handleChange} />
                        </div>
                        <div
                            className="my-4"
                        >
                            <Label>
                                Role
                            </Label>
                            <Select
                                onValueChange={(value) => {
                                    setUserInfo({
                                        ...userInfo,
                                        role: value,
                                    });
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder="Select role"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {role.map((item) => (
                                            <SelectItem value={item.name}>
                                                <SelectLabel>{item.name}</SelectLabel>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div
                            className="my-4"
                        >
                            <Label>
                                Password
                            </Label>
                            <Input type="password" name="password" value={userInfo.password} onChange={handleChange} />
                            <PasswordChecklist
                                    rules={["minLength","specialChar","number","capital"]}
                                    value={userInfo.password}
                                    minLength={8}
                                    iconSize={12}
                                    validColor="green"
                                    invalidColor="red"
                                    validTextColor="green"
                                    invalidTextColor="red"
                                    messages={{
                                        minLength:'Minimum 8 characters',
                                        specialChar:'At least 1 special character',
                                        number: 'At least 1 number',
                                        capital:'At least 1 capital letter',
                                    }}
                                    onChange={(isValid: boolean) => {
                                        setIsPasswordValid(isValid);
                                        if (isValid) {
                                            setIsPasswordValid(true);
                                        } 
                                    }}
                                />
                        </div>
                    </>
                }
                <CardDescription
                    className="text-danger text-red-500 font-bold"
                >
                    {error}
                </CardDescription>
            </CardContent>
            <CardFooter
                className="flex flex-col"
            >
                {isSuccess ?
                    <div
                        className="flex justify-start"
                    >
                        <Button
                            onClick={() => navigate('/login')}
                            variant={"secondary"}
                        >
                           Back to Login
                        </Button>
                    </div>
                    :
                    <>                    
                        <Button 
                                onClick={() => handleRegister()} 
                                disabled={loading || !isPasswordValid}
                                className="m-auto"
                            >
                            {loading ? 
                                <LoadingIcon />
                                : 
                                "Register"
                            }
                        </Button>
                        <div
                            className="flex justify-start w-full mt-4 text-start flex-col gap-2"
                        >
                            <div>
                                <Label 
                                    className="text-sm"
                                >
                                    Already have an account?
                                </Label>
                                <Button
                                    onClick={() => navigate('/login')}
                                    variant={"link"}
                                    disabled={loading}
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    </>
                }
                
            </CardFooter>
        </Card>
    );
}

export default Register;