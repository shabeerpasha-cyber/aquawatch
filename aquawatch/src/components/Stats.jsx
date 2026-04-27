import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Users, FileText } from 'lucide-react';

export default function Stats() {
  const { reports, users, getStats, CATEGORIES, STATUSES } = useApp();
  const stats = getStats();

  // Calculate category breakdown
  const categoryStats = Object.entries(CATEGORIES).map(([key, cat]) => {
    const count = reports.filter(r => r.category === key).length;
    const percentage = reports.length > 0 ? (count / reports.length) * 100 : 0;
    return { ...cat, key, count, percentage };
  }).sort((a, b) => b.count - a.count);

  // Calculate status breakdown
  const statusStats = Object.entries(STATUSES).map(([key, status]) => {
    const count = reports.filter(r => r.status === key).length;
    const percentage = reports.length > 0 ? (count / reports.length) * 100 : 0;
    return { ...status, key, count, percentage };
  });

  // Calculate average risk by category
  const riskByCategory = Object.entries(CATEGORIES).map(([key, cat]) => {
    const categoryReports = reports.filter(r => r.category === key);
    const avgRisk = categoryReports.length > 0
      ? Math.round(categoryReports.reduce((sum, r) => sum + r.riskScore, 0) / categoryReports.length)
      : 0;
    return { ...cat, key, avgRisk, count: categoryReports.length };
  }).sort((a, b) => b.avgRisk - a.avgRisk);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-2">
          <BarChart3 size={32} />
          <h1 className="text-2xl font-bold">WASH Statistics</h1>
        </div>
        <p className="text-primary-100">
          Overview of water and sanitation reports across the community.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="text-primary-600" size={24} />
            <span className="text-gray-500 text-sm">Total Reports</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.totalReports}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className="text-red-500" size={24} />
            <span className="text-gray-500 text-sm">Open Issues</span>
          </div>
          <p className="text-3xl font-bold text-red-600">{stats.openReports}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle2 className="text-green-500" size={24} />
            <span className="text-gray-500 text-sm">Resolved</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.resolvedReports}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="text-orange-500" size={24} />
            <span className="text-gray-500 text-sm">Avg Risk Score</span>
          </div>
          <p className="text-3xl font-bold text-orange-600">{stats.averageRisk}</p>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Status Distribution</h2>
        <div className="space-y-4">
          {statusStats.map((status) => (
            <div key={status.key}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                  <span className="font-medium text-gray-700">{status.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-800">{status.count}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    ({status.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${status.percentage}%`,
                    backgroundColor: status.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Reports by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryStats.map((cat) => (
            <div 
              key={cat.key}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-medium text-gray-800">{cat.name}</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{cat.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    width: `${cat.percentage}%`,
                    backgroundColor: cat.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🔬 Risk Analysis by Category</h2>
        <div className="space-y-3">
          {riskByCategory.map((cat) => (
            <div key={cat.key} className="flex items-center space-x-4">
              <span className="text-2xl">{cat.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                  <span className="text-sm font-bold text-gray-800">Avg Risk: {cat.avgRisk}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full"
                    style={{ 
                      width: `${cat.avgRisk}%`,
                      backgroundColor: cat.avgRisk >= 70 ? '#ef4444' : 
                                       cat.avgRisk >= 40 ? '#f97316' : '#22c55e'
                    }}
                  />
                </div>
              </div>
              <span className="text-sm text-gray-500 w-16 text-right">
                {cat.count} reports
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🌍 Community Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Users className="mx-auto text-primary-600 mb-2" size={32} />
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            <p className="text-sm text-gray-500">Active Reporters</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <FileText className="mx-auto text-primary-600 mb-2" size={32} />
            <p className="text-2xl font-bold text-gray-800">
              {reports.reduce((sum, r) => sum + r.riskScore, 0)}
            </p>
            <p className="text-sm text-gray-500">Total Risk Identified</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <CheckCircle2 className="mx-auto text-green-600 mb-2" size={32} />
            <p className="text-2xl font-bold text-gray-800">
              {stats.totalReports > 0 
                ? Math.round((stats.resolvedReports / stats.totalReports) * 100)
                : 0}%
            </p>
            <p className="text-sm text-gray-500">Resolution Rate</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <TrendingUp className="mx-auto text-primary-600 mb-2" size={32} />
            <p className="text-2xl font-bold text-gray-800">
              {users.reduce((sum, u) => sum + u.points, 0)}
            </p>
            <p className="text-sm text-gray-500">Total Points Earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
