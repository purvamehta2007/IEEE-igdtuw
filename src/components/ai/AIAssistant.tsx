import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your IEEE IGDTUW assistant. I can help you with event information, membership queries, and answer FAQs. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    'Upcoming events',
    'How to join IEEE?',
    'Membership benefits',
    'Contact information',
  ];

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    if (lower.includes('event') || lower.includes('upcoming')) {
      return "We have exciting events coming up! Check out the Events section to see our latest workshops, hackathons, and tech talks. You can filter by category and register directly.";
    }

    if (lower.includes('join') || lower.includes('member')) {
      return "Joining IEEE IGDTUW is easy! Visit the Membership section to learn about benefits and how to become a member. You'll get access to exclusive events, certifications, and a vibrant tech community.";
    }

    if (lower.includes('benefit')) {
      return "IEEE membership offers: exclusive events access, networking opportunities, skill development workshops, certifications, early access to opportunities, and a supportive tech community!";
    }

    if (lower.includes('recruit') || lower.includes('apply')) {
      return "We're always looking for passionate individuals! Visit the Recruitment section to apply for core team, associate, or coordinator positions. The application process is simple and gamified!";
    }

    if (lower.includes('contact') || lower.includes('reach')) {
      return "You can reach us through our social media channels! Check the Social Links section for LinkedIn, Instagram, Twitter, and our official website.";
    }

    if (lower.includes('point') || lower.includes('gamification')) {
      return "Earn points by participating in events (+10), submitting feedback (+5), joining recruitment (+20), and contributing content (+15). Check the Leaderboard to see top contributors!";
    }

    return "I'm here to help! You can ask me about events, membership, recruitment, or general IEEE IGDTUW information. Try asking about 'upcoming events' or 'how to join IEEE'.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#00D9FF] to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.6)] hover:scale-110 transition-transform"
        >
          <Bot size={32} className="text-white" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-96 max-w-[calc(100vw-2rem)]">
          <GlassCard className="flex flex-col h-[600px]" neonColor="blue">
            <div className="flex items-center justify-between p-4 border-b border-[#00D9FF]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D9FF] to-purple-500 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">IEEE Assistant</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Sparkles size={12} className="text-[#00D9FF]" />
                    AI-Powered
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[80%] p-3 rounded-2xl
                      ${message.type === 'user'
                        ? 'bg-[#00D9FF] text-black rounded-br-none'
                        : 'bg-black/50 text-white border border-[#00D9FF]/30 rounded-bl-none'
                      }
                    `}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-[#00D9FF]/30">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map(reply => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 text-xs rounded-full bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30 hover:bg-[#00D9FF]/30 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-lg bg-[#00D9FF] text-black flex items-center justify-center hover:bg-[#00B8D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
}
