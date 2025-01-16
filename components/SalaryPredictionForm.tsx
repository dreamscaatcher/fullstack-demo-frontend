'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SalaryPredictionForm() {
  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    experience_level: 'EN',
    company_size: 'S',
    employment_type: 'FT',
    job_title: 'Data Engineer'
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('https://fullstack-demo-backend-production.up.railway.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      setPrediction(data.salary_prediction_usd)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Predict Your Salary</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select 
              value={formData.experience_level}
              onValueChange={(value) => setFormData({...formData, experience_level: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EN">Entry Level</SelectItem>
                <SelectItem value="MI">Mid Level</SelectItem>
                <SelectItem value="SE">Senior</SelectItem>
                <SelectItem value="EX">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_size">Company Size</Label>
            <Select
              value={formData.company_size}
              onValueChange={(value) => setFormData({...formData, company_size: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="S">Small</SelectItem>
                <SelectItem value="M">Medium</SelectItem>
                <SelectItem value="L">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employment_type">Employment Type</Label>
            <Select
              value={formData.employment_type}
              onValueChange={(value) => setFormData({...formData, employment_type: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FT">Full Time</SelectItem>
                <SelectItem value="PT">Part Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_title">Job Title</Label>
            <Select
              value={formData.job_title}
              onValueChange={(value) => setFormData({...formData, job_title: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Data Engineer">Data Engineer</SelectItem>
                <SelectItem value="Data Manager">Data Manager</SelectItem>
                <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                <SelectItem value="Machine Learning Engineer">Machine Learning Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Salary'}
          </Button>
        </form>

        {prediction !== null && (
          <div className="mt-8 p-4 bg-slate-100 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Predicted Salary:</h2>
            <p className="text-3xl text-blue-600">${prediction.toLocaleString()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}