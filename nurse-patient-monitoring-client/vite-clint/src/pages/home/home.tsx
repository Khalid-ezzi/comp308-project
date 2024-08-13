import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Shadcn Button component
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Shadcn Card component
import { useAuth } from "@/hooks/useAuth"; // Assuming you have this hook for authentication
import routes from '@/services/pages-route-btn-service';

interface User {
    userId: string;
    role: string;
    firstName: string;
    lastName: string;
}

const Home = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [DashboardBtns] = useState(routes(40));
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        
        if (userId && role && firstName && lastName) {
            setUser({ userId, role, firstName, lastName });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!user) return null;

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <div className="container mx-auto mt-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Welcome, {fullName}</CardTitle>
                    <p className="">Your role: {user.role}</p>
                </CardHeader>
                <CardContent>
                    <h2 className="text-lg font-semibold mb-4">What would you like to do?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DashboardBtns.map((btn) => (
                        <>
                            {(btn.role === user.role) && (
                                <Card
                                className="m-3 w-64 h-64 mx-auto lg:mx-0 flex flex-col justify-content-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => navigate(btn.path)}
                                >
                                    <CardHeader
                                        className="h-1/3 w-full flex justify-content-center m-auto text-center"
                                    >
                                        <CardTitle
                                            className="text-2xl font-bold flex justify-content-center m-auto"
                                        >
                                            {btn.title}
                                        </CardTitle>
                                        <div
                                            className="w-fit mx-auto my-4"
                                        >
                                            {btn.icon}
                                        </div>
                                    </CardHeader>
                                </Card>
                            )}
                        </>
                        ))}
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
