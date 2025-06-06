import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import PDFSlider from '../components/PDFSlider';

const premiumContent = [
  {
    title: 'Introduction',
    topics: [
      {
        title: 'Welcome to the Course',
        video: 'https://drive.google.com/file/d/10YbezO2TFJqkvSZ1XJ1uRcA8LZlO7_Cm/preview',
      },
      {
        title: 'Website Working',
        video: 'https://drive.google.com/file/d/10nq5ZDIHGqlS8uj9SG6EGJTV1BT-4g2_/preview',
      },
      {
        title: 'Technologies',
        video: 'https://drive.google.com/file/d/10rlbSe5MPKBRB8RrdcIvo5cB4JjjXxFv/preview',
      },
    ],
  },
  {
    title: 'HTML',
    topics: [
      {
        title: 'HTML Preview',
        video: 'https://drive.google.com/file/d/11HpCpM2uGoWSPx6jBRfBATgYFl0Eefk4/preview',
      },
      {
        title: 'Installation',
        video: 'https://drive.google.com/file/d/11J9d2LJqrcsbfCBTPP0M16t3DkdA8SBO/preview',
      },
      {
        title: 'HTML Basics',
        video: 'https://drive.google.com/file/d/11Q1aXa6DoTqkj5fAsK9XHXbIx_gmxR1P/preview',
      },
      {
        title: 'Tags and Attribute',
        video: 'https://drive.google.com/file/d/11vhQKW_E3ZCLLeZmBVrFaQ2zJ52t7bvM/preview',
      },
      {
        title: 'Image Tag & List',
        video: 'https://drive.google.com/file/d/11x18mJTKp3U30eUXMD8JG74f5Uf-9Wdw/preview',
      },
      {
        title: 'Table and Video Tags',
        video: 'https://drive.google.com/file/d/1219RX4EkIWoA42zOOE0tt7p5Uua6BEbk/preview',
      },
      {
        title: 'Form',
        video: 'https://drive.google.com/file/d/124XW4y-EcaojahmzOS6WZ_7vN62ciF6-/preview',
        assignment: ['Q1. Build a basic webpage'],
        project: ['HTML Portfolio Page'],
      },
    ],
  },
  {
    title: 'CSS',
    topics: [
      {
        title: 'Introduction & CSS Basics',
        video: 'https://drive.google.com/file/d/1gc7zgs80BatqD1WALkxRQdNoEnUyDGsz/preview',
      },
      {
        title: 'CSS Color Property',
        video: 'https://drive.google.com/file/d/18dI9X_kgi0yT9nfaFPDfl5fN882hFk1c/preview',
      },
      {
        title: 'CSS Border',
        video: 'https://drive.google.com/file/d/1MwxqMaFhGtKS9jAEEEsVx6ft53eow0bk/preview',
      },
      {
        title: 'Position Properties',
        video: '/videos/CSSL4.mp4',
      },
      {
        title: 'Text Properties',
        video: '/videos/CSSL5.mp4',
      },
      {
        title: 'CSS Gradients',
        video: 'https://drive.google.com/file/d/12A0EJOAgV2MHVryLlo9W8dM79EW24365/preview',
        assignment: ['Q1. Build a basic webpage'],
        project: ['CSS Portfolio Page'],
      },
      {
        title: 'Advanced CSS',
        video: 'https://drive.google.com/file/d/10MqcTMCOZjvxWP6O_lTzkanz_4jK-3VI/preview',
      },
    ],
  },
];

const PremiumAccess = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [activeTopic, setActiveTopic] = useState<{ [key: number]: number | null }>({});

  const toggleModule = (index: number) => {
    setActiveModule(prev => (prev === index ? null : index));
  };

  const toggleTopic = (moduleIndex: number, topicIndex: number) => {
    setActiveTopic(prev => ({
      ...prev,
      [moduleIndex]: prev[moduleIndex] === topicIndex ? null : topicIndex,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">
          🚀 Premium Course Content
        </h1>

        {premiumContent.map((module, moduleIndex) => (
          <div key={moduleIndex} className="mb-6">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
              <button
                onClick={() => toggleModule(moduleIndex)}
                className="w-full px-6 py-4 flex justify-between items-center text-lg font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100"
              >
                <span>{module.title}</span>
                <FaChevronDown
                  className={`transform transition-transform duration-300 ${
                    activeModule === moduleIndex ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeModule === moduleIndex && (
                <div className="divide-y">
                  {module.topics.map((topic, topicIndex) => (
                    <div key={topicIndex}>
                      <button
                        onClick={() => toggleTopic(moduleIndex, topicIndex)}
                        className="w-full px-6 py-3 flex justify-between items-center text-md text-blue-700 bg-blue-50 hover:bg-blue-100"
                      >
                        <span>{topic.title}</span>
                        <FaChevronDown
                          className={`transform transition-transform duration-300 ${
                            activeTopic[moduleIndex] === topicIndex ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {activeTopic[moduleIndex] === topicIndex && (
                        <div className="px-6 pb-6 pt-2 bg-white space-y-6">
                          {topic.video.includes('drive.google.com') ? (
                            <div className="w-full aspect-[16/9] md:h-[400px] rounded-lg overflow-hidden border">
                              <iframe
                                src={topic.video.replace('/view?usp=sharing', '/preview')}
                                title={topic.title}
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              />
                            </div>
                          ) : (
                            <div className="w-full aspect-[16/9] md:h-[400px] rounded-lg overflow-hidden border">
                              <video controls className="w-full h-full">
                                <source src={topic.video} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}

                          {topic.assignment && (
                            <div>
                              <h4 className="font-semibold text-green-700">📄 Assignment</h4>
                              <ul className="list-disc pl-6 text-gray-800">
                                {topic.assignment.map((a, i) => (
                                  <li key={i}>{a}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {topic.project && (
                            <div>
                              <h4 className="font-semibold text-yellow-700">🛠 Project</h4>
                              <ul className="list-disc pl-6 text-gray-800">
                                {topic.project.map((p, i) => (
                                  <li key={i}>{p}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* PDF Notes Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-4">
            Related Notes (Handwritten Notes)
          </h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8 px-4">
            Dive deeper into the concepts with our comprehensive handwritten notes.
            These notes are carefully curated to complement your learning journey and help you revise key topics effectively.
          </p>
          <PDFSlider file="/DSA-Handwritten-Notes.pdf" />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-800 text-white py-6 mt-12 -mb-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Courseova. All rights reserved.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="/privacy-policy" className="hover:underline text-sm">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:underline text-sm">Terms of Service</a>
            <a href="/contact" className="hover:underline text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumAccess;
