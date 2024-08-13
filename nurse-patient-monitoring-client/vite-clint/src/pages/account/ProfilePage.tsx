import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import LoadingIcon from '@/components/loading/loading-icon';

const GET_USER_QUERY = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      userId
      firstName
      lastName
      email
      username
    }
  }
`;

const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateUserProfile($userId: String!, $firstName: String!, $lastName: String!, $email: String!, $username: String!) {
    updateUserProfile(userId: $userId, firstName: $firstName, lastName: $lastName, email: $email, username: $username) {
      userId
      firstName
      lastName
      email
      username
    }
  }
`;

const ProfilePage = () => {
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', username: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { data: userDataResponse, loading: userLoading, refetch: refetchUser } = useQuery(GET_USER_QUERY, {
    variables: { userId },
  });

  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE_MUTATION, {
    onCompleted: () => {
      setSuccess(true);
      refetchUser();
      setTimeout(() => setSuccess(false), 2000);
    },
    onError: (error) => setError(error.message),
  });

  useEffect(() => {
    if (userDataResponse && userDataResponse.getUser) {
      setUserData({
        firstName: userDataResponse.getUser.firstName,
        lastName: userDataResponse.getUser.lastName,
        email: userDataResponse.getUser.email,
        username: userDataResponse.getUser.username,
      });
    }
  }, [userDataResponse]);

  const handleUpdateUserProfile = (e: React.FormEvent) => {
    e.preventDefault();

    updateUserProfile({
      variables: {
        userId,  // Pass userId here
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
      },
    });
  };

  if (userLoading) return <LoadingIcon />;
  if (error) return <Alert variant="destructive">{error}</Alert>;

  return (
    <div className="container mx-auto mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {success && <Alert>Profile updated successfully!</Alert>}
          <form onSubmit={handleUpdateUserProfile}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">First Name</label>
              <Input
                type="text"
                value={userData.firstName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <Input
                type="text"
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Username</label>
              <Input
                type="text"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={userLoading}>
              {userLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
