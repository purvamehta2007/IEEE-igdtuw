import { GlassCard } from '../../../components/ui/GlassCard';

export function TechCardSkeleton() {
  return (
    <GlassCard className="p-6 h-full flex flex-col" neonColor="blue">
      <div className="relative h-40 -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden bg-gray-800/50 animate-pulse" />

      <div className="space-y-3">
        <div className="h-6 bg-gray-800/50 rounded-lg animate-pulse" />
        <div className="h-4 bg-gray-800/50 rounded-lg w-2/3 animate-pulse" />

        <div className="space-y-2">
          <div className="h-4 bg-gray-800/50 rounded-lg animate-pulse" />
          <div className="h-4 bg-gray-800/50 rounded-lg w-5/6 animate-pulse" />
        </div>

        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-gray-800/50 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-gray-800/50 rounded-full w-20 animate-pulse" />
          <div className="h-6 bg-gray-800/50 rounded-full w-16 animate-pulse" />
        </div>

        <div className="h-10 bg-gray-800/50 rounded-lg mt-auto animate-pulse" />
      </div>
    </GlassCard>
  );
}
