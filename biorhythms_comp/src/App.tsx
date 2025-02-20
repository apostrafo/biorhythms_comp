import React, { useState } from 'react';
import { Activity, Brain, Heart, Info } from 'lucide-react';
import { calculateBiorhythm, calculateCompatibilityScores, CompatibilityMethod } from './utils/biorhythm';
import BiorhythmChart from './components/BiorhythmChart';
import CompatibilityScore from './components/CompatibilityScore';
import DateInput from './components/DateInput';

function App() {
  const [date1, setDate1] = useState<string>('');
  const [date2, setDate2] = useState<string>('');
  const [method, setMethod] = useState<CompatibilityMethod>('wave');
  const [showMethodInfo, setShowMethodInfo] = useState(false);

  const birthDate1 = date1 ? new Date(date1) : null;
  const birthDate2 = date2 ? new Date(date2) : null;
  const biorhythm1 = birthDate1 ? calculateBiorhythm(birthDate1) : null;
  const biorhythm2 = birthDate2 ? calculateBiorhythm(birthDate2) : null;

  const compatibilityScores = (birthDate1 && birthDate2 && biorhythm1 && biorhythm2) 
    ? calculateCompatibilityScores(birthDate1, birthDate2, biorhythm1, biorhythm2, method)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
          Biorhythm Compatibility
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <DateInput
            label="Person 1 Birthdate"
            value={date1}
            onChange={setDate1}
          />
          <DateInput
            label="Person 2 Birthdate"
            value={date2}
            onChange={setDate2}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Calculation Method</h2>
            <button
              onClick={() => setShowMethodInfo(!showMethodInfo)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              title="Show method information"
            >
              <Info size={20} />
            </button>
          </div>

          {showMethodInfo && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
              <p className="font-semibold mb-2">Wave Analysis:</p>
              <p className="mb-3">
                Compares the continuous wave patterns of both people's biorhythms over time.
                This method considers the actual daily values and their similarities,
                providing a more detailed analysis of compatibility throughout the cycle.
              </p>
              <p className="font-semibold mb-2">Phase Difference:</p>
              <p>
                Calculates compatibility based on the phase alignment of cycles.
                Maximum compatibility (100%) occurs when cycles are perfectly aligned,
                while minimum compatibility (0%) occurs when cycles are opposite (half-cycle apart).
                This method focuses on the overall cycle synchronization rather than daily variations.
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="wave"
                checked={method === 'wave'}
                onChange={(e) => setMethod(e.target.value as CompatibilityMethod)}
                className="mr-2"
              />
              <span className="text-gray-700">Wave Analysis</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="phase"
                checked={method === 'phase'}
                onChange={(e) => setMethod(e.target.value as CompatibilityMethod)}
                className="mr-2"
              />
              <span className="text-gray-700">Phase Difference</span>
            </label>
          </div>
        </div>

        {compatibilityScores && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Compatibility Scores</h2>
            <CompatibilityScore scores={compatibilityScores} />
          </div>
        )}

        {(biorhythm1 || biorhythm2) && (
          <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Biorhythm Chart</h2>
            <BiorhythmChart biorhythm1={biorhythm1} biorhythm2={biorhythm2} />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Physical</h2>
            </div>
            <p className="text-gray-600">
              23-day cycle affecting physical strength, endurance, and energy levels.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Intellectual</h2>
            </div>
            <p className="text-gray-600">
              33-day cycle influencing memory, alertness, and analytical thinking.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-800">Emotional</h2>
            </div>
            <p className="text-gray-600">
              28-day cycle affecting mood, sensitivity, and creativity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;