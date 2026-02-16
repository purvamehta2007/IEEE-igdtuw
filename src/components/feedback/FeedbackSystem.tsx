import { useState, useEffect } from 'react';
import { Star, Smile, Meh, Frown, ThumbsUp, Heart } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { GradientText } from '../ui/GradientText';

export function FeedbackSystem() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [emoji, setEmoji] = useState('');
  const [comment, setComment] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const emojis = [
    { id: 'love', icon: Heart, label: 'Loved it', color: 'text-pink-500' },
    { id: 'happy', icon: Smile, label: 'Great', color: 'text-[#00D9FF]' },
    { id: 'okay', icon: Meh, label: 'Okay', color: 'text-yellow-500' },
    { id: 'sad', icon: Frown, label: 'Not good', color: 'text-red-500' },
  ];

  useEffect(() => {
    loadEvents();
  }, [user]);

  const loadEvents = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('event_registrations')
      .select('event_id, events(id, title, event_date)')
      .eq('user_id', user.id)
      .eq('feedback_submitted', false)
      .order('events(event_date)', { ascending: false });

    if (data) {
      setEvents(data.map(r => r.events).filter(Boolean));
    }
  };

  const handleSubmit = async () => {
    if (!user || !selectedEvent || rating === 0) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          event_id: selectedEvent,
          user_id: user.id,
          rating,
          emoji_reaction: emoji,
          comment,
          suggestions,
          is_anonymous: isAnonymous,
          sentiment_score: rating / 5,
        });

      if (!error) {
        await supabase
          .from('event_registrations')
          .update({ feedback_submitted: true })
          .eq('user_id', user.id)
          .eq('event_id', selectedEvent);

        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <GlassCard className="p-12 text-center max-w-2xl mx-auto">
          <GradientText className="text-3xl mb-4">Share Your Feedback</GradientText>
          <p className="text-gray-400">Please sign in to provide feedback</p>
        </GlassCard>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <GlassCard className="p-12 text-center max-w-2xl mx-auto" neonColor="blue">
          <ThumbsUp size={64} className="mx-auto text-[#00D9FF] mb-6" />
          <GradientText className="text-3xl mb-4">Thank You!</GradientText>
          <p className="text-gray-400 mb-6">
            Your feedback helps us create better events for everyone
          </p>
          <NeonButton onClick={() => {
            setSubmitted(false);
            setRating(0);
            setEmoji('');
            setComment('');
            setSuggestions('');
            setSelectedEvent('');
            loadEvents();
          }}>
            Submit Another Feedback
          </NeonButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-12">
        <GradientText className="text-5xl mb-4">Event Feedback</GradientText>
        <p className="text-gray-400 text-lg">Help us improve by sharing your experience</p>
      </div>

      <GlassCard className="p-8" neonColor="blue">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Select Event
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
            >
              <option value="">Choose an event...</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          {selectedEvent && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Rate Your Experience
                </label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={40}
                        className={`
                          ${(hoverRating || rating) >= star
                            ? 'fill-[#00D9FF] text-[#00D9FF]'
                            : 'text-gray-600'
                          }
                        `}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  How did you feel?
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {emojis.map(e => {
                    const Icon = e.icon;
                    return (
                      <button
                        key={e.id}
                        onClick={() => setEmoji(e.id)}
                        className={`
                          p-4 rounded-xl border-2 transition-all
                          ${emoji === e.id
                            ? 'border-[#00D9FF] bg-[#00D9FF]/10 shadow-[0_0_15px_rgba(0,217,255,0.3)]'
                            : 'border-[#00D9FF]/30 hover:border-[#00D9FF]/50'
                          }
                        `}
                      >
                        <Icon size={32} className={`mx-auto mb-2 ${e.color}`} />
                        <p className="text-xs text-gray-400">{e.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Comments (Optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                  placeholder="Share your thoughts..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Suggestions for Improvement
                </label>
                <textarea
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                  placeholder="How can we make it better?"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 rounded bg-black/50 border-[#00D9FF]/30 text-[#00D9FF] focus:ring-[#00D9FF]"
                />
                <label htmlFor="anonymous" className="text-gray-300">
                  Submit anonymously
                </label>
              </div>

              <NeonButton
                onClick={handleSubmit}
                disabled={loading || rating === 0}
                className="w-full"
                size="lg"
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </NeonButton>
            </>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
