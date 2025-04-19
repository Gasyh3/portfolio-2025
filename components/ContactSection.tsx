'use client';

import React, { useState, useRef, useEffect } from 'react';

// Composant pour les champs de formulaire
interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  textarea?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  textarea = false 
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors text-sm"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors text-sm"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    
    // Simuler un envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simuler une réponse de succès
    setIsSubmitting(false);
    setSubmitResult({ 
      success: true, 
      message: 'Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.' 
    });
    
    // Réinitialiser le formulaire
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <section className="relative py-20 overflow-hidden" id="contact">
      {/* Arrière-plan avec transition depuis EarthSection */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          background: 'linear-gradient(to bottom, #1f2937 0%, #111827 100%)' 
        }}
      />
      
      {/* Éléments décoratifs pour l'ambiance contact */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute h-[200px] w-[200px] rounded-full bg-gray-600/20 blur-lg top-[15%] left-[10%]"></div>
        <div className="absolute h-[150px] w-[150px] rounded-full bg-gray-600/15 blur-lg bottom-[25%] right-[8%]"></div>
        <div className="absolute h-[100px] w-[100px] rounded-full bg-gray-600/10 blur-lg top-[40%] right-[15%]"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10 px-4 py-10">
        <h2 className="text-4xl font-bold text-white text-center mb-10">Contactez-Moi</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Informations de contact */}
            <div className="md:w-1/3 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4 md:p-5">
              <h3 className="text-xl font-bold mb-3">Contact direct</h3>
              <p className="mb-4 text-gray-200 text-sm">
                Pour une réponse rapide, contactez-moi directement.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-300">E-mail</h4>
                    <a href="mailto:contact@kevin-rakotoniaina.com" className="text-white hover:text-gray-300 transition-colors text-sm">
                      contact@kevin-rakotoniaina.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-300">Localisation</h4>
                    <p className="text-white text-sm">Paris, France</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-300">Réseaux sociaux</h4>
                    <div className="flex space-x-3 mt-1">
                      <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-0.547-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                      </a>
                      <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.006 10.006 0 01-3.127 1.195A4.936 4.936 0 0016.343 2c-3.053 0-5.273 2.855-4.588 5.823-3.908-.19-7.38-2.07-9.695-4.92a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.28 1.581 4.415 3.95 4.89a4.936 4.936 0 01-2.224.084 4.928 4.928 0 004.6 3.42A9.9 9.9 0 010 19.54a14.01 14.01 0 007.548 2.213c9.142 0 14.307-7.721 13.995-14.647A10.025 10.025 0 0024 4.56z" />
                        </svg>
                      </a>
                      <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formulaire de contact */}
            <div className="md:w-2/3 p-4 md:p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Envoyez-moi un message</h3>
              
              {submitResult && (
                <div className={`mb-3 p-2 rounded-lg text-xs ${submitResult.success ? 'bg-gray-800 text-gray-200' : 'bg-red-900 text-red-200'}`}>
                  {submitResult.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    label="Nom"
                    type="text"
                    name="name"
                    placeholder="Votre nom"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                  
                  <FormField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Votre email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <FormField
                  label="Sujet"
                  type="text"
                  name="subject"
                  placeholder="Le sujet de votre message"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                />
                
                <FormField
                  label="Message"
                  type="text"
                  name="message"
                  placeholder="Votre message..."
                  value={formState.message}
                  onChange={handleChange}
                  required
                  textarea
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors text-sm mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 