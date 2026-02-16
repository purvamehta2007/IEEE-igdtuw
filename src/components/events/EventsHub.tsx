import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Bookmark, BookmarkCheck, Clock, ExternalLink, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { GradientText } from '../ui/GradientText';

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  event_date: string;
  registration_deadline: string;
  location: string;
  image_url: string;
  registration_link: string;
  max_participants: number;
  current_participants: number;
  status: string;
  speakers: any;
  tags: string[];
  is_featured: boolean;
}

interface EventCardProps {
  event: Event;
  isBookmarked: boolean;
  onBookmark: (eventId: string) => void;
  onRegister: (eventId: string) => void;
}

function EventCard({ event, isBookmarked, onBookmark, onRegister }: EventCardProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(event.event_date);
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff < 0) {
        setTimeLeft('Event started');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [event.event_date]);

  const categoryColors: Record<string, string> = {
    AI: 'blue',
    Robotics: 'purple',
    Coding: 'violet',
    Workshops: 'pink',
    Hackathons: 'blue',
  };

  return (
    <GlassCard
      className="p-6 h-full flex flex-col"
      neonColor={categoryColors[event.category] as any || 'blue'}
      hover3d
    >
      {event.image_url && (
        <div className="relative h-48 -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          {event.is_featured && (
            <div className="absolute top-4 right-4 bg-[#00D9FF] text-black px-3 py-1 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(0,217,255,0.6)]">
              Featured
            </div>
          )}
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
          <span className="inline-block px-3 py-1 bg-[#00D9FF]/20 text-[#00D9FF] text-sm rounded-full">
            {event.category}
          </span>
        </div>
        <button
          onClick={() => onBookmark(event.id)}
          className="text-[#00D9FF] hover:scale-110 transition-transform"
        >
          {isBookmarked ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
        </button>
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <Calendar size={16} className="text-[#00D9FF]" />
          <span>{new Date(event.event_date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>

        {event.location && (
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <MapPin size={16} className="text-[#00D9FF]" />
            <span>{event.location}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <Users size={16} className="text-[#00D9FF]" />
          <span>{event.current_participants} / {event.max_participants || '∞'} participants</span>
        </div>

        <div className="flex items-center gap-2 text-[#00D9FF] text-sm font-semibold">
          <Clock size={16} />
          <span>{timeLeft}</span>
        </div>
      </div>

      {event.tags && event.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4 flex gap-3">
        <NeonButton
          onClick={() => onRegister(event.id)}
          className="flex-1"
          size="sm"
        >
          Register
        </NeonButton>
        {event.registration_link && (
          <a
            href={event.registration_link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-[#00D9FF]/30 text-[#00D9FF] rounded-lg hover:bg-[#00D9FF]/10 transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </GlassCard>
  );
}

export function EventsHub() {
  const [events, setEvents] = useState<Event[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const categories = ['all', 'AI', 'Robotics', 'Coding', 'Workshops', 'Hackathons'];

  useEffect(() => {
    loadEvents();
    if (user) {
      loadBookmarks();
    }
  }, [user]);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  const loadBookmarks = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('bookmarks')
      .select('event_id')
      .eq('user_id', user.id);

    if (!error && data) {
      setBookmarks(new Set(data.map(b => b.event_id)));
    }
  };

  const handleBookmark = async (eventId: string) => {
    if (!user) return;

    if (bookmarks.has(eventId)) {
      await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('event_id', eventId);

      setBookmarks(prev => {
        const next = new Set(prev);
        next.delete(eventId);
        return next;
      });
    } else {
      await supabase
        .from('bookmarks')
        .insert({ user_id: user.id, event_id: eventId });

      setBookmarks(prev => new Set([...prev, eventId]));
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('event_registrations')
      .insert({
        event_id: eventId,
        user_id: user.id,
      });

    if (!error) {
      alert('Successfully registered for the event!');

      await supabase
        .from('events')
        .update({ current_participants: events.find(e => e.id === eventId)!.current_participants + 1 })
        .eq('id', eventId);

      loadEvents();
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#00D9FF] text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <GradientText className="text-5xl mb-4">Event Universe</GradientText>
        <p className="text-gray-400 text-lg">Explore upcoming tech events and workshops</p>
      </div>

      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 bg-black/50 backdrop-blur-sm border border-[#00D9FF]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition-colors"
        />

        <div className="flex items-center gap-3 flex-wrap">
          <Filter size={20} className="text-[#00D9FF]" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-lg font-semibold transition-all
                ${selectedCategory === category
                  ? 'bg-[#00D9FF] text-black shadow-[0_0_15px_rgba(0,217,255,0.5)]'
                  : 'bg-black/50 text-gray-400 border border-[#00D9FF]/30 hover:text-[#00D9FF]'
                }
              `}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            event={event}
            isBookmarked={bookmarks.has(event.id)}
            onBookmark={handleBookmark}
            onRegister={handleRegister}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          <p className="text-xl">No events found</p>
        </div>
      )}
    </div>
  );
}
