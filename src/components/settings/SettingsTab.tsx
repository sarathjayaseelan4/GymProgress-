import React from 'react';
import { User as UserIcon, Calendar, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { User } from '../../types';

interface SettingsTabProps {
  user: User;
  onLogout: () => void;
  onChangeSplit: () => void;
}

export default function SettingsTab({ user, onLogout, onChangeSplit }: SettingsTabProps) {
  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: UserIcon, label: "Profile Settings", action: () => console.log('Profile') },
        { icon: Shield, label: "Privacy & Security", action: () => console.log('Privacy') }
      ]
    },
    {
      title: "Workout",
      items: [
        { icon: Calendar, label: "Change Workout Split", action: onChangeSplit },
        { icon: Bell, label: "Notifications", action: () => console.log('Notifications') }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Settings</h2>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        {/* User Profile Card */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-700/30">
          <div className="flex items-center space-x-4">
            <img 
              src={user.picture} 
              alt="Profile" 
              className="w-16 h-16 rounded-full border-2 border-blue-400/50"
            />
            <div className="flex-1">
              <div className="font-bold text-xl">{user.name}</div>
              <div className="text-blue-300">{user.email}</div>
              <div className="text-sm text-gray-400 mt-1">Member since January 2024</div>
            </div>
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-300 px-2">{group.title}</h3>
            <div className="bg-gray-900/70 rounded-xl border border-gray-700/50 overflow-hidden">
              {group.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={item.action}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-800/70 transition-colors border-b border-gray-700/50 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="bg-gray-900/70 rounded-xl p-4 border border-gray-700/50">
          <h3 className="font-semibold mb-3">App Information</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span>March 2024</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-red-900/70 hover:bg-red-800/70 border border-red-700/50 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}