import React from 'react';
import { FaLock } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const NotAuthorized = () => {
  return (
    <Card className="flex flex-col items-center justify-center min-h-screen">
      <FaLock size={64} className="text-yellow-500" />
      <h1 className="text-4xl font-bold mt-4">403 - Not Authorized</h1>
      <p className="text-lg mt-2 text-center">
        Sorry, you do not have permission to view this page.
      </p>
    </Card>
  );
};

export default NotAuthorized;
