import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, CheckCircle2, AlertCircle, Clock, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { reports, updateReportStatus, CATEGORIES, STATUSES } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleStatusChange = (reportId, newStatus) => {
    updateReportStatus(reportId, newStatus);
    toast.success(`Report status updated to ${STATUSES[newStatus].name}!`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'OPEN':
        return <AlertCircle className="text-red-500" size={16} />;
      case 'INVESTIGATING':
        return <Clock className="text-orange-500" size={16} />;
      case 'RESOLVED':
        return <CheckCircle2 className="text-green-500" size={16} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Eye className="text-primary-600" size={28} />
            <h1 className="text-2xl font-bold text-gray-800">Reports Dashboard</h1>
          </div>
          <div className="text-sm text-gray-500">
            Total: {reports.length} reports
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <option key={key} value={key}>{cat.icon} {cat.name}</option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            {Object.entries(STATUSES).map(([key, status]) => (
              <option key={key} value={key}>{status.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No reports found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => {
                  const categoryInfo = CATEGORIES[report.category] || CATEGORIES.OTHER;
                  const statusInfo = STATUSES[report.status] || STATUSES.OPEN;
                  
                  return (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-xs">
                          {report.description}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          By {report.reporterName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{categoryInfo.icon}</span>
                          <span className="text-sm text-gray-700">{categoryInfo.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-[200px] truncate">
                          {report.address || 'No address'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={report.status}
                          onChange={(e) => handleStatusChange(report.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${statusInfo.bgColor} ${statusInfo.textColor}`}
                        >
                          {Object.entries(STATUSES).map(([key, status]) => (
                            <option key={key} value={key}>{status.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                report.riskScore >= 70 ? 'bg-red-500' :
                                report.riskScore >= 40 ? 'bg-orange-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${report.riskScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{report.riskScore}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(report.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="text-primary-600 hover:text-primary-800 font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Report Details</h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">
                    {CATEGORIES[selectedReport.category]?.icon}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUSES[selectedReport.status].bgColor} ${STATUSES[selectedReport.status].textColor}`}>
                    {STATUSES[selectedReport.status].name}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {CATEGORIES[selectedReport.category]?.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{selectedReport.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium text-gray-800">{selectedReport.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Reported by</p>
                    <p className="font-medium text-gray-800">{selectedReport.reporterName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium text-gray-800">{formatDate(selectedReport.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Risk Score</p>
                    <p className="font-medium text-gray-800">{selectedReport.riskScore}/100</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(STATUSES).map(([key, status]) => (
                      <button
                        key={key}
                        onClick={() => {
                          handleStatusChange(selectedReport.id, key);
                          setSelectedReport({ ...selectedReport, status: key });
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedReport.status === key
                            ? `${status.bgColor} ${status.textColor}`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
