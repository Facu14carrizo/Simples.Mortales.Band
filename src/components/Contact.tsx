import React, { useRef, useEffect, useState } from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formState);
    alert('Thank you for reaching out! We\'ll get back to you soon.');
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 bg-black relative"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-white text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          GET IN <span className="text-red-600">TOUCH</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="text-red-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-white font-medium">Email</h4>
                  <p className="text-gray-400">info@simplesmortales.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="text-red-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-white font-medium">Phone</h4>
                  <p className="text-gray-400">+52 555 123 4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="text-red-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-white font-medium">Location</h4>
                  <p className="text-gray-400">Mexico City, Mexico</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Follow Us</h3>
            
            <div className="flex space-x-4">
              <a href="#" className="bg-zinc-800 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-zinc-800 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-zinc-800 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-gray-300 mb-1 block">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-gray-300 mb-1 block">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="text-gray-300 mb-1 block">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="text-gray-300 mb-1 block">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-sm transition-colors duration-300 w-full md:w-auto"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;