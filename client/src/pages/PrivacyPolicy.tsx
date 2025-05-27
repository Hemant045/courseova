import React from 'react';
import Footer from '../components/footer';

const PrivacyPolicy = () => {
  return (
    <>
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At Courseova, we value your privacy and are committed to protecting your personal information.
        This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Personal information such as name, email, and contact details when you sign up.</li>
        <li>Technical data like IP address, browser type, and device information.</li>
        <li>Usage data including the pages you visit and interactions with the site.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To send important updates and course information.</li>
        <li>To improve user experience and develop new features.</li>
        <li>To analyze website traffic and trends.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing of Information</h2>
      <p className="mb-4">
        We do not sell or share your personal data with third parties without your consent, except where required by law.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Security</h2>
      <p className="mb-4">
        We use industry-standard security measures to protect your data, including encryption and firewalls.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, modify, or delete your data at any time by contacting us.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy occasionally. All changes will be reflected on this page with the updated date.
      </p>

      <p className="text-sm text-gray-500">Last updated: May 19, 2025</p>

    </div>
    <Footer />
  </>
  );
};

export default PrivacyPolicy;
