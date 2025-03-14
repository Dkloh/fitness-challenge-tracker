import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2 } from 'lucide-react';

const FitnessChallengeTracker = () => {
  const [days, setDays] = useState(() => {
    // Load saved progress from localStorage
    const savedDays = localStorage.getItem('fitnessChallengeDays');
    return savedDays ? JSON.parse(savedDays) : [];
  });

  const totalDays = 30;
  const dailyGoal = {
    pushUps: 40,
    squats: 40
  };

  const rewards = [
    { milestone: 7, reward: "Buy sneakers" },
    { milestone: 15, reward: "Have a Spice Brothers sandwich" },
    { milestone: 22, reward: "Rolos" },
    { milestone: 30, reward: "Get a massage!" }
  ];

  // Save progress to localStorage whenever days change
  useEffect(() => {
    localStorage.setItem('fitnessChallengeDays', JSON.stringify(days));
  }, [days]);

  const addCompletedDay = () => {
    if (days.length < totalDays) {
      setDays([...days, { 
        date: new Date().toISOString(),
        pushUps: dailyGoal.pushUps,
        squats: dailyGoal.squats
      }]);
    }
  };

  const removeLastDay = () => {
    if (days.length > 0) {
      setDays(days.slice(0, -1));
    }
  };

  const getCurrentReward = () => {
    const completedDays = days.length;
    const activeReward = rewards.reverse().find(r => completedDays >= r.milestone);
    return activeReward || null;
  };

  const resetChallenge = () => {
    if (window.confirm('Are you sure you want to reset the entire challenge?')) {
      setDays([]);
      localStorage.removeItem('fitnessChallengeDays');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Trophy className="mr-2 text-yellow-500" /> 
        <h2 className="text-2xl font-bold">30-Day Fitness Challenge</h2>
      </div>

      <div className="mb-4">
        <p className="text-xl font-bold">Daily Goal:</p>
        <p>40 Push-ups and 40 Squats</p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold">Progress:</p>
        <div className="flex items-center">
          <CheckCircle2 className="text-green-500 mr-2" />
          <span>{days.length} / {totalDays} Days Completed</span>
        </div>
      </div>

      {getCurrentReward() && (
        <div className="bg-yellow-100 p-3 rounded-lg mb-4">
          <p className="font-bold flex items-center">
            <Trophy className="mr-2 text-yellow-600" />
            Current Reward:
          </p>
          <p>{getCurrentReward().reward}</p>
        </div>
      )}

      <div className="flex space-x-2">
        <button 
          onClick={addCompletedDay} 
          disabled={days.length >= totalDays}
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Complete Day
        </button>
        <button 
          onClick={removeLastDay} 
          className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Undo Last Day
        </button>
        <button 
          onClick={resetChallenge} 
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
        >
          Reset Challenge
        </button>
      </div>
    </div>
  );
};

export default FitnessChallengeTracker;
