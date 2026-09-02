import React, { useState } from 'react';
import PropertySubmissionModal from './PropertySubmissionModal'; // Adjust path if needed

const ActionStrip = () => {
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionClick = (e, intent) => {
    e.preventDefault(); // Stop any default link or form behavior
    e.stopPropagation(); // Stop event bubbling
    setSelectedIntent(intent);
    setIsModalOpen(true);
  };

  const actions = ['Buy', 'Sell', 'Rent', 'Resale'];

  return (
    <>
      <div className="bg-[#B8975A] text-black py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl">
              Looking to Buy, Sell, Rent, or Resale in Nanded City?
            </h3>
            <p className="text-xs sm:text-sm font-medium opacity-90">
              Click an option below to send your property inquiry instantly to our experts.
            </p>
          </div>
          
          {/* Action Strip Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {actions.map((action) => (
              <button
                key={action}
                type="button" // Explicitly tell it NOT to act as a form submit button
                onClick={(e) => handleActionClick(e, action)}
                className="bg-black text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal Renderer */}
      {isModalOpen && (
        <PropertySubmissionModal 
          intentType={selectedIntent} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default ActionStrip;