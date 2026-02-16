import { GlassCard } from '../../../components/ui/GlassCard';

export function TechCardSkeleton() {
  return (
    <GlassCard className="p-4 flex flex-col min-w-[300px] md:min-w-[320px]" neonColor="blue">
      {/* Image placeholder */}
      <div className="relative h-40 w-full rounded-xl bg-gray-800/50 animate-pulse mb-4" />

      {/* Title placeholder */}
      <div className="h-6 bg-gray-800/50 rounded-lg w-5/6 animate-pulse mb-2" />

      {/* Summary placeholder */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-800/50 rounded-lg animate-pulse" />
        <div className="h-4 bg-gray-800/50 rounded-lg w-5/6 animate-pulse" />
      </div>

      {/* Language tags / badges */}
      <div className="flex gap-2 mt-3">
        <div className="h-6 w-16 bg-gray-800/50 rounded-full animate-pulse" />
        <div className="h-6 w-20 bg-gray-800/50 rounded-full animate-pulse" />
        <div className="h-6 w-16 bg-gray-800/50 rounded-full animate-pulse" />
      </div>

      {/* Button placeholder */}
      <div className="h-10 bg-gray-800/50 rounded-lg mt-auto animate-pulse" />
    </GlassCard>
  );
}
