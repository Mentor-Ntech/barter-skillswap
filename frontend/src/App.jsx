

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import Service from './components/Service/Service'
import BookingPage from './components/BookingPage/BookingPage';
import BookingForm from './components/BookingForm/BookingForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/service" element={<Service />} />
      <Route path="/booking/:name" element={<BookingPage />} />
      <Route path="/booking-form" element={<BookingForm />} />
    </Routes>
  );
}
