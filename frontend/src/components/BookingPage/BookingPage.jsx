// import { useLocation, useNavigate } from 'react-router-dom';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { useState } from 'react';
// import Layout from '../Layout/Layout';

// export default function BookingPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { name = "ANKIT RAO" } = location.state || {};
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showTimeSlots, setShowTimeSlots] = useState(false);
//   const [selectedTime, setSelectedTime] = useState('');

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setShowTimeSlots(true);
//   };

//   const handleTimeChange = (event) => {
//     setSelectedTime(event.target.value);
//   };

//   const handleCheckAvailability = () => {
//     setShowTimeSlots(true);
//   };

//   return (
//     <Layout>
//     <div className="min-h-screen bg-gradient-to-b from-[#E6F4F1] to-white">
      

//       <main className="max-w-3xl mx-auto px-6 py-8">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="flex items-center text-gray-600 mb-8"
//         >
//           <span className="mr-2">←</span> Back
//         </button>

//         <h2 className="text-4xl font-bold text-center mb-6">{name}</h2>
//         <p className="text-center text-gray-600 mb-8">
//           Check out our availability and book the date and time that works for you
//         </p>

//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold">Select a Date and Time</h3>
//             <div className="text-sm text-gray-600">
//               Timezone: India Standard Time (IST)
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row gap-8">
//             <div className="flex-1">
//               <Calendar 
//                 onChange={handleDateChange} 
//                 value={selectedDate}
//                 className="w-full"
//                 tileClassName="text-center"
//               />
//             </div>

//             <div className="flex-1">
//               <h4 className="font-medium mb-2">
//                 {selectedDate.toLocaleDateString('en-US', { 
//                   weekday: 'long', 
//                   day: 'numeric', 
//                   month: 'long' 
//                 })}
//               </h4>

//               {!showTimeSlots ? (
//                 <button
//                   onClick={handleCheckAvailability}
//                   className="w-full bg-black text-white py-2 px-4 rounded"
//                 >
//                   Check Next Availability
//                 </button>
//               ) : (
//                 <div>
//                   <p className="text-gray-600 mb-4">No availability</p>
//                   <select
//                     value={selectedTime}
//                     onChange={handleTimeChange}
//                     className="w-full p-2 border rounded mb-4"
//                   >
//                     <option value="">Select time</option>
//                     <option value="09:00">9:00 AM</option>
//                     <option value="10:00">10:00 AM</option>
//                     <option value="11:00">11:00 AM</option>
//                   </select>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <button
//             className="w-full bg-black text-white py-3 rounded-lg font-medium"
//             onClick={() => {
//               if (selectedTime) {
//                 alert(`Booking confirmed for ${selectedDate.toDateString()} at ${selectedTime}`);
//               } else {
//                 alert('Please select a time slot');
//               }
//             }}
//           >
//             Next
//           </button>
//         </div>

//         <div className="mt-8">
//           <h3 className="font-semibold mb-2">Service Details</h3>
//           <div className="border-t pt-4">
//             {/* Service details content would go here */}
//           </div>
//         </div>
//       </main>
//     </div>

//     </Layout>
//   );
// }

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Layout from '../Layout/Layout';

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name = "ANKIT RAO" } = location.state || {};
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowTimeSlots(true);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleCheckAvailability = () => {
    setShowTimeSlots(true);
  };

  const handleNextClick = () => {
    if (selectedTime) {
      navigate('/booking-form', {
        state: { selectedDate, selectedTime },
      });
    } else {
      alert('Please select a time slot');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#E6F4F1] to-white">
        <main className="max-w-3xl mx-auto px-6 py-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-600 mb-8"
          >
            <span className="mr-2">←</span> Back
          </button>

          <h2 className="text-4xl font-bold text-center mb-6">{name}</h2>
          <p className="text-center text-gray-600 mb-8">
            Check out our availability and book the date and time that works for you
          </p>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Select a Date and Time</h3>
              <div className="text-sm text-gray-600">
                Timezone: India Standard Time (IST)
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <Calendar 
                  onChange={handleDateChange} 
                  value={selectedDate}
                  className="w-full"
                  tileClassName="text-center"
                />
              </div>

              <div className="flex-1">
                <h4 className="font-medium mb-2">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </h4>

                {!showTimeSlots ? (
                  <button
                    onClick={handleCheckAvailability}
                    className="w-full bg-black text-white py-2 px-4 rounded"
                  >
                    Check Next Availability
                  </button>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">No availability</p>
                    <select
                      value={selectedTime}
                      onChange={handleTimeChange}
                      className="w-full p-2 border rounded mb-4"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              className="w-full bg-black text-white py-3 rounded-lg font-medium"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">Service Details</h3>
            <div className="border-t pt-4">
              {/* Service details content would go here */}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
