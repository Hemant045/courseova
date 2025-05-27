// pages/terms-and-conditions.tsx

import React from 'react';
import Head from 'next/head';
import Footer from '../components/footer';
const TermsAndConditions: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Courseova</title>
        <meta name="description" content="Read the terms and conditions for using YourCompanyName's website." />
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <section className="mb-6">
          <p>
            Welcome to Courseova! These terms and conditions outline the rules and regulations for the use of our website, located at <a href="https://courseapp-ca4ee.web.app/" className="text-blue-600 hover:underline">https://courseapp-ca4ee.web.app/.</a>
          </p>
          <p className="mt-4">
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use Courseova if you do not agree to all of the terms and conditions stated on this page.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
          <p>
            We employ the use of cookies. By accessing Courseova, you agreed to use cookies in agreement with our Privacy Policy.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">License</h2>
          <p>
            Unless otherwise stated, Courseova and/or its licensors own the intellectual property rights for all material on Courseova. All intellectual property rights are reserved. You may access this from Courseova for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p className="mt-4">You must not:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Republish material from Courseova</li>
            <li>Sell, rent or sub-license material from Courseova</li>
            <li>Reproduce, duplicate or copy material from Courseova</li>
            <li>Redistribute content from Courseova</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">User Comments</h2>
          <p>
            Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas. Courseova does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Courseova, its agents and/or affiliates.
          </p>
          <p className="mt-4">
            Courseova reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Hyperlinking to our Content</h2>
          <p>
            The following organizations may link to our Website without prior written approval:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Government agencies</li>
            <li>Search engines</li>
            <li>News organizations</li>
            <li>Online directory distributors</li>
            <li>System wide Accredited Businesses</li>
          </ul>
          <p className="mt-4">
            These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">iFrames</h2>
          <p>
            Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Content Liability</h2>
          <p>
            We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are rising on your Website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Reservation of Rights</h2>
          <p>
            We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Removal of links from our website</h2>
          <p>
            If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Disclaimer</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
