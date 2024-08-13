import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import LoadingIcon from '@/components/loading/loading-icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const GET_PATIENT_QUERY = gql`
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;

const UPDATE_PATIENT_MUTATION = gql`
  mutation UpdatePatient($id: ID!, $firstName: String!, $lastName: String!, $email: String!) {
    updatePatient(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`;

const GET_VITAL_SIGNS_QUERY = gql`
  query GetVitalSigns($userId: String!) {
    getVitalSigns(userId: $userId) {
      id
      temperature
      heartRate
      bloodPressure
      respiratoryRate
    }
  }
`;

const GET_TIPS_QUERY = gql`
  query GetTips($userId: String!) {
    getTips(userId: $userId) {
      id
      message
      createdAt
    }
  }
`;

const ADD_VITAL_SIGN_MUTATION = gql`
  mutation AddVitalSign($userId: String!, $temperature: Float, $heartRate: Int, $bloodPressure: String, $respiratoryRate: Int) {
    addVitalSigns(userId: $userId, temperature: $temperature, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate) {
      id
      temperature
      heartRate
      bloodPressure
      respiratoryRate
    }
  }
`;

const SEND_TIP_MUTATION = gql`
  mutation SendTip($message: String!, $nurseId: String!, $patientId: String!) {
    sendTip(message: $message, nurseId: $nurseId, patientId: $patientId) {
      id
      message
      createdAt
    }
  }
`;

const PatientManagementPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patientData, setPatientData] = useState({ firstName: '', lastName: '', email: '' });
  const [vitalSignData, setVitalSignData] = useState({
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
  });
  const [tipMessage, setTipMessage] = useState('');
  const [showAddVitalForm, setShowAddVitalForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { data: patientDataResponse, loading: patientLoading, refetch: refetchPatient } = useQuery(GET_PATIENT_QUERY, {
    variables: { id },
  });

  const { data: vitalSignsDataResponse, loading: vitalSignsLoading, refetch: refetchVitalSigns } = useQuery(GET_VITAL_SIGNS_QUERY, {
    variables: { userId: id },
  });

  const { data: tipsDataResponse, loading: tipsLoading, refetch: refetchTips } = useQuery(GET_TIPS_QUERY, {
    variables: { userId: id }, // Updated variable name
  });

  const [updatePatient] = useMutation(UPDATE_PATIENT_MUTATION, {
    onCompleted: () => {
      setSuccess(true);
      refetchPatient();
      setTimeout(() => setSuccess(false), 2000);
    },
    onError: (error) => setError(error.message),
  });

  const [addVitalSign] = useMutation(ADD_VITAL_SIGN_MUTATION, {
    onCompleted: () => {
      setSuccess(true);
      refetchVitalSigns();
      setTimeout(() => setSuccess(false), 2000);
      setShowAddVitalForm(false);
    },
    onError: (error) => setError(error.message),
  });

  const [sendTip] = useMutation(SEND_TIP_MUTATION, {
    onCompleted: () => {
      setSuccess(true);
      refetchTips();
      setTimeout(() => setSuccess(false), 2000);
      setTipMessage('');
    },
    onError: (error) => setError(error.message),
  });

  useEffect(() => {
    if (patientDataResponse && patientDataResponse.getPatient) {
      setPatientData({
        firstName: patientDataResponse.getPatient.firstName,
        lastName: patientDataResponse.getPatient.lastName,
        email: patientDataResponse.getPatient.email,
      });
    }
  }, [patientDataResponse]);

  const handleUpdatePatient = (e: React.FormEvent) => {
    e.preventDefault();

    updatePatient({
      variables: {
        id,
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        email: patientData.email,
      },
    });
  };

  const handleAddVitalSign = (e: React.FormEvent) => {
    e.preventDefault();

    const { temperature, heartRate, bloodPressure, respiratoryRate } = vitalSignData;

    addVitalSign({
      variables: {
        userId: id,
        temperature: parseFloat(temperature),
        heartRate: parseInt(heartRate, 10),
        bloodPressure,
        respiratoryRate: parseInt(respiratoryRate, 10),
      },
    });
  };

  const handleSendTip = (e: React.FormEvent) => {
    e.preventDefault();

    sendTip({
      variables: {
        message: tipMessage,
        nurseId: localStorage.getItem('userId'),
        patientId: id,
      },
    });
  };

  if (patientLoading || vitalSignsLoading || tipsLoading) return <LoadingIcon />;
  if (error) return <Alert variant="destructive">{error}</Alert>;

  function formatDate(isoDate: any) {
    const date = new Date(parseInt(isoDate));
    const formattedDateTime = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return formattedDateTime;
}

  return (
    <div className="container mx-auto mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Manage Patient: {patientData.firstName} {patientData.lastName}</CardTitle>
        </CardHeader>
        <CardContent>
          {success && <Alert>Operation successful!</Alert>}
            {/* Send Motivational Tip */}
            <div className="mt-8">
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className='flex justify-end'
                >
                  <Button>
                    Send Motivational Tip
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Tip to {patientData.firstName} {patientData.lastName}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSendTip}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Tip Message</label>
                    <Input
                      type="text"
                      value={tipMessage}
                      onChange={(e) => setTipMessage(e.target.value)}
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={tipsLoading}>
                      {tipsLoading ? 'Sending...' : 'Send Tip'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Update Patient Form */}
          <form onSubmit={handleUpdatePatient}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">First Name</label>
              <Input
                type="text"
                value={patientData.firstName}
                onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <Input
                type="text"
                value={patientData.lastName}
                onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={patientData.email}
                onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={patientLoading}>
              {patientLoading ? 'Updating...' : 'Update Patient'}
            </Button>
          </form>

          {/* Display Vital Signs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Vital Signs</h2>
            {vitalSignsDataResponse && vitalSignsDataResponse.getVitalSigns.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Temperature (°C)</TableHead>
                    <TableHead>Heart Rate (bpm)</TableHead>
                    <TableHead>Blood Pressure (mmHg)</TableHead>
                    <TableHead>Respiratory Rate (breaths/min)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vitalSignsDataResponse.getVitalSigns.map((vitalSign: any) => (
                    <TableRow key={vitalSign.id}>
                      <TableCell>{vitalSign.temperature}</TableCell>
                      <TableCell>{vitalSign.heartRate}</TableCell>
                      <TableCell>{vitalSign.bloodPressure}</TableCell>
                      <TableCell>{vitalSign.respiratoryRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No vital signs recorded yet.</p>
            )}
          </div>

          {/* Add Vital Sign Form */}
          <div className="mt-4">
            <Button onClick={() => setShowAddVitalForm(!showAddVitalForm)} className="mb-4">
              {showAddVitalForm ? 'Cancel' : 'Add Vital Sign'}
            </Button>

            {showAddVitalForm && (
              <form onSubmit={handleAddVitalSign}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Temperature (°C)</label>
                  <Input
                    type="number"
                    value={vitalSignData.temperature}
                    onChange={(e) => setVitalSignData({ ...vitalSignData, temperature: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Heart Rate (bpm)</label>
                  <Input
                    type="number"
                    value={vitalSignData.heartRate}
                    onChange={(e) => setVitalSignData({ ...vitalSignData, heartRate: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Blood Pressure (mmHg)</label>
                  <Input
                    type="text"
                    value={vitalSignData.bloodPressure}
                    onChange={(e) => setVitalSignData({ ...vitalSignData, bloodPressure: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Respiratory Rate (breaths/min)</label>
                  <Input
                    type="number"
                    value={vitalSignData.respiratoryRate}
                    onChange={(e) => setVitalSignData({ ...vitalSignData, respiratoryRate: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={vitalSignsLoading}>
                  {vitalSignsLoading ? 'Adding...' : 'Add Vital Sign'}
                </Button>
              </form>
            )}
          </div>

          {/* Display Tips */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Motivational Tips</h2>
            {tipsDataResponse && tipsDataResponse.getTips.length > 0 ? (
              <ul>
                {tipsDataResponse.getTips.map((tip: any) => (
                  <li key={tip.id} className="mb-4">
                    <p>{tip.message}</p>
                    <small className="">{formatDate(tip.createdAt)}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tips available.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientManagementPage;
