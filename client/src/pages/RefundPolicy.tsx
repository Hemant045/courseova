import React from 'react';
import Head from 'next/head';
import Footer from '../components/footer';
const RefundPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Refund & Return Policy | Courseova</title>
        <meta name="description" content="Understand our refund and return policy before making a purchase." />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Refund & Return Policy</h1>

        <section className="mb-8 text-gray-700 space-y-4">
          <p>
            Thank you for shopping with us. We value your trust and aim to provide a seamless digital shopping experience. Please read our refund and return policy carefully before completing your purchase.
          </p>

          <h2 className="text-2xl font-semibold mt-6">General Policy</h2>
          <p>
            We deal exclusively in digital products. As such, all purchases made through our platform are considered final. We offer refunds but for 5 an hours, exchanges, or returns for any digital goods once the transaction has been completed.
          </p>

          <p>
            Since digital products are instantly delivered and downloadable, we cannot retrieve or deactivate them after purchase — hence, all sales are final.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Product Delivery</h2>
          <p>
            All our products are delivered electronically via email or download link. We do not ship any physical items. If you do not receive your product within 10 minutes of purchase, please check your spam or promotions folder.
          </p>

          <p>
            Still having issues? No worries — we’re here to help. Just contact us and we’ll resolve your concern promptly.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Exceptions</h2>
          <p>
            In rare scenarios where technical issues prevent product access or where duplicate purchases are accidentally made, we will review the case. If found valid, we may issue a partial or full refund at our sole discretion.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Need Help?</h2>
          <p>
            If you have any concerns about your order, or require support accessing your digital product, feel free to reach out to us.
          </p>

          <p className="font-medium">Email us at: <a href="mailto:courseova45@gmail.com" className="text-blue-600 hover:underline">courseova45@gmail.com</a></p>

          <p>Our support team is available 24/7 and typically responds within a few hours.</p>

          <p className="mt-6 italic text-gray-600">We appreciate your business and are here to ensure you have the best experience possible.</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RefundPolicy;
