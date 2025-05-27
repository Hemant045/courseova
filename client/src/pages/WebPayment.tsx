import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coupon, setCoupon] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUPIOptions, setShowUPIOptions] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(199);
  const [qrImage, setQrImage] = useState('/images/paymentQR.jpg');
  const [upiId, setUpiId] = useState('9257372495@axl');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const amount = parseFloat(params.get('amount') || '199');
    setPaymentAmount(isNaN(amount) ? 199 : amount);
  }, [location]);

  const phoneDigitsOnly = phone.replace(/\D/g, '');
  const indianPhone =
    phoneDigitsOnly.startsWith('91') && phoneDigitsOnly.length === 12
      ? phoneDigitsOnly.slice(2)
      : phoneDigitsOnly.length === 10
      ? phoneDigitsOnly
      : '';
  const isValidIndianPhone = indianPhone.match(/^[6-9]\d{9}$/);
  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => setCoupon(e.target.value);
  const isFormValid = name.trim() && email.trim() && isValidIndianPhone;

  // 👉 Payment Done Handler
  const handlePaymentDone = () => {
    localStorage.setItem('hasPaid', 'true');
    navigate('/premium-access');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f9f9f9] px-4 py-10">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-md flex flex-col md:flex-row p-8 gap-10">
          
        {/* Left: Info */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold">Full-Stack Web Development Course</h3>
          <p className="mt-3 text-gray-600 text-base">
            Master full-stack development from scratch with hands-on learning. Build real-world apps using HTML, CSS, JS, React, Node.js & MongoDB.
          </p>
          <ul className="mt-6 text-gray-700 text-base list-disc list-inside space-y-3">
            <li><span className="font-semibold">50+ Hours</span> of HD Video Lectures</li>
            <li><span className="font-semibold">15+ Real-World Projects</span> for Practical Experience</li>
            <li><span className="font-semibold">Course Completion Certificate</span> to Showcase Skills</li>
            <li><span className="font-semibold">Assignments & Notes</span> Included</li>
          </ul>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-6">Enroll Now</h2>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                inputStyle={{
                  width: '100%',
                  height: '40px',
                  fontSize: '16px',
                }}
              />
            </div>
            <div>
              <label className="text-[16px] font-medium mb-1 block">Coupon Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={coupon}
                  onChange={handleCouponChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-[16px] outline-none"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-[#e6e6e6] hover:bg-[#dcdcdc] rounded-md text-[15px] font-medium"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Original Price</span>
                {/* <span>₹{paymentAmount}</span> */}
                <span>₹<s>2999</s></span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2">
                <span>Now</span>
                <span>₹{paymentAmount}</span>
              </div>
              <div className="text-xs text-green-600 font-medium mt-1">
                Limited Time Offer 🔥<span className='text-black'>(Refund in 5 Hours only)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPaymentModal(true)}
              disabled={!isFormValid}
              className={`w-full py-3 mt-4 rounded-md text-white font-semibold ${
                isFormValid ? 'bg-black hover:bg-gray-900' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Pay ₹{paymentAmount} and Enroll in this Course
            </button>
          </form>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full relative shadow-lg">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-3 right-4 text-gray-600 text-xl font-bold"
              >
                &times;
              </button>
              <h4 className="text-lg font-semibold mb-4">Pay Using UPI</h4>
              <div
                className="flex items-center justify-between border rounded-md p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => setShowUPIOptions(!showUPIOptions)}
              >
                <div className="flex items-center gap-2">
                  <img src="https://com.rpy.club/upi.svg" alt="UPI" className="w-6 h-6" />
                  <span>UPI Payment</span>
                </div>
                <span>₹{paymentAmount}</span>
              </div>

              {showUPIOptions && (
                <div className="mt-4 space-y-4">
                  <div className="text-center">
                    <p className="font-medium">Scan the QR Code</p>
                    <img src={qrImage} alt="QR" className="mx-auto w-40 h-40 mt-2" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md text-center">
                    <p className="text-sm font-medium">Or pay via UPI ID:</p>
                    <p className="mt-1 text-gray-800 font-mono">{upiId}</p>
                  </div>
                  <button
                    onClick={handlePaymentDone}
                    className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700"
                  >
                    ✅ I Have Completed Payment
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
