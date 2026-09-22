import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Mic, MicOff, Globe, Paperclip, Copy, Bookmark, Share2, Check, ExternalLink, Cpu, HelpCircle, RefreshCw, MessageSquare, AlertCircle, ShieldCheck } from 'lucide-react';
import { askMANAK, fetchUserConversations, createUserConversation, addConversationMessage, saveUserItem } from '../services/api';
import { ChatMessage, RAGResponse, Conversation } from '../types';
import { ConfidenceBadge } from '../components/common/ConfidenceBadge';
import { WhyThisAnswerModal } from '../components/common/WhyThisAnswerModal';
import { useAuth } from '../context/AuthContext';

export const AssistantPage: React.FC = () => {
  const { user, token } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'Namaste! I am MANAK AI, your source-grounded intelligent assistant for Indian Standards and Bureau of Indian Standards (BIS) services. Ask me about standards applicability, certification steps, laboratory locations, or hallmarking.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi' | 'bn'>(user?.profile?.preferredLanguage || 'en');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<RAGResponse | null>(null);
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    if (user?.profile?.preferredLanguage) {
      setLanguage(user.profile.preferredLanguage);
    }
  }, [user?.profile?.preferredLanguage]);

  useEffect(() => {
    if (token) {
      fetchUserConversations(token).then(list => {
        setConversations(list);
        if (list.length > 0 && !activeConvId) {
          loadConversation(list[0]);
        }
      }).catch(console.error);
    }
  }, [token]);

  const loadConversation = (conv: Conversation) => {
    setActiveConvId(conv.id);
    if (conv.messages && conv.messages.length > 0) {
      setMessages(conv.messages.map(m => ({
        id: m.id,
        sender: m.sender,
        text: m.text,
        timestamp: m.timestamp,
        ragResponse: m.ragResponse
      })));
      const lastRag = [...conv.messages].reverse().find(m => m.ragResponse)?.ragResponse;
      if (lastRag) setSelectedResponse(lastRag);
    }
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  const examplePrompts = [
    'What Indian Standard applies to my stainless steel pressure cooker?',
    'What are the steps to obtain BIS ISI Mark certification?',
    'Which laboratories can test PVC cables under IS 694?',
    'Explain hallmarking requirements and 6-digit HUID for gold jewellery.',
    'How do I verify a BIS Standard Mark or report a fake ISI mark?'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      let convId = activeConvId;
      if (token && !convId) {
        const newConv = await createUserConversation(token, query);
        convId = newConv.id;
        setActiveConvId(convId);
        setConversations(prev => [newConv, ...prev]);
      }

      if (token && convId) {
        await addConversationMessage(token, convId, { sender: 'user', text: query });
      }

      const ragRes = await askMANAK(query, language, user?.profile);
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: ragRes.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragResponse: ragRes,
        language
      };
      setMessages(prev => [...prev, assistantMsg]);
      setSelectedResponse(ragRes);

      if (token && convId) {
        await addConversationMessage(token, convId, { sender: 'assistant', text: ragRes.answer, ragResponse: ragRes });
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'I encountered a connection error while retrieving official BIS records. Please ensure the backend service is running and try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSave = async (msgId: string, text: string, rag?: RAGResponse) => {
    if (savedIds.includes(msgId)) {
      setSavedIds(prev => prev.filter(i => i !== msgId));
      return;
    }

    setSavedIds(prev => [...prev, msgId]);
    if (token) {
      try {
        await saveUserItem(token, {
          itemType: 'answer',
          title: rag?.intent ? `Answer: ${rag.intent}` : 'Saved BIS Guidance Answer',
          summary: text.length > 120 ? text.substring(0, 120) + '...' : text,
          data: rag || { text }
        });
      } catch (err) {
        console.error('Failed to persist saved item to backend:', err);
      }
    }
  };

  // Web Speech API Voice Microphone integration
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported by your browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const latestRAG = selectedResponse || messages.filter(m => m.ragResponse).slice(-1)[0]?.ragResponse;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-100px)] min-h-[600px] flex flex-col font-sans bg-[#F8FAFC]">
      
      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 h-full overflow-hidden">
        
        {/* LEFT COLUMN: Sidebar & Conversations History */}
        <div className="hidden lg:flex lg:col-span-3 bg-white rounded-2xl p-4 flex-col justify-between border border-slate-200 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> Recent Threads
              </span>
              <button
                onClick={() => {
                  setActiveConvId(null);
                  setMessages([messages[0]]);
                }}
                className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold"
                title="Start new thread"
              >
                <RefreshCw className="w-3 h-3 text-emerald-600" /> New
              </button>
            </div>

            {conversations.length > 0 && (
              <div className="space-y-1 max-h-[160px] overflow-y-auto">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your History</span>
                {conversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => loadConversation(c)}
                    className={`w-full text-left p-2 rounded-xl text-xs font-semibold truncate transition-all border ${
                      activeConvId === c.id
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sample Queries</span>
              {examplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 hover:text-slate-900 transition-all border border-slate-200 hover:border-emerald-300 font-medium"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <p className="flex items-center gap-1 text-emerald-700 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Source Grounded
            </p>
            <p>Every answer synthesized from retrieved official BIS records.</p>
          </div>
        </div>

        {/* CENTER COLUMN: Main Chat Conversation Window */}
        <div className="lg:col-span-6 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Chat Header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-display font-bold text-sm text-slate-900">MANAK AI Workspace</span>
              <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md font-bold uppercase">
                Grounded Engine
              </span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs shadow-sm">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                aria-label="Select Assistant Language"
                className="bg-transparent text-slate-800 text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-white">English</option>
                <option value="hi" className="bg-white">हिन्दी (Hindi)</option>
                <option value="bn" className="bg-white">বাংলা (Bengali)</option>
              </select>
            </div>
          </div>

          {/* Conversation Scroll Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isAsst = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAsst ? 'justify-start' : 'justify-end'}`}
                >
                  {isAsst && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0 font-bold text-xs shadow-sm">
                      AI
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-4 space-y-2.5 ${
                    isAsst
                      ? 'bg-slate-50 border border-slate-200 text-slate-900 shadow-sm'
                      : 'bg-emerald-600 text-white font-medium shadow-sm'
                  }`}>
                    {/* Confidence & Evidence Header if available */}
                    {isAsst && msg.ragResponse && (
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
                        <ConfidenceBadge
                          confidence={msg.ragResponse.confidence}
                          score={msg.ragResponse.confidenceScore}
                        />
                        <button
                          onClick={() => {
                            setSelectedResponse(msg.ragResponse!);
                            setIsWhyModalOpen(true);
                          }}
                          className="text-[11px] text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1 font-bold"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" /> Why this answer?
                        </button>
                      </div>
                    )}

                    {/* Message body text */}
                    <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </div>

                    {/* Structured Step Explanation if available */}
                    {isAsst && msg.ragResponse?.structuredExplanation && msg.ragResponse.structuredExplanation.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Structured Guidance</span>
                        <ul className="space-y-1">
                          {msg.ragResponse.structuredExplanation.map((exp, i) => (
                            <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{exp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Toolbar */}
                    {isAsst && (
                      <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 border-t border-slate-200">
                        <span>{msg.timestamp}</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="hover:text-slate-900 flex items-center gap-1 font-semibold"
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                            {copiedId === msg.id ? 'Copied' : 'Copy'}
                          </button>
                          <button
                            onClick={() => toggleSave(msg.id, msg.text, msg.ragResponse)}
                            className="hover:text-slate-900 flex items-center gap-1 font-semibold"
                          >
                            <Bookmark className={`w-3 h-3 ${savedIds.includes(msg.id) ? 'fill-amber-500 text-amber-500' : 'text-slate-500'}`} />
                            {savedIds.includes(msg.id) ? 'Saved' : 'Save'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center text-xs text-slate-500">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Retrieving official BIS standards & synthesizing answer...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-slate-50 border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-white rounded-xl p-1.5 border border-slate-200 focus-within:border-emerald-500 shadow-sm"
            >
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-2 rounded-lg transition-colors ${
                  isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Voice Search Input"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about Indian Standards, certification, labs, hallmarking..."
                className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none px-2"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold disabled:opacity-40 transition-all shadow-md shadow-emerald-600/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: Evidence & Sources Panel */}
        <div className="hidden lg:flex lg:col-span-3 bg-white rounded-2xl p-4 flex-col justify-between border border-slate-200 shadow-sm overflow-y-auto space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Official Sources & Evidence
              </span>
            </div>

            {latestRAG && latestRAG.citations.length > 0 ? (
              <div className="space-y-3">
                <ConfidenceBadge confidence={latestRAG.confidence} score={latestRAG.confidenceScore} />

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Supporting References</span>
                  {latestRAG.citations.map((cite) => (
                    <div key={cite.index} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-800 text-[11px]">[{cite.index}] {cite.sourceName}</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                          {cite.authorityLevel}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 text-xs">{cite.documentTitle}</p>
                      <p className="text-[11px] text-slate-600 line-clamp-2">"{cite.snippet}"</p>
                      <a
                        href={cite.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-emerald-700 font-bold hover:underline flex items-center gap-1 pt-1"
                      >
                        Official BIS Source <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsWhyModalOpen(true)}
                  className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Why this answer? (View Explanation)
                </button>
              </div>
            ) : (
              <div className="text-center py-12 space-y-2 text-slate-400">
                <HelpCircle className="w-8 h-8 mx-auto stroke-1" />
                <p className="text-xs">Select or ask a question to reveal grounded BIS evidence sources.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* RAG Why This Answer Inspection Modal */}
      {latestRAG && (
        <WhyThisAnswerModal
          isOpen={isWhyModalOpen}
          onClose={() => setIsWhyModalOpen(false)}
          ragResponse={latestRAG}
        />
      )}

    </div>
  );
};
