import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, Users, Church, FileSpreadsheet, LogOut } from 'lucide-react';
import { StatisticsCards, RegistrationsTable } from '@/components/admin';
import { Button } from '@/components/ui';
import { adminApi, authApi } from '@/api';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

export function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authApi.logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  const handleExportExcel = async () => {
    try {
      const registrations = await adminApi.getAllRegistrations();

      // Prepare data for Excel
      const excelData = registrations.map((r, index) => ({
        'S/N': index + 1,
        'Full Name': r.fullName,
        'Gender': r.sex,
        'Email Address': r.email,
        'Phone Number': r.phoneNumber,
        'Location/State': r.locationState,
        'Expectations': r.expectations,
        'Needs Accommodation': r.needsAccommodation ? 'Yes' : 'No',
        'Transportation': r.meansOfTransportation,
        'Coming With': r.comingWith,
        'Number of Persons': r.numberOfPersons || '-',
        'Registration Date': new Date(r.registeredAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      }));

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // Set column widths for better readability
      const columnWidths = [
        { wch: 5 },   // S/N
        { wch: 25 },  // Full Name
        { wch: 10 },  // Gender
        { wch: 30 },  // Email
        { wch: 15 },  // Phone
        { wch: 20 },  // Location
        { wch: 50 },  // Expectations
        { wch: 18 },  // Accommodation
        { wch: 15 },  // Transportation
        { wch: 15 },  // Coming With
        { wch: 18 },  // Number of Persons
        { wch: 15 },  // Registration Date
      ];
      worksheet['!cols'] = columnWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

      // Create summary sheet
      const totalRegistrations = registrations.length;
      const needsAccommodation = registrations.filter(r => r.needsAccommodation).length;
      const totalPersons = registrations.reduce((sum, r) => sum + (r.numberOfPersons || 0) + 1, 0);
      const maleCount = registrations.filter(r => r.sex === 'Male').length;
      const femaleCount = registrations.filter(r => r.sex === 'Female').length;

      const summaryData = [
        { 'Metric': 'Total Registrations', 'Value': totalRegistrations },
        { 'Metric': 'Total Expected Attendees', 'Value': totalPersons },
        { 'Metric': 'Male Registrants', 'Value': maleCount },
        { 'Metric': 'Female Registrants', 'Value': femaleCount },
        { 'Metric': 'Need Accommodation', 'Value': needsAccommodation },
        { 'Metric': 'No Accommodation Needed', 'Value': totalRegistrations - needsAccommodation },
        { 'Metric': 'Report Generated', 'Value': new Date().toLocaleString('en-GB') },
      ];

      const summarySheet = XLSX.utils.json_to_sheet(summaryData);
      summarySheet['!cols'] = [{ wch: 25 }, { wch: 25 }];
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

      // Generate filename with date
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `TOPS_Anniversary_Registrations_${dateStr}.xlsx`;

      // Save file
      XLSX.writeFile(workbook, filename);

      toast.success(`Exported ${totalRegistrations} registrations successfully!`);
    } catch {
      toast.error('Failed to export data');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="floating-shapes">
        <div className="floating-shape w-96 h-96 top-0 -right-48 animate-float" />
        <div className="floating-shape w-64 h-64 bottom-0 -left-32 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Simplified Navigation Bar */}
        <nav className="px-4 py-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Registration</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Church className="w-5 h-5 text-gold-400" />
                <span className="text-white/90 text-sm font-semibold hidden sm:inline">TOPS CHAPTER</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-full text-red-400 hover:text-red-300 text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-gold-400" />
                  Admin Dashboard
                </h1>
                <p className="text-white/60 mt-1 text-sm">
                  Anniversary & Covenant Service 2026 • June 17-21
                </p>
              </div>
              <Button variant="secondary" onClick={handleExportExcel} className="gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export to Excel</span>
              </Button>
            </motion.header>

            {/* Statistics Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <StatisticsCards />
            </motion.section>

            {/* Registrations Table Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gold-400" />
                <h2 className="text-xl font-semibold text-white">All Registrations</h2>
              </div>
              <RegistrationsTable />
            </motion.section>

            {/* Footer */}
            <footer className="mt-12 pt-6 border-t border-white/10 text-center">
              <p className="text-white/40 text-sm">
                © 2026 TOPS CHAPTER • Cherubim & Seraphim Church Unification Campus Fellowship
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
