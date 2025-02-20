import React from 'react';
import { Activity, Brain, Heart, Percent } from 'lucide-react';

interface CompatibilityScoreProps {
  scores: {
    physical: number;
    emotional: number;
    intellectual: number;
    overall: number;
  };
}

function CompatibilityScore({ scores }: CompatibilityScoreProps) {
  const formatScore = (score: number) => Math.round(score * 100);

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-blue-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Physical</h3>
        </div>
        <p className={`text-2xl font-bold ${getScoreColor(scores.physical)}`}>
          {formatScore(scores.physical)}%
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Intellectual</h3>
        </div>
        <p className={`text-2xl font-bold ${getScoreColor(scores.intellectual)}`}>
          {formatScore(scores.intellectual)}%
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-800">Emotional</h3>
        </div>
        <p className={`text-2xl font-bold ${getScoreColor(scores.emotional)}`}>
          {formatScore(scores.emotional)}%
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Percent className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Overall</h3>
        </div>
        <p className={`text-2xl font-bold ${getScoreColor(scores.overall)}`}>
          {formatScore(scores.overall)}%
        </p>
      </div>
    </div>
  );
}

export default CompatibilityScore;