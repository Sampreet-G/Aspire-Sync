import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, Send, X, Bot, User, Sparkles, BookOpen, GraduationCap, Award, Lightbulb, Settings, AlertCircle, Minimize2 } from 'lucide-react';

// Gemini AI Service
class GeminiAIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    this.isConfigured = !!apiKey;
    
    console.log('GeminiAIService initialized with API key:', !!apiKey);
  }

  async generateResponse(userMessage, context = '') {
    if (!this.isConfigured) {
      throw new Error('API key not configured');
    }

    console.log('Making API request to:', this.baseURL);
    console.log('API Key (first 10 chars):', this.apiKey?.substring(0, 10) + '...');

    try {
      const systemPrompt = `You are Aspire Sync AI, an educational guidance chatbot for students in India. You specialize in:

CORE EXPERTISE:
- Career guidance and counseling
- Course recommendations (Engineering, Medical, Business, Arts, etc.)
- College admissions and selection process
- Scholarship information and application guidance
- Skill development roadmaps
- Entrance exam preparation (JEE, NEET, CAT, UPSC, etc.)
- Study abroad guidance
- Job market trends and placement statistics
- Resume building and interview preparation

PLATFORM FEATURES TO MENTION:
- Career Assessment Quiz (5-minute comprehensive test)
- College Finder tool (rank-based recommendations)
- Course Explorer with detailed career pathways
- Scholarship database with deadlines and eligibility
- Resource library with study materials and guides

COMMUNICATION STYLE:
- Friendly, encouraging, and supportive
- Use emojis appropriately (🎓📚💼🏆✨🚀)
- Provide actionable, specific advice
- Ask follow-up questions to understand needs better
- Reference Indian education system and colleges
- Mention relevant deadlines and important dates
- Include salary ranges when discussing careers

IMPORTANT GUIDELINES:
- Keep responses concise but informative (max 300 words)
- Always encourage using platform features when relevant
- Provide specific examples and college/course names
- Include both government and private college options
- Be aware of reservation policies and fee structures
- Mention current trends in technology and job market

RECENT UPDATES TO MENTION:
- NEP 2020 changes in education system
- New IITs and IIMs established
- Emerging fields like AI/ML, Data Science, Cybersecurity
- Green energy and sustainability careers
- Digital India initiatives impact on jobs

${context ? `CONVERSATION CONTEXT: ${context}` : ''}

Remember: You're helping students make life-changing educational decisions. Be thorough, accurate, and inspiring!`;

      const requestBody = {
        contents: [
          {
            parts: [
              { text: `${systemPrompt}\n\nStudent Question: ${userMessage}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          maxOutputTokens: 500,
        }
      };

      console.log('Request body prepared');

      const response = await fetch(`${this.baseURL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        let errorMessage = 'Unknown error';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error?.message || errorText;
        } catch {
          errorMessage = errorText;
        }
        
        throw new Error(`Gemini API Error (${response.status}): ${errorMessage}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        console.error('No text in response:', data);
        throw new Error('No response text generated');
      }

      return generatedText;
      
    } catch (error) {
      console.error('Gemini API Error Details:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error - please check your internet connection');
      }
      
      throw error;
    }
  }
}

// API Key Configuration Component
const APIKeyConfig = ({ onSave, currentKey, isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(currentKey || '');
  const [isLoading, setIsLoading] = useState(false);

  const validateAndSave = async () => {
    if (apiKey.length > 20) {
      setIsLoading(true);
      try {
        onSave(apiKey);
        onClose();
      } catch (error) {
        alert('Please check your API key and try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 10000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '20px', 
        padding: '32px', 
        maxWidth: '450px', 
        width: '100%', 
        margin: '16px', 
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        animation: 'slideIn 0.3s ease-out'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'linear-gradient(135deg, #667eea, #764ba2)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Settings size={24} style={{ color: 'white' }} />
          </div>
          <div>
            <h3 style={{ fontWeight: 'bold', fontSize: '20px', margin: 0, color: '#1a202c' }}>Configure Aspire Sync AI</h3>
            <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>Add your Gemini API key to enable intelligent responses</p>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#2d3748', 
            marginBottom: '8px' 
          }}>
            Google Gemini API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            style={{ 
              width: '100%', 
              padding: '12px 16px', 
              border: '2px solid #e2e8f0', 
              borderRadius: '12px', 
              fontSize: '14px', 
              outline: 'none', 
              boxSizing: 'border-box',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <div style={{ 
          backgroundColor: '#f7fafc', 
          padding: '16px', 
          borderRadius: '12px', 
          marginBottom: '24px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <AlertCircle size={20} style={{ color: '#667eea', marginTop: '2px', flexShrink: 0 }} />
            <div style={{ fontSize: '14px', color: '#2d3748' }}>
              <p style={{ fontWeight: '600', margin: '0 0 8px 0' }}>How to get your API key:</p>
              <ol style={{ margin: '4px 0', paddingLeft: '16px', lineHeight: '1.6' }}>
                <li>Visit <strong>Google AI Studio</strong></li>
                <li>Sign in with your Google account</li>
                <li>Click "Create API Key"</li>
                <li>Copy and paste it here</li>
              </ol>
              <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: '#38a169', fontWeight: '500' }}>
                ✅ Free tier: 60 requests per minute
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onClose}
            disabled={isLoading}
            style={{ 
              flex: 1, 
              padding: '12px 20px', 
              color: '#4a5568', 
              backgroundColor: '#f7fafc', 
              border: '2px solid #e2e8f0', 
              borderRadius: '12px', 
              cursor: isLoading ? 'not-allowed' : 'pointer', 
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            Cancel
          </button>
          <button
            onClick={validateAndSave}
            disabled={!apiKey.trim() || isLoading}
            style={{ 
              flex: 1, 
              padding: '12px 20px', 
              background: apiKey.trim() && !isLoading ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#a0aec0', 
              color: 'white', 
              border: 'none', 
              borderRadius: '12px', 
              cursor: (apiKey.trim() && !isLoading) ? 'pointer' : 'not-allowed', 
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? 'Saving...' : 'Save & Enable AI'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Chatbot Component
const AspireSyncChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [aiService, setAiService] = useState(null);
  const [conversationContext, setConversationContext] = useState('');
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [portalContainer, setPortalContainer] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Create portal container on mount
  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'chatbot-portal';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999999;
    `;
    document.body.appendChild(container);
    setPortalContainer(container);

    return () => {
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // Enhanced initial suggestions
  const initialSuggestions = [
    { text: "What career suits my interests in technology?", icon: BookOpen },
    { text: "Show me engineering colleges for my JEE rank", icon: GraduationCap },
    { text: "I need scholarship information for medical students", icon: Award },
    { text: "How do I prepare for NEET 2025?", icon: Lightbulb },
    { text: "What skills do software engineers need today?", icon: Sparkles },
    { text: "Tell me about emerging careers in AI/ML", icon: Bot },
  ];

  // Comprehensive fallback knowledge base
  const fallbackKnowledgeBase = {
    greeting: "👋 Hello! I'm your Aspire Sync AI assistant! To provide you with the most personalized and accurate guidance, I'd recommend configuring the AI integration. In the meantime, I can help with basic information about courses, careers, and colleges. What would you like to know?",
    
    courses: "🎓 I can help you explore various courses! Popular options include:\n\n• **Engineering**: Computer Science, Mechanical, Electrical, AI/ML\n• **Medical**: MBBS, BDS, Pharmacy, Nursing\n• **Business**: BBA, MBA, Finance, Marketing, Data Analytics\n• **Arts**: Psychology, Literature, Political Science, Design\n• **Emerging Fields**: Cybersecurity, Renewable Energy, Biotechnology\n\nFor personalized recommendations based on your interests and aptitude, try our Career Quiz! 🚀",
    
    scholarships: "🏆 Here are some scholarship opportunities:\n\n• **Merit Scholarships**: For high academic performers\n• **Need-based Aid**: For economically disadvantaged students\n• **Category Scholarships**: SC/ST/OBC reservations\n• **Girl Child Education**: Special grants for female students\n• **INSPIRE**: For science students\n• **National Scholarships**: Central and state government schemes\n\nUse our scholarship finder tool for detailed information and application deadlines! 📅",
    
    careers: "💼 Career guidance is one of our specialties! Popular career paths include:\n\n• **Technology**: Software Engineer, Data Scientist, AI Engineer, Cybersecurity Analyst\n• **Healthcare**: Doctor, Pharmacist, Medical Researcher, Biotechnologist\n• **Business**: Marketing Manager, Financial Analyst, Consultant, Product Manager\n• **Creative**: UX/UI Designer, Content Creator, Digital Marketer\n• **Green Jobs**: Environmental Engineer, Sustainability Consultant\n\nTake our 5-minute Career Assessment Quiz for personalized recommendations! ✨",
    
    colleges: "🏛️ We can help you find the perfect college! Top categories:\n\n• **Engineering**: IITs, NITs, BITS, State Universities, Private Colleges\n• **Medical**: AIIMS, JIPMER, Government Medical Colleges\n• **Business**: IIMs, ISB, Private B-Schools, Delhi School of Economics\n• **General**: Central Universities, State Universities, Deemed Universities\n\nUse our College Finder tool to get recommendations based on your rank and preferences! 🎯"
  };

  // Load saved API key
  useEffect(() => {
    const savedApiKey = localStorage.getItem('aspireSyncApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setAiService(new GeminiAIService(savedApiKey));
    }
  }, []);

  // Initialize AI service
  useEffect(() => {
    if (apiKey) {
      setAiService(new GeminiAIService(apiKey));
      localStorage.setItem('aspireSyncApiKey', apiKey);
    }
  }, [apiKey]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const welcomeMessage = "👋 Hi! I'm Sampreet, your Aspire Sync AI assistant! I'm here to provide personalized guidance on:\n\n🎓 Career counseling & course selection\n🏛️ College admissions & rankings\n🏆 Scholarship opportunities & deadlines\n📚 Skill development roadmaps\n📝 Entrance exam preparation\n🌍 Study abroad guidance\n\nWhat's your biggest educational concern right now? Let's solve it together! ✨";
        
        addBotMessage(welcomeMessage);
        setSuggestions(initialSuggestions.slice(0, 4));
      }, 500);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text, 
        sender: 'bot', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: true // Always true since we have API key hardcoded
      }]);
      setIsTyping(false);
      
      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, delay);
  };

  const addUserMessage = (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setSuggestions([]);
    
    setConversationContext(prev => prev + `\nUser: ${text}\n`);
    
    return userMessage;
  };

  const generateFallbackResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = "";
    let newSuggestions = [];

    if (input.includes('course') || input.includes('study') || input.includes('degree') || input.includes('stream')) {
      response = fallbackKnowledgeBase.courses;
      newSuggestions = [
        { text: "Tell me about engineering courses", icon: BookOpen },
        { text: "Medical course requirements and fees", icon: Award },
        { text: "What are the new-age courses?", icon: Sparkles },
      ];
    } else if (input.includes('scholarship') || input.includes('financial') || input.includes('funding')) {
      response = fallbackKnowledgeBase.scholarships;
      newSuggestions = [
        { text: "Merit scholarship eligibility criteria", icon: Award },
        { text: "How to apply for government scholarships", icon: BookOpen },
      ];
    } else if (input.includes('career') || input.includes('job') || input.includes('salary') || input.includes('placement')) {
      response = fallbackKnowledgeBase.careers;
      newSuggestions = [
        { text: "Software engineering career roadmap", icon: Lightbulb },
        { text: "Medical career opportunities and salary", icon: GraduationCap },
      ];
    } else if (input.includes('college') || input.includes('university') || input.includes('admission')) {
      response = fallbackKnowledgeBase.colleges;
      newSuggestions = [
        { text: "Top engineering colleges in India", icon: GraduationCap },
        { text: "Medical college admission process", icon: Award },
      ];
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      response = "Hello! 👋 Great to see you! I'm here to help with your educational journey. For the most personalized experience, consider enabling AI integration using the settings button. What can I help you with today? 🚀";
      newSuggestions = initialSuggestions.slice(0, 4);
    } else {
      response = "I'd love to help you better! For more personalized and detailed guidance, consider enabling AI integration by clicking the settings icon ⚙️\n\nIn the meantime, I can help with:\n\n📚 Course information & career paths\n🏆 Scholarship details & deadlines\n💼 Basic career guidance & salary info\n🏛️ College information & admissions\n📝 Exam preparation tips\n\nWhat specific area interests you most? 🤔";
      newSuggestions = initialSuggestions.slice(0, 3);
    }

    addBotMessage(response);
    if (newSuggestions.length > 0) {
      setTimeout(() => setSuggestions(newSuggestions), 1500);
    }
  };

  const generateAIResponse = async (userInput) => {
    try {
      setIsTyping(true);
      
      // Add more detailed error logging
      console.log('Attempting to generate AI response for:', userInput);
      console.log('AI service configured:', !!aiService);
      
      if (!aiService) {
        throw new Error('AI service not initialized');
      }
      
      const response = await aiService.generateResponse(userInput, conversationContext);
      
      console.log('AI response received:', response);
      
      setConversationContext(prev => prev + `AI: ${response}\n`);
      setIsTyping(false);

      addBotMessage(response, 100);

      // Generate contextual suggestions
      setTimeout(() => {
        const suggestions = [
          { text: "Tell me more about this topic", icon: Sparkles },
          { text: "What are the next steps?", icon: Lightbulb },
          { text: "Show me related opportunities", icon: Award },
        ];
        setSuggestions(suggestions);
      }, 2000);

    } catch (error) {
      console.error('Detailed AI Response Error:', error);
      console.error('Error message:', error.message);
      console.error('API Key exists:', !!apiKey);
      console.error('API Key length:', apiKey?.length);
      
      setIsTyping(false);
      
      // Provide more specific error messages
      let errorMessage = "⚠️ I'm having trouble connecting right now. ";
      
      if (error.message.includes('API key')) {
        errorMessage += "There seems to be an issue with the API configuration. ";
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        errorMessage += "I've reached my usage limit for now. Please try again later. ";
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage += "There's a network connectivity issue. ";
      } else {
        errorMessage += "There's a temporary technical issue. ";
      }
      
      errorMessage += "\n\nLet me help you with some basic information instead! What specific topic would you like to know about? 🤔";
      
      addBotMessage(errorMessage, 500);
      
      // Add some helpful suggestions for when AI fails
      setTimeout(() => {
        const fallbackSuggestions = [
          { text: "Tell me about engineering courses", icon: BookOpen },
          { text: "What are popular career options?", icon: GraduationCap },
          { text: "How do I choose the right college?", icon: Award },
        ];
        setSuggestions(fallbackSuggestions);
      }, 1000);
    }
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const userInput = inputValue;
    setInputValue('');

    // Always use AI since we have the API key hardcoded
    generateAIResponse(userInput);
  };

  const handleSuggestionClick = (suggestion) => {
    addUserMessage(suggestion.text);
    setSuggestions([]);
    
    // Always use AI since we have the API key hardcoded
    generateAIResponse(suggestion.text);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setHasNewMessage(false);
    if (!isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  // Render chatbot content
  const chatbotContent = (
    <>
      <style>{`
        @keyframes bounce {
          0%, 20%, 60%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          80% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .notification-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          background: #ef4444;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
          animation: pulse 1.5s infinite;
        }

        #chatbot-portal * {
          pointer-events: auto;
        }
      `}</style>

      {/* Fixed positioned chatbot container */}
      <div style={{ 
        position: 'fixed', 
        bottom: '24px', 
        right: '24px', 
        zIndex: 999999,
        pointerEvents: 'auto'
      }}>
        
        {/* Chat Window */}
        {isOpen && (
          <div style={{ 
            position: 'absolute', 
            bottom: '80px', 
            right: '0px', 
            width: '400px', 
            height: isMinimized ? '60px' : '600px', 
            backgroundColor: 'white', 
            borderRadius: '20px', 
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)', 
            border: '1px solid #e5e7eb', 
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden',
            transition: 'height 0.3s ease',
            animation: 'slideIn 0.3s ease-out'
          }}>
            {/* Header */}
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea, #764ba2)', 
              padding: '16px', 
              color: 'white',
              borderRadius: isMinimized ? '20px' : '20px 20px 0 0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '44px', 
                    height: '44px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    animation: aiService?.isConfigured ? 'none' : 'bounce 2s infinite'
                  }}>
                    <Bot size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '700', fontSize: '16px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Aspire Sync AI
                      <div style={{ 
                        width: '10px', 
                        height: '10px', 
                        backgroundColor: '#10b981', 
                        borderRadius: '50%',
                        boxShadow: '0 0 6px #10b981'
                      }} />
                    </h3>
                    <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                      ✨ Built by Sampreet Ghosh - Ready to help!
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!isMinimized ? (
                    <>
                      <button 
                        onClick={minimizeChat}
                        style={{ 
                          padding: '6px', 
                          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                          border: 'none', 
                          borderRadius: '8px', 
                          cursor: 'pointer', 
                          color: 'white'
                        }}
                      >
                        <Minimize2 size={16} />
                      </button>
                      <button 
                        onClick={toggleChat}
                        style={{ 
                          padding: '6px', 
                          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                          border: 'none', 
                          borderRadius: '8px', 
                          cursor: 'pointer', 
                          color: 'white'
                        }}
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={maximizeChat}
                      style={{ 
                        padding: '6px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer', 
                        color: 'white'
                      }}
                    >
                      ⬆️
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Messages Area - Only show when not minimized */}
            {!isMinimized && (
              <>
                <div style={{ 
                  flex: 1, 
                  overflowY: 'auto', 
                  padding: '20px', 
                  backgroundColor: '#f8fafc',
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(102, 126, 234, 0.05) 1px, transparent 0)',
                  backgroundSize: '20px 20px'
                }}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      style={{ 
                        display: 'flex', 
                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: '20px',
                        animation: 'slideIn 0.3s ease-out'
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '10px', 
                        maxWidth: '85%',
                        flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                      }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: message.sender === 'user' 
                            ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                            : message.isAI 
                              ? 'linear-gradient(135deg, #10b981, #059669)'
                              : 'linear-gradient(135deg, #f59e0b, #d97706)',
                          color: 'white',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}>
                          {message.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                        </div>
                        <div style={{
                          padding: '14px 18px',
                          borderRadius: '18px',
                          backgroundColor: message.sender === 'user' ? '#667eea' : 'white',
                          color: message.sender === 'user' ? 'white' : '#1f2937',
                          borderTopRightRadius: message.sender === 'user' ? '6px' : '18px',
                          borderTopLeftRadius: message.sender === 'user' ? '18px' : '6px',
                          boxShadow: message.sender === 'user' 
                            ? '0 4px 12px rgba(102, 126, 234, 0.3)' 
                            : '0 4px 12px rgba(0, 0, 0, 0.08)',
                          border: message.sender === 'user' ? 'none' : '1px solid #f1f5f9'
                        }}>
                          <p style={{ 
                            fontSize: '14px', 
                            margin: 0, 
                            whiteSpace: 'pre-line',
                            lineHeight: '1.5'
                          }}>
                            {message.text}
                          </p>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            marginTop: '6px' 
                          }}>
                            <p style={{
                              fontSize: '11px',
                              margin: 0,
                              color: message.sender === 'user' ? 'rgba(255, 255, 255, 0.8)' : '#94a3b8'
                            }}>
                              {message.timestamp}
                            </p>
                            {message.sender === 'bot' && message.isAI && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Sparkles size={12} style={{ color: '#10b981' }} />
                                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>AI</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Enhanced Typing Indicator */}
                  {isTyping && (
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'flex-start', 
                      marginBottom: '20px',
                      animation: 'slideIn 0.3s ease-out'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: aiService?.isConfigured 
                            ? 'linear-gradient(135deg, #10b981, #059669)' 
                            : 'linear-gradient(135deg, #f59e0b, #d97706)',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}>
                          <Bot size={18} />
                        </div>
                        <div style={{
                          backgroundColor: 'white',
                          padding: '14px 18px',
                          borderRadius: '18px',
                          borderTopLeftRadius: '6px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          border: '1px solid #f1f5f9'
                        }}>
                          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <div style={{ 
                              width: '8px', 
                              height: '8px', 
                              backgroundColor: '#94a3b8', 
                              borderRadius: '50%', 
                              animation: 'bounce 1.4s infinite' 
                            }} />
                            <div style={{ 
                              width: '8px', 
                              height: '8px', 
                              backgroundColor: '#94a3b8', 
                              borderRadius: '50%', 
                              animation: 'bounce 1.4s infinite 0.1s' 
                            }} />
                            <div style={{ 
                              width: '8px', 
                              height: '8px', 
                              backgroundColor: '#94a3b8', 
                              borderRadius: '50%', 
                              animation: 'bounce 1.4s infinite 0.2s' 
                            }} />
                            <span style={{ marginLeft: '8px', fontSize: '12px', color: '#64748b' }}>
                              AI is thinking...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Suggestions */}
                  {suggestions.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#64748b', 
                        fontWeight: '600', 
                        marginBottom: '12px',
                        textAlign: 'center'
                      }}>
                        💡 Quick questions for you:
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {suggestions.map((suggestion, index) => {
                          const IconComponent = suggestion.icon;
                          return (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                width: '100%',
                                textAlign: 'left',
                                padding: '12px 16px',
                                fontSize: '14px',
                                backgroundColor: 'white',
                                border: '2px solid #f1f5f9',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.borderColor = '#f1f5f9';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                              }}
                            >
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <IconComponent size={16} style={{ color: 'white' }} />
                              </div>
                              <span style={{ color: '#374151', fontWeight: '500' }}>
                                {suggestion.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Input Area */}
                <div style={{ 
                  padding: '20px', 
                  borderTop: '1px solid #f1f5f9', 
                  backgroundColor: 'white',
                  borderRadius: '0 0 20px 20px'
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmit();
                        }
                      }}
                      placeholder="Ask me anything about your educational journey..."
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: '2px solid #f1f5f9',
                        borderRadius: '20px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                        backgroundColor: '#f8fafc'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#f1f5f9'}
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={!inputValue.trim() || isTyping}
                      style={{
                        width: '44px',
                        height: '44px',
                        background: inputValue.trim() && !isTyping 
                          ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                          : '#cbd5e1',
                        color: 'white',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        boxShadow: inputValue.trim() && !isTyping 
                          ? '0 4px 12px rgba(102, 126, 234, 0.3)' 
                          : 'none'
                      }}
                      onMouseOver={(e) => {
                        if (inputValue.trim() && !isTyping) {
                          e.target.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                  <p style={{ 
                    fontSize: '11px', 
                    color: '#94a3b8', 
                    textAlign: 'center', 
                    margin: '8px 0 0 0' 
                  }}>
                    ✨ Say Hello To Sampreet!
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Enhanced Toggle Button */}
        <button
          onClick={toggleChat}
          style={{
            width: '70px',
            height: '70px',
            background: hasNewMessage 
              ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
              : 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            borderRadius: '50%',
            border: 'none',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            animation: hasNewMessage ? 'pulse 1.5s infinite' : 'none'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.1) translateY(-2px)';
            e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1) translateY(0)';
            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
          }}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
          
          {hasNewMessage && !isOpen && (
            <div className="notification-badge">
              1
            </div>
          )}
          
          {!isOpen && (
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '16px',
              height: '16px',
              background: '#10b981',
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 0 6px #10b981'
            }} />
          )}
        </button>
      </div>
    </>
  );

  // Use portal to render outside of React app container
  if (!portalContainer) return null;
  
  return createPortal(chatbotContent, portalContainer);
};

export default AspireSyncChatbot;