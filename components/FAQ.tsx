
import React from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How far in advance should I book my event?",
      answer: "We recommend booking at least 1-3 weeks in advance to ensure availability for your preferred date and to allow time for custom color sourcing if needed. However, we do occasionally have last-minute openings, so feel free to reach out!"
    },
    {
      question: "Which areas do you cover for delivery and setup?",
      answer: "We proudly serve the Greater Toronto Area (GTA) and surrounding regions. Delivery and installation fees vary based on the location and complexity of the setup."
    },
    {
      question: "How long will my balloon installation last?",
      answer: "For indoor installations, our high-quality balloons can stay inflated and looking beautiful for several weeks. Outdoor installations are subject to weather conditions and typically last 1–3 days depending on direct sunlight and heat."
    },
    {
      question: "Do you do the takedown of the installation?",
      answer: "Yes, we offer takedown of almost all setups. In some specific cases, the clients can keep everything as is. But otherwise, we will come remove the items and leave your space exactly as we found it."
    },
    {
      question: "How long do the setups take?",
      answer: "Our setups generally take around 1-2 hours, but can vary on the size of the install."
    }
  ];

  return (
    <div className="py-24 bg-stone-50 min-h-screen animate-in fade-in duration-700">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20 mx-auto text-center">
          <h1 className="text-5xl font-serif mb-6 text-stone-900 tracking-tight">Common Inquiries</h1>
          <p className="text-stone-500 text-lg font-light leading-relaxed">
            Everything you need to know about planning your balloon installation with BalloonsByAks.
          </p>
          <div className="w-20 h-1 bg-[#fce7f3] mt-8 mx-auto"></div>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-3xl p-10 shadow-sm border border-stone-100 hover:shadow-xl hover:border-stone-200 transition-all duration-500"
            >
              <h3 className="text-xl font-serif text-stone-900 mb-6 flex items-start gap-4">
                <span className="text-[#fce7f3] brightness-75 font-serif text-2xl leading-none">0{index + 1}.</span>
                {faq.question}
              </h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed pl-12">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-white rounded-[3rem] p-16 text-center shadow-sm border border-stone-100 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-stone-900 mb-4">Still have questions?</h2>
          <p className="text-stone-500 font-light mb-10">We're here to help you bring your vision to life.</p>
          <a 
            href="https://instagram.com/balloonsbyaks" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-5 bg-stone-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl inline-block"
          >
            Direct Message on Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
