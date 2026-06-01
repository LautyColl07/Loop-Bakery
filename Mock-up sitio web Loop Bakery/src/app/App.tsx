import { BrowserRouter, Routes, Route } from 'react-router';
import { CustomerHome } from './components/CustomerHome';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}