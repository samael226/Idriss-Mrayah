// src/pages/Contact.jsx
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', type: '' });
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: 'Sending...', type: 'info' });
    
    try {
      const result = await emailjs.sendForm(
        'service_zwjz7uo', // Replace with your EmailJS service ID
        'template_mzn8l2h', // Replace with your EmailJS template ID
        form.current,
        'qsxknAzNivqDQqvbw' // Replace with your EmailJS public key
      );
      
      if (result.status === 200) {
        setStatus({ 
          message: 'Message sent successfully! I\'ll get back to you soon.', 
          type: 'success' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ 
        message: `Failed to send message: ${error.message || 'Please try again later.'}`, 
        type: 'error' 
      });
    }
    
    // Clear status after 5 seconds
    setTimeout(() => setStatus({ message: '', type: '' }), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <div className="w-24 h-1 bg-[#e04b43] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-[#e04b43]">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-[#e04b43] mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-400">samael01lu@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-[#e04b43] mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-400">+21628341756</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-[#e04b43] mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-gray-400">Tunis, Tunisia</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6 text-[#e04b43]">Connect With Me</h2>
                <div className="flex space-x-6">
                  {[
                    { name: 'GitHub', icon: 'github', url: 'https://github.com/samael226' },
                    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/yourusername' },
                    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/samael_id007' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#e04b43] transition-colors duration-300"
                      aria-label={social.name}
                    >
                      <span className="sr-only">{social.name}</span>
                      <i className={`fab fa-${social.icon} text-2xl`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-[#111113] p-8 rounded-lg shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#e04b43]">Send Me a Message</h2>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0b0b0c] border border-gray-700 rounded-md focus:ring-2 focus:ring-[#e04b43] focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0b0b0c] border border-gray-700 rounded-md focus:ring-2 focus:ring-[#e04b43] focus:border-transparent text-white placeholder-gray-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0b0b0c] border border-gray-700 rounded-md focus:ring-2 focus:ring-[#e04b43] focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={status.message === 'Sending...'}
                  className="w-full bg-[#e04b43] hover:bg-[#c53d36] text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center"
                >
                  {status.message === 'Sending...' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
                {status.message && status.message !== 'Sending...' && (
                  <div className={`mt-4 p-3 rounded-md ${status.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {status.message}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;