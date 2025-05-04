// src/components/Dashboard.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react'; // Added useRef, useCallback
import { useNavigate, Link } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth'; // Import updateProfile
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Import useTheme
import { Button } from './Button';
import { PageWrapper } from './PageWrapper';
import { cn } from '../utils/cn'; // Assuming cn utility
import {
  LayoutDashboard, LogOut, UserCircle, Briefcase, MessageSquare,
  Calendar, Zap, ExternalLink, Sun, Moon, Edit3, Save, AlertCircle,
  FolderKanban, // Icon for Projects
  KeyRound,     // Icon for SEO Keywords
  Megaphone,    // Icon for Marketing Campaigns
  ListChecks,   // Alt icon
  TrendingUp,   // Alt icon
  Target,       // Alt icon
  PlusCircle,   // Icon for adding
  Settings,     // Icon for managing
  Bot,          // Icon for AI Chatbot
  Send,         // Icon for send button
  Sparkles,     // Icon for AI features
  Loader2       // Icon for loading state
} from 'lucide-react';
// --- Gemini AI Imports ---
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// --- Gemini API Key ---
// IMPORTANT: Store your API Key securely using environment variables (.env file).
// Do NOT commit your API key directly into the code.
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

// Define the structure for chat messages
interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export function Dashboard() {
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Use theme context
  const navigate = useNavigate();

  // State for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  // --- AI Chatbot State ---
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for scrolling
  const genAI = useRef<GoogleGenerativeAI | null>(null); // Ref for Gemini instance

  // --- Initialization and Profile Update Effect ---
  useEffect(() => {
    // Initialize Gemini Client only once or if key changes (though key shouldn't change)
    if (!genAI.current && GEMINI_API_KEY) {
        try {
            genAI.current = new GoogleGenerativeAI(GEMINI_API_KEY);
            // Set initial chat message only after successful initialization
            setChatHistory([
                { role: 'model', text: "Hello! How can I assist you today?" }
            ]);
        } catch (error) {
             console.error("Failed to initialize GoogleGenerativeAI:", error);
             setChatError("Chatbot failed to initialize.");
             genAI.current = null; // Ensure it's null if init fails
        }
    } else if (!GEMINI_API_KEY) {
        console.warn("Gemini API Key not found. Chatbot functionality will be disabled.");
        setChatError("Chatbot is unavailable: API Key missing.");
    }

    // Update local profile state if currentUser changes
    setDisplayName(currentUser?.displayName || '');

    // Clear profile messages if profile edit form is closed
    if (!isEditingProfile) {
      setProfileError(null);
      setProfileSuccess(null);
    }

  // We separate profile display name updates from Gemini init
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.displayName]); // Rerun if display name potentially changes

   // --- Auto-scroll chat ---
   useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]); // Scroll whenever chatHistory updates

  // --- Handlers ---
  const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate('/login');
      } catch (error) {
        console.error('Failed to log out:', error);
        // TODO: Show an error message to the user
      }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      setProfileError("Not logged in.");
      return;
    }
    if (displayName === currentUser.displayName) {
        setIsEditingProfile(false); // Just close if no change
        return;
    }

    setProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      await updateProfile(currentUser, { displayName: displayName });
      setProfileSuccess("Profile updated successfully!");
      setIsEditingProfile(false); // Close edit form on success
      // currentUser object might not update immediately in the context,
      // but the local state 'displayName' is already set.
       setTimeout(() => setProfileSuccess(null), 4000); // Clear success message after delay
    } catch (error: any) {
      console.error("Profile Update Error:", error);
      setProfileError(error.message || "Failed to update profile.");
      setTimeout(() => setProfileError(null), 4000); // Clear error message after delay
    } finally {
      setProfileLoading(false);
    }
  };

  // --- Chatbot Send Message Handler ---
  const handleSendMessage = useCallback(async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault(); // Prevent form submission if used in a form
    if (!userInput.trim() || isChatLoading || !genAI.current) {
      if (!genAI.current && !GEMINI_API_KEY) {
          setChatError("Chatbot is unavailable: API Key missing.");
      } else if (!genAI.current && GEMINI_API_KEY) {
          setChatError("Chatbot initialization failed.");
      }
      return;
    }

    const messageToSend = userInput.trim();
    const newUserMessage: ChatMessage = { role: 'user', text: messageToSend };

    // Add user message immediately for responsiveness
    setChatHistory(prev => [...prev, newUserMessage]);
    setUserInput(''); // Clear input field
    setIsChatLoading(true);
    setChatError(null); // Clear previous errors

    try {
        const model = genAI.current.getGenerativeModel({ model: "gemini-pro" });

        // Basic safety settings (adjust as needed)
        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ];

        // Construct chat history for Gemini API
        const historyForAPI = chatHistory.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        })).filter(msg => msg.parts[0].text.trim() !== ''); // Filter empty history

        // Remove the last (newest) user message because we send it as the current prompt
        if (historyForAPI.length > 0 && historyForAPI[historyForAPI.length - 1].role === 'user') {
            historyForAPI.pop();
        }

        const chat = model.startChat({
            history: historyForAPI,
            safetySettings,
            generationConfig: {
                maxOutputTokens: 300, // Limit response length
            },
        });

        const result = await chat.sendMessage(messageToSend);
        const response = result.response;
        const text = response.text();

        const newModelMessage: ChatMessage = { role: 'model', text: text };
        setChatHistory(prev => [...prev, newModelMessage]);

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        let errorMessage = "Sorry, I couldn't get a response. Please try again.";
        // Check for specific Gemini API errors if possible (structure might vary)
        if (error.message?.includes('API key not valid')) {
            errorMessage = "Chatbot error: Invalid API Key.";
        } else if (error.message?.includes('block') || error.response?.promptFeedback?.blockReason) {
             errorMessage = `Request blocked due to safety settings. Please rephrase your message.`;
        } else if (error.message?.includes('quota')) {
            errorMessage = "API quota exceeded. Please try again later.";
        }
        setChatError(errorMessage);
        // Optional: Remove the user's message if the AI failed completely to avoid confusion
        setChatHistory(prev => prev.slice(0, -1));
    } finally {
        setIsChatLoading(false);
    }
  }, [userInput, isChatLoading, chatHistory]); // Dependencies for useCallback


  // Allow sending with Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Send on Enter, allow Shift+Enter for newline
        e.preventDefault(); // Prevent default newline in input
        handleSendMessage();
    }
  };


  const memberSince = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
    : 'N/A';

  // Placeholder data for new sections
  const placeholderProjects = [
      { id: 1, name: 'Project Alpha', status: 'In Progress', lastUpdate: '2 days ago' },
      { id: 2, name: 'Client Beta Site', status: 'Pending Review', lastUpdate: '5 days ago' },
      { id: 3, name: 'Internal Tool', status: 'Completed', lastUpdate: '1 month ago' },
  ];

  const placeholderKeywords = [
      { id: 1, term: 'web development agency', position: 5, trend: 'up' },
      { id: 2, term: 'local SEO services', position: 12, trend: 'stable' },
      { id: 3, term: 'react developer freelance', position: 8, trend: 'down' },
  ];

  const placeholderCampaigns = [
      { id: 1, name: 'Summer Sale Promo', platform: 'Google Ads', status: 'Active' },
      { id: 2, name: 'New Service Launch', platform: 'Social Media', status: 'Planned' },
      { id: 3, name: 'Brand Awareness Q3', platform: 'Content Marketing', status: 'Ongoing' },
  ];


  return (
    // Apply dark mode background
    <PageWrapper className="bg-gradient-to-b from-[#E0F0FF] to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-8 w-8 text-[#002B5B] dark:text-blue-300" />
            <h1 className="text-3xl font-bold text-[#002B5B] dark:text-gray-100">
              Client Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Welcome Message */}
        {currentUser && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 text-center sm:text-left">
                <p className="text-xl text-gray-800 dark:text-gray-100">
                Welcome back, <span className="font-semibold text-[#002B5B] dark:text-blue-300">{currentUser.displayName || 'Valued Client'}</span>!
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Logged in as: {currentUser.email}
                </p>
          </div>
        )}

        {/* Dashboard Content Grid - Adjusted for potential 4 columns on XL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {/* Account Overview Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className='flex items-center'>
                 <UserCircle className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
                 <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">Account</h2> {/* Shortened Title */}
                </div>
                 {!isEditingProfile && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)} className="ml-auto">
                        <Edit3 className="h-4 w-4" />
                    </Button>
                 )}
            </div>

            {isEditingProfile ? ( // Edit Form
                <form onSubmit={handleProfileUpdate} className="space-y-3">
                    <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                        <input
                            type="text"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                             className={cn(
                                "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm",
                                "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                                "focus:ring-[#0056b3] focus:border-[#0056b3]",
                                "dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             )}
                            placeholder="Enter your display name"
                        />
                    </div>
                     {profileLoading && <p className="text-sm text-blue-600 dark:text-blue-400">Saving...</p>}
                     {profileError && <p className="text-sm text-red-600 dark:text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {profileError}</p>}
                     {profileSuccess && <p className="text-sm text-green-600 dark:text-green-400">{profileSuccess}</p>}
                    <div className="flex gap-2 justify-end mt-auto pt-3"> {/* Ensure buttons stick to bottom */}
                         <Button type="button" variant="secondary" size="sm" onClick={() => { setIsEditingProfile(false); setProfileError(null); setDisplayName(currentUser?.displayName || ''); }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" size="sm" disabled={profileLoading}>
                            <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                    </div>
                </form>
            ) : ( // Display Mode
                <div className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm"> {/* Adjusted text size */}
                  <p><strong>Name:</strong> {currentUser?.displayName || '(Not Set)'}</p>
                  <p><strong>Email:</strong> {currentUser?.email || 'N/A'}</p>
                  <p><strong>Member Since:</strong> {memberSince}</p>
                </div>
            )}
          </div>

          {/* My Services Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">Services</h2>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 flex-grow">
              <p className="text-sm">Your active services.</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">(Feature coming soon)</p>
            </div>
             <Link to="/services" className="mt-auto w-full">
                <Button variant="primary" size="sm" className="w-full">
                    Explore Our Services
                </Button>
             </Link>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">Quick Actions</h2>
            </div>
            <div className="space-y-3 flex flex-col flex-grow justify-center">
               <a href="https://calendly.com/riseonlinesolutions" target="_blank" rel="noopener noreferrer">
                 <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Schedule Meeting</span> {/* Shortened */}
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400 flex-shrink-0" />
                 </Button>
               </a>
               <Link to="/contact">
                 <Button variant="outline" className="w-full justify-start text-left">
                    <MessageSquare className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Contact Support</span>
                 </Button>
               </Link>
            </div>
          </div>

          {/* --- Website Projects Card --- */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className='flex items-center'>
                <FolderKanban className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
                <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">Projects</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => {/* Navigate to projects page or open modal */}} className="ml-auto">
                  <Settings className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm">
              {placeholderProjects.length > 0 ? (
                placeholderProjects.slice(0, 3).map(project => ( // Show first 3 projects
                  <div key={project.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                    <span>{project.name}</span>
                    <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap", // Added whitespace-nowrap
                        project.status === 'In Progress' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                        project.status === 'Pending Review' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                        project.status === 'Completed' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    )}>
                        {project.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No active projects found.</p>
              )}
              {placeholderProjects.length > 3 && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">...</p>}
            </div>
             <Button variant="secondary" size="sm" className="w-full mt-auto" onClick={() => {/* Navigate to projects page */}}>
                 Manage All Projects
             </Button>
          </div>


          {/* --- AI Chatbot Card --- */}
          {/* Adjust col-span for layout: Spans 2 on lg, 1 on xl (fits 4 cols) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col lg:col-span-2 xl:col-span-1">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3 flex-shrink-0" />
              <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">AI Assistant</h2>
            </div>

            {/* Chat History Area */}
            <div ref={chatContainerRef} className="flex-grow h-64 overflow-y-auto mb-4 pr-2 space-y-3 border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-900/50 text-sm"> {/* Set base text size */}
                {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={cn(
                            "max-w-[85%] p-2 rounded-lg whitespace-pre-wrap break-words", // Added break-words
                            message.role === 'user'
                                ? 'bg-blue-500 text-white dark:bg-blue-600'
                                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        )}>
                            {message.text}
                        </div>
                    </div>
                ))}
                {isChatLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 p-2 rounded-lg flex items-center text-sm">
                            <Loader2 className="h-4 w-4 animate-spin mr-2 flex-shrink-0"/>
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}
                 {!isChatLoading && chatHistory.length <= 1 && !chatError && GEMINI_API_KEY && ( // Initial state hint
                     <div className="text-center text-xs text-gray-400 dark:text-gray-500 pt-2">
                         Ask about services, projects, or general questions.
                    </div>
                 )}
            </div>

            {/* Input Area */}
            {chatError && (
                <p className="text-sm text-red-600 dark:text-red-400 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0"/> {chatError}
                </p>
            )}

            {!GEMINI_API_KEY && !chatError && ( // Specific error if key is missing
                 <p className="text-sm text-red-600 dark:text-red-400 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0"/> Chatbot unavailable: API Key missing.
                 </p>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2 mt-auto"> {/* Use form for semantic Enter key submission */}
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    // Removed onKeyDown as form onSubmit handles Enter now
                    placeholder={!GEMINI_API_KEY ? "Chat disabled" : "Ask me anything..."}
                    disabled={isChatLoading || !genAI.current} // Disable if loading or not initialized
                    className={cn(
                        "flex-grow appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm",
                        "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                        "focus:ring-[#0056b3] focus:border-[#0056b3] dark:focus:ring-blue-500 dark:focus:border-blue-500",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    aria-label="Chat input"
                />
                <Button
                    type="submit" // Button within form
                    variant="primary"
                    size="sm"
                    // onClick removed, handled by form onSubmit
                    disabled={isChatLoading || !userInput.trim() || !genAI.current}
                    aria-label="Send chat message"
                    className="px-3" // Make button slightly smaller
                >
                    <Send className="h-4 w-4" />
                </Button>
            </form>
          </div>


          {/* --- SEO Keyword Tracking Card --- */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className='flex items-center'>
                 <KeyRound className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
                 <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">Keywords</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => {/* Navigate or open add keyword modal */}} className="ml-auto">
                  <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm">
              {placeholderKeywords.length > 0 ? (
                  placeholderKeywords.slice(0, 3).map(keyword => (
                      <div key={keyword.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                          <span className="truncate max-w-[60%]">{keyword.term}</span>
                          <div className='flex items-center gap-1'>
                             <span className='text-xs text-gray-500 dark:text-gray-400'>Pos: {keyword.position}</span>
                              {keyword.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                              {keyword.trend === 'down' && <TrendingUp className="h-3 w-3 text-red-500 transform scale-y-[-1]" />}
                              {keyword.trend === 'stable' && <span className="h-3 w-3 text-gray-400">-</span>}
                          </div>
                      </div>
                  ))
              ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No keywords being tracked.</p>
              )}
               {placeholderKeywords.length > 3 && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">...</p>}
            </div>
            <Button variant="secondary" size="sm" className="w-full mt-auto" onClick={() => {/* Navigate to SEO report page */}}>
                 View Full SEO Report
             </Button>
          </div>

          {/* --- Marketing Campaigns Card --- */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className='flex items-center'>
                 <Megaphone className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
                 <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">Campaigns</h2>
              </div>
               <Button variant="outline" size="sm" onClick={() => {/* Navigate or open new campaign modal */}} className="ml-auto">
                  <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm">
               {placeholderCampaigns.length > 0 ? (
                  placeholderCampaigns.slice(0, 3).map(campaign => (
                      <div key={campaign.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                          <div>
                            <span className='block'>{campaign.name}</span>
                            <span className='text-xs text-gray-500 dark:text-gray-400'>{campaign.platform}</span>
                          </div>
                          <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap", // Added whitespace-nowrap
                            campaign.status === 'Active' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                            campaign.status === 'Planned' && 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200',
                            campaign.status === 'Ongoing' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                            // Add more statuses like 'Paused', 'Completed' etc.
                          )}>
                              {campaign.status}
                          </span>
                      </div>
                  ))
               ) : (
                   <p className="text-gray-500 dark:text-gray-400 italic">No marketing campaigns running.</p>
               )}
               {placeholderCampaigns.length > 3 && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">...</p>}
            </div>
             <Button variant="secondary" size="sm" className="w-full mt-auto" onClick={() => {/* Navigate to campaigns page */}}>
                 Manage Campaigns
             </Button>
          </div>

        </div> {/* End of Grid */}
      </div>
    </PageWrapper>
  );
}
