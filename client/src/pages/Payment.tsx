import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useCart } from "@/context/CartContext";
import "react-phone-input-2/lib/style.css";

const Payment = () => {
  const { cart, setCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coupon, setCoupon] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUPIOptions, setShowUPIOptions] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const qrImage = "/images/paymentQR.jpg";
  const upiId = "9257372495@axl";
  const title = "Your Cart Payment";
  const desc = "Pay to complete your purchase.";

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  const phoneDigitsOnly = phone.replace(/\D/g, "");
  const indianPhone =
    phoneDigitsOnly.startsWith("91") && phoneDigitsOnly.length === 12
      ? phoneDigitsOnly.slice(2)
      : phoneDigitsOnly.length === 10
      ? phoneDigitsOnly
      : "";

  const isValidIndianPhone = !!indianPhone.match(/^[6-9]\d{9}$/);

  const discountedAmount =
    coupon.trim().toLowerCase() === "discount10"
      ? totalAmount * 0.9
      : totalAmount;

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    isValidIndianPhone &&
    cart.length > 0;

  const handlePayment = () => {
    if (!isFormValid) return;

    // Save purchased items before clearing cart
    localStorage.setItem("purchasedItems", JSON.stringify(cart));

    alert(`Payment of ₹${discountedAmount.toFixed(2)} successful!`);

    setShowPaymentModal(false);
    setPaymentSuccess(true);

    // Clear cart after payment
    setCart([]);
  };

  // Get purchased items from localStorage to show links after payment success
  const getPurchasedItems = () => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("purchasedItems");
      return data ? JSON.parse(data) : [];
    }
    return [];
  };

  // Mapping of course IDs to their specific course page URLs
  // Make sure these keys exactly match the item.id in your cart items
  const courseLinks: { [key: string]: string } = {
    "course-fullstack": "/premium-access",
    "course-dsa": "/data-structures",
    "course-android": "/android-app-development",
    "course-webdesign": "/webdesign",      // Example, add more as needed
    "course-react": "/react-course",
    "course-node": "/node-course",
    // Add all your course IDs and their URLs here
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f1f1f1] px-4 py-10">
      <div className="max-w-5xl w-full bg-white rounded-[20px] shadow-sm flex flex-col md:flex-row p-6 md:p-10 gap-10 relative">

        {/* Left Section */}
        {!paymentSuccess && (
          <div className="w-full md:w-1/2">
            <h3 className="text-[25px] font-bold leading-snug text-black">{title}</h3>
            <p className="text-[15px] text-gray-600 mt-3">{desc}</p>
          </div>
        )}

        {/* Right Section */}
        <div className="w-full md:w-1/2">
          {!paymentSuccess ? (
            <>
              <h2 className="text-[22px] font-semibold text-black mb-6">
                Payment Details
              </h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="text-[16px] font-medium mb-1 block">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-[16px] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[16px] font-medium mb-1 block">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-[16px] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[16px] font-medium mb-1 block">Phone</label>
                  <PhoneInput
                    country={"in"}
                    value={phone}
                    onChange={setPhone}
                    inputStyle={{
                      width: "100%",
                      height: "40px",
                      fontSize: "16px",
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
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-[16px] outline-none"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#e6e6e6] hover:bg-[#dcdcdc] rounded-md text-[15px] font-medium"
                      onClick={() => {
                        alert(
                          coupon.trim() !== ""
                            ? `Coupon "${coupon}" applied!`
                            : "Please enter a coupon code"
                        );
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 text-[16px] font-medium">
                  <div className="flex justify-between mb-2 text-gray-700">
                    <span>Original Price</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[16px] font-semibold">
                    <span>Total</span>
                    <span>₹{discountedAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`w-full text-white py-3 rounded-md font-semibold text-[15px] mt-4 ${
                    isFormValid
                      ? "bg-black hover:bg-gray-900"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                  onClick={() => setShowPaymentModal(true)}
                >
                  Pay ₹{discountedAmount.toFixed(2)}
                </button>
              </form>
            </>
          ) : (
            // Payment Success Section with Downloads or Links
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-green-600">
                Payment Successful! 🎉
              </h2>
              <p className="mb-6">Thank you for your purchase. Access your items below:</p>
              <ul className="list-disc list-inside space-y-2">
                {getPurchasedItems().length === 0 ? (
                  <li>No items found.</li>
                ) : (
                  getPurchasedItems().map((item: any) => (
                    <li key={item.id}>
                      {courseLinks[item.id] ? (
                        <a
                          href={courseLinks[item.id]}
                          className="text-blue-600 underline hover:text-blue-800" target="_blank"
                        >
                          Go to {item.title} Course Page
                        </a>
                      ) : (
                        <a
                          href={item.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => alert(`Opening ${item.title} ...`)}
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          {item.title} Notes
                        </a>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>



        {/* Modal */}
        {showPaymentModal && !paymentSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-2 right-3 text-gray-500 text-2xl font-bold"
              >
                &times;
              </button>
              <h4 className="text-lg font-semibold mb-4">Select Payment Method</h4>

              <div
                className="flex justify-between items-center p-3 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowUPIOptions((prev) => !prev)}
              >
                <div className="flex items-center gap-2">
                  <img src="https://com.rpy.club/upi.svg" alt="UPI" className="w-6 h-6" />
                  <span className="text-[15px] font-medium">UPI</span>
                </div>
                <span className="text-[15px] font-semibold">
                  Pay ₹{discountedAmount.toFixed(2)}
                </span>
              </div>

              {showUPIOptions && (
                <div className="mt-4 space-y-3">
                  <div className="p-3 border border-dashed rounded-md text-center text-gray-700">
                    <p className="font-medium">Scan this QR to pay</p>
                    <img src={qrImage} alt="QR Code" className="mx-auto w-40 h-40 mt-2" />
                  </div>
                  <div className="p-3 border rounded-md bg-gray-50 text-center">
                    <p className="font-medium">Or use UPI ID</p>
                    <p className="text-sm mt-1 text-gray-700 font-mono">{upiId}</p>
                  </div>
                </div>
              )}

              <button
                className="mt-6 w-full py-3 bg-black text-white rounded-md font-semibold"
                onClick={handlePayment}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
