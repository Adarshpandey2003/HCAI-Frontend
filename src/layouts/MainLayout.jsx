// src/layouts/MainLayout.jsx
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Common/Header';

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center p-4">
        <p className="text-sm">© 2025 AI-Enabled-Healthcare System. All rights reserved. Made with ❤️ by Team AIEHS</p>
      </footer>
    </>
  );
}
