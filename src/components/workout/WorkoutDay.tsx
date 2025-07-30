import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Plus, X, Edit3, Check, Trash2 } from 'lucide-react';
import { DEFAULT_EXERCISES } from '../../data/exercises';
import { WorkoutDayData, SetData } from '../../types';

interface WorkoutDayProps {
  day: WorkoutDayData;
  workoutData: any;
  onSaveWorkout: (data: any) => void;
}

export default function WorkoutDay({ day, workoutData, onSaveWorkout }: WorkoutDayProps) {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [currentSet, setCurrentSet] = useState(1);
  const [setData, setSetData] = useState<SetData>({ reps: '', weight: '', rpe: '' });
  const [restTimer, setRestTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [notes, setNotes] = useState('');
  const [completedSets, setCompletedSets] = useState<{[key: string]: any[]}>({});
  const [customExercises, setCustomExercises] = useState<string[]>([]);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [editingExercise, setEditingExercise] = useState<string | null>(null);
  const [editExerciseName, setEditExerciseName] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            // Timer finished notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Rest time over!', {
                body: 'Time for your next set',
                icon: '/favicon.ico'
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, restTimer]);

  // Get default exercises for the day's muscle groups
  const defaultExercises = day.muscles.flatMap(muscle => 
    DEFAULT_EXERCISES[muscle]?.slice(0, 2) || []
  );

  // Combine default and custom exercises
  const allExercises = [...defaultExercises, ...customExercises];

  // Get all available exercises for the exercise picker
  const getAvailableExercises = () => {
    if (!selectedMuscleGroup) return [];
    return DEFAULT_EXERCISES[selectedMuscleGroup] || [];
  };

  const handleSetComplete = () => {
    if (!setData.reps || !setData.weight) return;
    
    const newSet = {
      set: currentSet,
      reps: parseInt(setData.reps),
      weight: parseFloat(setData.weight),
      rpe: setData.rpe ? parseInt(setData.rpe) : null,
      timestamp: new Date().toISOString()
    };

    setCompletedSets(prev => ({
      ...prev,
      [activeExercise!]: [...(prev[activeExercise!] || []), newSet]
    }));
    
    setCurrentSet(prev => prev + 1);
    setSetData({ reps: '', weight: '', rpe: '' });
    
    // Start rest timer
    setRestTimer(120);
    setIsTimerRunning(true);
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const startRestTimer = (seconds: number) => {
    setRestTimer(seconds);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setRestTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddCustomExercise = () => {
    if (newExerciseName.trim()) {
      setCustomExercises(prev => [...prev, newExerciseName.trim()]);
      setNewExerciseName('');
      setSelectedMuscleGroup('');
      setShowAddExercise(false);
    }
  };

  const handleAddFromLibrary = (exerciseName: string) => {
    if (!customExercises.includes(exerciseName) && !defaultExercises.includes(exerciseName)) {
      setCustomExercises(prev => [...prev, exerciseName]);
    }
    setShowAddExercise(false);
    setSelectedMuscleGroup('');
  };

  const handleRemoveExercise = (exerciseName: string) => {
    // Only allow removing custom exercises, not default ones
    if (customExercises.includes(exerciseName)) {
      setCustomExercises(prev => prev.filter(ex => ex !== exerciseName));
      // Clear any completed sets for this exercise
      setCompletedSets(prev => {
        const newSets = { ...prev };
        delete newSets[exerciseName];
        return newSets;
      });
      // Close exercise if it was active
      if (activeExercise === exerciseName) {
        setActiveExercise(null);
      }
    }
  };

  const handleEditExercise = (exerciseName: string) => {
    setEditingExercise(exerciseName);
    setEditExerciseName(exerciseName);
  };

  const handleSaveEdit = () => {
    if (editExerciseName.trim() && editingExercise) {
      setCustomExercises(prev => 
        prev.map(ex => ex === editingExercise ? editExerciseName.trim() : ex)
      );
      
      // Update completed sets with new name
      if (completedSets[editingExercise]) {
        setCompletedSets(prev => {
          const newSets = { ...prev };
          newSets[editExerciseName.trim()] = newSets[editingExercise];
          delete newSets[editingExercise];
          return newSets;
        });
      }
      
      // Update active exercise if needed
      if (activeExercise === editingExercise) {
        setActiveExercise(editExerciseName.trim());
      }
      
      setEditingExercise(null);
      setEditExerciseName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingExercise(null);
    setEditExerciseName('');
  };

  const handleCompleteWorkout = () => {
    onSaveWorkout({ 
      notes, 
      exercises: completedSets,
      customExercises,
      dayName: day.name,
      focus: day.focus,
      muscles: day.muscles
    });
    
    // Reset state
    setCompletedSets({});
    setActiveExercise(null);
    setCurrentSet(1);
    setNotes('');
    setRestTimer(0);
    setIsTimerRunning(false);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Rest Timer */}
      {restTimer > 0 && (
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 rounded-xl border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Timer className="w-6 h-6 text-blue-400" />
              <div>
                <div className="font-semibold text-lg">{formatTime(restTimer)}</div>
                <div className="text-sm text-gray-300">Rest time remaining</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleTimer}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Quick rest buttons */}
          <div className="flex space-x-2 mt-3">
            {[60, 90, 120, 180].map(seconds => (
              <button
                key={seconds}
                onClick={() => startRestTimer(seconds)}
                className="px-3 py-1 bg-blue-700/50 hover:bg-blue-600/70 rounded-lg text-sm transition-colors"
              >
                {seconds / 60}m
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add Exercise Section */}
      <div className="bg-gray-900/70 rounded-xl p-4 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Exercises</h3>
          <button
            onClick={() => setShowAddExercise(!showAddExercise)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Exercise</span>
          </button>
        </div>

        {/* Add Exercise Form */}
        {showAddExercise && (
          <div className="bg-gray-800/50 rounded-lg p-4 mb-4 space-y-4">
            <h4 className="font-medium">Add New Exercise</h4>
            
            {/* Muscle Group Selector */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Select Muscle Group</label>
              <select
                value={selectedMuscleGroup}
                onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Choose muscle group...</option>
                {Object.keys(DEFAULT_EXERCISES).map(muscle => (
                  <option key={muscle} value={muscle}>{muscle}</option>
                ))}
              </select>
            </div>

            {/* Exercise Library */}
            {selectedMuscleGroup && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">From Exercise Library</label>
                <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                  {getAvailableExercises().map(exercise => (
                    <button
                      key={exercise}
                      onClick={() => handleAddFromLibrary(exercise)}
                      disabled={allExercises.includes(exercise)}
                      className="text-left p-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed rounded text-sm transition-colors"
                    >
                      {exercise} {allExercises.includes(exercise) && '(Already added)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Exercise Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Or Create Custom Exercise</label>
              <input
                type="text"
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
                placeholder="Enter custom exercise name..."
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddCustomExercise}
                disabled={!newExerciseName.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-2 rounded-lg font-medium transition-colors"
              >
                Add Custom
              </button>
              <button
                onClick={() => {
                  setShowAddExercise(false);
                  setNewExerciseName('');
                  setSelectedMuscleGroup('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        {allExercises.map((exercise) => (
          <div key={exercise} className="bg-gray-900/70 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                {editingExercise === exercise ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editExerciseName}
                      onChange={(e) => setEditExerciseName(e.target.value)}
                      className="bg-gray-800 rounded px-2 py-1 text-white text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="p-1 text-green-400 hover:text-green-300"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold text-lg">{exercise}</h3>
                    {completedSets[exercise] && (
                      <div className="text-sm text-green-400">
                        {completedSets[exercise].length} sets completed
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Edit button for custom exercises */}
                {customExercises.includes(exercise) && editingExercise !== exercise && (
                  <button
                    onClick={() => handleEditExercise(exercise)}
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
                
                {/* Remove button for custom exercises */}
                {customExercises.includes(exercise) && (
                  <button
                    onClick={() => handleRemoveExercise(exercise)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                
                {/* Start/Close button */}
                {editingExercise !== exercise && (
                  <button
                    onClick={() => setActiveExercise(activeExercise === exercise ? null : exercise)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeExercise === exercise
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {activeExercise === exercise ? 'Close' : 'Start'}
                  </button>
                )}
              </div>
            </div>

            {/* Previous performance */}
            <div className="text-xs text-gray-500 mb-3">
              Previous: 135 lbs × 12 reps @ RPE 8 (Last week)
            </div>

            {/* Set logging interface */}
            {activeExercise === exercise && (
              <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
                <div className="text-sm text-blue-400 font-medium">Set {currentSet}</div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 font-medium">Reps</label>
                    <input
                      type="number"
                      value={setData.reps}
                      onChange={(e) => setSetData(prev => ({ ...prev, reps: e.target.value }))}
                      className="w-full bg-gray-700 rounded-lg px-3 py-3 text-white text-center font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 font-medium">Weight (lbs)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={setData.weight}
                      onChange={(e) => setSetData(prev => ({ ...prev, weight: e.target.value }))}
                      className="w-full bg-gray-700 rounded-lg px-3 py-3 text-white text-center font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="135"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 font-medium">RPE (1-10)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={setData.rpe}
                      onChange={(e) => setSetData(prev => ({ ...prev, rpe: e.target.value }))}
                      className="w-full bg-gray-700 rounded-lg px-3 py-3 text-white text-center font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="8"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSetComplete}
                  disabled={!setData.reps || !setData.weight}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
                >
                  Complete Set {currentSet}
                </button>
              </div>
            )}

            {/* Completed sets display */}
            {completedSets[exercise] && completedSets[exercise].length > 0 && (
              <div className="mt-3 space-y-2">
                <div className="text-sm font-medium text-gray-300">Completed Sets:</div>
                {completedSets[exercise].map((set, index) => (
                  <div key={index} className="text-sm text-gray-400 bg-gray-800/30 p-2 rounded">
                    Set {set.set}: {set.reps} reps × {set.weight} lbs
                    {set.rpe && ` @ RPE ${set.rpe}`}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Workout Notes */}
      <div className="bg-gray-900/70 rounded-xl p-4 border border-gray-700/50">
        <label className="block text-sm font-medium mb-3 text-gray-300">Workout Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How did you feel? Any observations, energy levels, or notes about form..."
          className="w-full bg-gray-800 rounded-lg p-4 text-white resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={4}
        />
      </div>

      {/* Complete Workout Button */}
      <button
        onClick={handleCompleteWorkout}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Complete Workout 🎉
      </button>
    </div>
  );
}