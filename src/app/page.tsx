'use client';

import { useState } from 'react';

export default function Home() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://fullstack-demo-backend-production.up.railway.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experience_level: formData.get('experience_level'),
          company_size: formData.get('company_size'),
          employment_type: formData.get('employment_type'),
          job_title: formData.get('job_title'),
        }),
      });
      
      const data = await response.json();
      setPrediction(data.salary_prediction_usd);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8">Salary Predictor</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Experience Level</label>
            <select name="experience_level" className="w-full p-2 border rounded">
              <option value="EN">Entry Level</option>
              <option value="MI">Mid Level</option>
              <option value="SE">Senior</option>
              <option value="EX">Executive</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Company Size</label>
            <select name="company_size" className="w-full p-2 border rounded">
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Employment Type</label>
            <select name="employment_type" className="w-full p-2 border rounded">
              <option value="FT">Full Time</option>
              <option value="PT">Part Time</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Job Title</label>
            <select name="job_title" className="w-full p-2 border rounded">
              <option value="Data Engineer">Data Engineer</option>
              <option value="Data Manager">Data Manager</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Predict Salary'}
          </button>
        </form>

        {prediction !== null && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Predicted Salary:</h2>
            <p className="text-3xl text-blue-600">${prediction.toLocaleString()}</p>
          </div>
        )}
      </div>
    </main>
  );
}