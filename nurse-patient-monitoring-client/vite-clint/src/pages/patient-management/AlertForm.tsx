import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CREATE_ALERT_MUTATION = gql`
  mutation CreateAlert($userId: String!, $message: String!) {
    createAlert(userId: $userId, message: $message) {
      id
      message
      createdAt
    }
  }
`;

const GET_ALERTS_QUERY = gql`
  query GetAlertsByUserId($userId: String!) {
    getAlertsByUserId(userId: $userId) {
      id
      message
      createdAt
    }
  }
`;

const AlertForm = () => {
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId'); // Ensure the userId is stored in localStorage or retrieved appropriately
  const [createAlert] = useMutation(CREATE_ALERT_MUTATION);
  const { data: alertsData, refetch } = useQuery(GET_ALERTS_QUERY, {
    variables: { userId },
  });

  const handleSubmit = async () => {
    if (!message.trim()) return;

    try {
      await createAlert({
        variables: { userId, message },
      });
      setMessage(''); // Clear the input field after submitting
      refetch(); // Refetch alerts to update the list
    } catch (error) {
      console.error('Error creating alert:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Create Emergency Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label>Enter your emergency message:</Label>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your emergency"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Send Alert
          </Button>
        </CardContent>
        <CardFooter>
          {alertsData?.getAlertsByUserId.length > 0 && (
            <>
              <h3 className="text-lg font-bold mt-4">Your Past Alerts:</h3>
              <ul>
                {alertsData.getAlertsByUserId.map((alert:any) => (
                  <li key={alert.id} className="my-2">
                    {new Date(alert.createdAt).toLocaleString()}: {alert.message}
                  </li>
                ))}
              </ul>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AlertForm;
