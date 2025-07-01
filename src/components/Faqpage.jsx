import { useState } from "react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Delivery typically takes 5–7 business days depending on your location.",
  },
  {
    question: "Can I add my own text to the product?",
    answer: "Yes, most of our products support custom text input during checkout.",
  },
  {
    question: "Do you ship to my city?",
    answer: "We ship across all major cities and towns in India. You can check availability during checkout.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for damaged or incorrect items. Custom orders are non-returnable.",
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer: "Yes, COD is available for select pincodes and order values under ₹2,000.",
  },
  {
    question: "Are your products customizable?",
    answer: "Absolutely! You can customize names, quotes, and sometimes even images on select products.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you will receive a tracking link via WhatsApp and email.",
  },
  {
    question: "Do you offer bulk order discounts?",
    answer: "Yes, for orders above 10 pieces, we provide special discounts. Contact us for details.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, Credit/Debit cards, Net Banking, Wallets, and COD where applicable.",
  },
  {
    question: "Will I get a preview before printing?",
    answer: "Yes, for highly customized products, we provide a preview confirmation before final printing.",
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be canceled within 2 hours of placing them, unless they’ve already been processed.",
  },
  {
    question: "Do you have a physical store?",
    answer: "We operate entirely online to keep prices affordable. However, we provide full customer support.",
  },
  {
    question: "What if I receive a damaged product?",
    answer: "Please contact us within 24 hours with photos. We will replace it free of charge.",
  },
  {
    question: "Can I customize both name and quote?",
    answer: "Yes! Products like mugs, frames, and t-shirts allow both name and quote customization.",
  },
  {
    question: "Is it safe to upload personal images?",
    answer: "Yes, all data is encrypted. Uploaded content is only used for your order and deleted after dispatch.",
  },
];

const FAQ = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const showMore = () => {
    setVisibleCount(faqs.length);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        ❓ Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.slice(0, visibleCount).map((faq, index) => (
          <div key={index} className="border text-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
              <span className="font-semibold">{faq.question}</span>
            </button>
            {activeIndex === index && (
              <div className="px-4 py-3 bg-white border-t text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}

        {visibleCount < faqs.length && (
          <div className="text-center mt-6">
            <button
              onClick={showMore}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Read More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
