'use client';

import { useState } from 'react';
import Image from 'next/image';
import QuoteModal from './components/QuoteModal';

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white p-4 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image 
              src="/onetry.jpg" 
              alt="OneTry Logistics Logo" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <div className="text-2xl font-bold">OneTry Logistics</div>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-blue-200">Home</a>
            <a href="#about" className="hover:text-blue-200">About</a>
            <a href="#services" className="hover:text-blue-200">Services</a>
            <a href="#contact" className="hover:text-blue-200">Contact</a>
          </div>
        </div>
      </nav>

      {/* Homepage Section */}
      <section id="home" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Image 
              src="/onetry.jpg" 
              alt="OneTry Logistics Logo" 
              width={120} 
              height={120} 
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">OneTry Logistics</h1>
          <p className="text-2xl mb-8 text-blue-100">Tried Once. Trusted Forever.</p>
          <button 
            onClick={() => setIsQuoteModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300 transform hover:scale-105"
          >
            Request a Quote
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About Us</h2>
          
          {/* Mission Statement */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🚚</span>
              <h3 className="text-2xl font-semibold text-gray-800">Mission Statement</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              At OneTry Logistics, our mission is to deliver safe, damage-free, and on-time logistics solutions at competitive prices. 
              Backed by over 26 years of experience and a trusted network, we are committed to earning lasting trust by ensuring 
              every shipment reflects our reliability, responsibility, and promise of value.
            </p>
          </div>

          {/* Vision Statement */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🌍</span>
              <h3 className="text-2xl font-semibold text-gray-800">Vision Statement</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our vision is to build OneTry Logistics into a nationally and globally recognized brand, trusted for innovation, 
              professionalism, and customer-first service. We aspire to move beyond transactions to long-term partnerships, 
              adopt emerging technologies, and expand step by step into new markets. By staying adaptable, competitive, and 
              future-ready, we aim to set the benchmark in logistics and become the preferred partner for industries worldwide.
            </p>
          </div>

          {/* Why Choose OneTry Logistics */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose OneTry Logistics?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-blue-600 mb-2">Legacy of 26 Years</h4>
                <p className="text-gray-600">Decades of proven expertise in logistics operations.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-blue-600 mb-2">Trusted Network</h4>
                <p className="text-gray-600">Reliable, vetted transport partners across India.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-blue-600 mb-2">On-Time & Damage-Free Deliveries</h4>
                <p className="text-gray-600">Every consignment handled with care and commitment.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-blue-600 mb-2">Value for Money</h4>
                <p className="text-gray-600">Competitive pricing without compromising quality.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-blue-600 mb-2">Customer-First Philosophy</h4>
                <p className="text-gray-600">Building long-term relationships, not just completing orders.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-blue-600 mb-2">Future-Ready</h4>
                <p className="text-gray-600">Evolving with technology and market demands.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Tailored Vehicle Solutions</h3>
              <p className="text-gray-600">
                We carefully evaluate your shipment requirements - pick-up and drop locations, nature of goods, weight, 
                load type, and dimensions - to provide the best-suited vehicle for efficient and safe transport.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Damage-Free & On-Time Delivery</h3>
              <p className="text-gray-600">
                Every shipment is handled with precision by our trusted transporters, ensuring safe and punctual delivery every time.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">End-to-End Shipment Monitoring</h3>
              <p className="text-gray-600">
                We track your shipment from pickup to delivery, keeping you informed and ensuring accountability at every step.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Warehousing for Small Consignments</h3>
              <p className="text-gray-600">
                Our secure storage facilities allow you to manage small shipments flexibly, reducing logistics hassles and ensuring safety.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Professional Loading & Unloading</h3>
              <p className="text-gray-600">
                Our trained labor team ensures goods are loaded and unloaded efficiently, minimizing risk of damage and delays.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Dedicated Client Support</h3>
              <p className="text-gray-600">
                We are available around the clock to serve your logistics needs, answer queries, and provide guidance, ensuring complete reliability.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg md:col-span-2 lg:col-span-3">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Consultation & Planning</h3>
              <p className="text-gray-600">
                We advise on the most efficient logistics approach for your business, optimizing routes, vehicle choice, 
                and scheduling for cost-effective operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-600">Headquarters</h4>
                  <p className="text-gray-600">
                    #212/10, 3rd floor, Shankariah Gowda Building,<br />
                    Anchepalya, Nagasandra Post, Tumkur Road,<br />
                    Bangalore - 560073
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Branch Office</h4>
                  <p className="text-gray-600">Kanpur</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Phone Numbers</h4>
                  <p className="text-gray-600">
                    7348998743 (BLR)<br />
                    9795443012 (KNP)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Email</h4>
                  <p className="text-gray-600">onetrylogistics@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Quick Quote Request</h3>
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Request a Quote
              </button>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Click to open our detailed quote request form
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">OneTry Logistics</p>
          <p className="text-blue-200 mt-2">Tried Once. Trusted Forever.</p>
          <p className="text-sm text-blue-300 mt-4">
            © 2024 OneTry Logistics. All rights reserved.
          </p>
          
          {/* Admin Link */}
          <div className="mt-4">
            <a 
              href="/admin/quotes" 
              className="text-blue-300 hover:text-blue-100 text-sm underline"
            >
              Admin: View Quote Requests
            </a>
          </div>
        </div>
      </footer>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}
