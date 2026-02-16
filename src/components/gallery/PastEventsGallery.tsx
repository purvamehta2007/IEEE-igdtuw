import { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

interface GalleryEvent {
  id: string;
  event_id: string;
  images: string[];
  highlights: string[];
  impact_stats: {
    participants?: number;
    satisfaction?: number;
    projects?: number;
  };
  event: {
    title: string;
    category: string;
    event_date: string;
  };
}

export function PastEventsGallery() {
  const [galleryEvents, setGalleryEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const { data, error } = await supabase
      .from('past_events_gallery')
      .select(`
        *,
        events (
          title,
          category,
          event_date,
          description
        )
      `)
      .order('events(event_date)', { ascending: false });

    if (!error && data) {
      setGalleryEvents(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#00D9FF] text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <GradientText className="text-5xl mb-4">Event Archives</GradientText>
        <p className="text-gray-400 text-lg">Relive the moments that made history</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryEvents.map((item, index) => {
          const event = item.events;
          const neonColors = ['blue', 'purple', 'violet', 'pink'] as const;
          const color = neonColors[index % neonColors.length];

          return (
            <div key={item.id} className="break-inside-avoid">
              <GlassCard
                className="p-6 cursor-pointer"
                neonColor={color}
                hover3d
                onClick={() => setSelectedEvent(item)}
              >
                {item.images && item.images[0] && (
                  <div className="relative h-48 -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={event?.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">{event?.title}</h3>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar size={16} className="text-[#00D9FF]" />
                    <span>{new Date(event?.event_date).toLocaleDateString()}</span>
                  </div>

                  {item.impact_stats && (
                    <div className="grid grid-cols-2 gap-3">
                      {item.impact_stats.participants && (
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-purple-400" />
                          <span className="text-sm text-gray-300">
                            {item.impact_stats.participants} attendees
                          </span>
                        </div>
                      )}
                      {item.impact_stats.satisfaction && (
                        <div className="flex items-center gap-2">
                          <TrendingUp size={16} className="text-[#00D9FF]" />
                          <span className="text-sm text-gray-300">
                            {item.impact_stats.satisfaction}% satisfaction
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="space-y-2">
                      {item.highlights.slice(0, 3).map((highlight: string, i: number) => (
                        <div key={i} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-[#00D9FF]">•</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>

      {galleryEvents.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          <p className="text-xl">No past events to display yet</p>
        </div>
      )}

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <GlassCard
            className="max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto"
            neonColor="blue"
            onClick={(e: any) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {selectedEvent.events?.title}
            </h2>

            {selectedEvent.images && selectedEvent.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedEvent.images.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Event image ${i + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {selectedEvent.highlights && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#00D9FF] mb-4">Highlights</h3>
                <ul className="space-y-2">
                  {selectedEvent.highlights.map((highlight: string, i: number) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-[#00D9FF]">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
}
