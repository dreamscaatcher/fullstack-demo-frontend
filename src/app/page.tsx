'use client';

import { useEffect, useState } from 'react';

const API_URL = 'https://fullstack-demo-backend-production.up.railway.app';

export default function Home() {
  const [backendMessage, setBackendMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/`);
        const data = await response.json();
        setBackendMessage(data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
        setBackendMessage('Error connecting to backend');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">This is frontend</h1>
        {loading ? (
          <p>Loading backend message...</p>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Message from Backend:</h2>
            <p className="text-xl">{backendMessage}</p>
          </div>
        )}
      </div>
    </main>
  );
}