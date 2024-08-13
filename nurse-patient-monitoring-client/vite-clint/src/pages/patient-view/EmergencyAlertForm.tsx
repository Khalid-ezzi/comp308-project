import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import LoadingIcon from '@/components/loading/loading-icon';

const SEND_ALERT_MUTATION = gql`
  mutation SendAlert($message: String!, $userId: String!, $userName: String!, $userEmail: String!) {
    createAlert(message: $message, userId: $userId, userName: $userName, userEmail: $userEmail) {
      id
      message
      createdAt
    }
  }
`;

const EmergencyAlertForm = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [sendAlert, { loading }] = useMutation(SEND_ALERT_MUTATION, {
    onCompleted: () => {
      setSuccess(true);
      setMessage('');
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('message', message);
    console.log('userId', localStorage.getItem('userId'));
    console.log('userName', localStorage.getItem('userName'));
    console.log('userEmail', localStorage.getItem('email'));
    
    sendAlert({
      variables: {
        userId: localStorage.getItem('userId'),
        userName: localStorage.getItem('userName'),
        userEmail: localStorage.getItem('email'),
        message, 
      },
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Send Emergency Alert</CardTitle>
        </CardHeader>
        <CardContent>
          {success && <Alert>Alert sent successfully!</Alert>}
          {error && <Alert variant="destructive">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Alert Message</label>
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Describe your emergency"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <LoadingIcon /> : 'Send Alert'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyAlertForm;
