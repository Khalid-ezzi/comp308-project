import { Card } from '@/components/ui/card';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col items-center justify-center min-h-screen">
      <FaExclamationTriangle size={64} className="text-red-500" />
      <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
      <p className="text-lg mt-2 text-center">
        Oops! The page you are looking for does not exist.
      </p>
    </Card>
  );
};

export default PageNotFound;
