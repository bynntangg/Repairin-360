import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AuthView from './components/auth/AuthView';

// Customer Portal Views
import CustomerDashboard from './components/customer/CustomerDashboard';
import SmartCheckView from './components/customer/SmartCheckView';
import SmartMatchView from './components/customer/SmartMatchView';
import OrderTrackingView from './components/customer/OrderTrackingView';
import RepairPassportView from './components/customer/RepairPassportView';
import CircularRewardView from './components/customer/CircularRewardView';
import RepairOrReplaceView from './components/customer/RepairOrReplaceView';

// Technician Portal Views
import TechnicianDashboard from './components/technician/TechnicianDashboard';
import ServiceRequestsView from './components/technician/ServiceRequestsView';
import RepairWorkspaceView from './components/technician/RepairWorkspaceView';
import ScheduleManagerView from './components/technician/ScheduleManagerView';
import TechnicianIncomeView from './components/technician/TechnicianIncomeView';
import TechnicianProfileView from './components/technician/TechnicianProfileView';

// Admin Portal Views
import AdminDashboard from './components/admin/AdminDashboard';
import TechVerificationView from './components/admin/TechVerificationView';
import BookingManagementView from './components/admin/BookingManagementView';
import CategoryKnowledgeView from './components/admin/CategoryKnowledgeView';
import RewardManagementView from './components/admin/RewardManagementView';
import ComplaintAdminView from './components/admin/ComplaintAdminView';

function MainLayout() {
  const { currentUser, currentRole } = useApp();

  const [activeTab, setActiveTab] = useState(() => {
    if (currentRole === 'technician') return 'tech-dashboard';
    if (currentRole === 'admin') return 'admin-dashboard';
    return 'dashboard';
  });

  // Keep activeTab aligned when role switches
  useEffect(() => {
    if (currentRole === 'technician') setActiveTab('tech-dashboard');
    else if (currentRole === 'admin') setActiveTab('admin-dashboard');
    else setActiveTab('dashboard');
  }, [currentRole]);

  const [preselectedCategory, setPreselectedCategory] = useState(null);

  const handleSelectCategory = (catId) => {
    setPreselectedCategory(catId);
    setActiveTab('smartcheck');
  };

  // If user is not logged in, show AuthView (Login / Register)
  if (!currentUser) {
    return <AuthView />;
  }

  const renderCurrentView = () => {
    // 1. Customer Portal
    if (currentRole === 'customer') {
      switch (activeTab) {
        case 'dashboard':
          return <CustomerDashboard setActiveTab={setActiveTab} onSelectCategory={handleSelectCategory} />;
        case 'smartcheck':
          return <SmartCheckView setActiveTab={setActiveTab} preselectedCategory={preselectedCategory} />;
        case 'smartmatch':
          return <SmartMatchView setActiveTab={setActiveTab} />;
        case 'orders':
        case 'complaints':
          return <OrderTrackingView setActiveTab={setActiveTab} />;
        case 'passports':
          return <RepairPassportView />;
        case 'rewards':
          return <CircularRewardView />;
        case 'repair-or-replace':
          return <RepairOrReplaceView setActiveTab={setActiveTab} />;
        default:
          return <CustomerDashboard setActiveTab={setActiveTab} onSelectCategory={handleSelectCategory} />;
      }
    }

    // 2. Technician Portal
    if (currentRole === 'technician') {
      switch (activeTab) {
        case 'tech-dashboard':
          return <TechnicianDashboard setActiveTab={setActiveTab} />;
        case 'tech-requests':
          return <ServiceRequestsView setActiveTab={setActiveTab} />;
        case 'tech-workspace':
          return <RepairWorkspaceView />;
        case 'tech-schedule':
          return <ScheduleManagerView />;
        case 'tech-income':
          return <TechnicianIncomeView />;
        case 'tech-profile':
          return <TechnicianProfileView />;
        default:
          return <TechnicianDashboard setActiveTab={setActiveTab} />;
      }
    }

    // 3. Admin Portal
    if (currentRole === 'admin') {
      switch (activeTab) {
        case 'admin-dashboard':
          return <AdminDashboard setActiveTab={setActiveTab} />;
        case 'admin-verifications':
          return <TechVerificationView />;
        case 'admin-bookings':
          return <BookingManagementView />;
        case 'admin-categories':
          return <CategoryKnowledgeView />;
        case 'admin-rewards':
          return <RewardManagementView />;
        case 'admin-complaints':
          return <ComplaintAdminView />;
        default:
          return <AdminDashboard setActiveTab={setActiveTab} />;
      }
    }

    return <CustomerDashboard setActiveTab={setActiveTab} onSelectCategory={handleSelectCategory} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F6] text-[#26332D]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderCurrentView()}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
