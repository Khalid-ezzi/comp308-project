import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import LoadingIcon from '@/components/loading/loading-icon';

const ADD_DAILY_LOG_MUTATION = gql`
  mutation AddDailyLog($userId: String!, $pulseRate: Int, $bloodPressure: String, $weight: Float, $temperature: Float, $respiratoryRate: Int) {
    addDailyLog(userId: $userId, pulseRate: $pulseRate, bloodPressure: $bloodPressure, weight: $weight, temperature: $temperature, respiratoryRate: $respiratoryRate) {
      id
      pulseRate
      bloodPressure
      weight
      temperature
      respiratoryRate
    }
  }
`;

const GET_DAILY_LOGS_QUERY = gql`
  query GetDailyLogs($userId: String!) {
    getDailyLog(userId: $userId) {
      id
      pulseRate
      bloodPressure
      weight
      temperature
      respiratoryRate
      createdAt
    }
  }
`;

const DailyInfoEntryForm = () => {
  const [pulseRate, setPulseRate] = useState<number | null>(null);
  const [bloodPressure, setBloodPressure] = useState('');
  const [weight, setWeight] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [respiratoryRate, setRespiratoryRate] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  const { data, loading: logsLoading, error: logsError, refetch } = useQuery(GET_DAILY_LOGS_QUERY, {
    variables: { userId },
  });

  const [addDailyLog, { loading }] = useMutation(ADD_DAILY_LOG_MUTATION, {
    onCompleted: () => {
      setSuccess(true);
      setPulseRate(null);
      setBloodPressure('');
      setWeight(null);
      setTemperature(null);
      setRespiratoryRate(null);
      refetch(); // Refetch daily logs after submitting a new log
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addDailyLog({
      variables: {
        userId,
        pulseRate,
        bloodPressure,
        weight,
        temperature,
        respiratoryRate,
      },
    });
  };

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
          <CardTitle>Enter Your Daily Health Information</CardTitle>
        </CardHeader>
        <CardContent>
          {success && <Alert>Daily log submitted successfully!</Alert>}
          {error && <Alert variant="destructive">{error}</Alert>}

          {logsLoading && <LoadingIcon />}
          {logsError && <Alert variant="destructive">{logsError.message}</Alert>}

          {data?.getDailyLog?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Previous Daily Logs</h2>
              <ul className="space-y-4">
                {data.getDailyLog.map((log: any) => (
                  <li key={log.id} className="border p-4 rounded-lg">
                    <p><strong>Date:</strong> {formatDate(log.createdAt)}</p>
                    <p><strong>Pulse Rate:</strong> {log.pulseRate} bpm</p>
                    <p><strong>Blood Pressure:</strong> {log.bloodPressure}</p>
                    <p><strong>Weight:</strong> {log.weight} kg</p>
                    <p><strong>Temperature:</strong> {log.temperature} °C</p>
                    <p><strong>Respiratory Rate:</strong> {log.respiratoryRate} breaths/min</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Pulse Rate</label>
              <Input
                type="number"
                value={pulseRate ?? ''}
                onChange={(e) => setPulseRate(parseInt(e.target.value, 10))}
                placeholder="Enter your pulse rate"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Blood Pressure</label>
              <Input
                type="text"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                placeholder="Enter your blood pressure"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Weight (kg)</label>
              <Input
                type="number"
                value={weight ?? ''}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                placeholder="Enter your weight"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Temperature (°C)</label>
              <Input
                type="number"
                value={temperature ?? ''}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                placeholder="Enter your temperature"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Respiratory Rate</label>
              <Input
                type="number"
                value={respiratoryRate ?? ''}
                onChange={(e) => setRespiratoryRate(parseInt(e.target.value, 10))}
                placeholder="Enter your respiratory rate"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <LoadingIcon /> : 'Submit Daily Log'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyInfoEntryForm;
