import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  Car, 
  Bus, 
  UsersRound,
  TrendingUp,
  Bed
} from 'lucide-react';
import { useStatistics } from '@/hooks/useAdmin';

export function StatisticsCards() {
  const { data: stats, isLoading } = useStatistics();

  if (isLoading) {
    return <StatisticsSkeleton />;
  }

  if (!stats) return null;

  const cards = [
    {
      title: 'Total Registrations',
      value: stats.totalRegistrations,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      description: 'Registered attendees',
    },
    {
      title: 'Expected Attendees',
      value: stats.totalExpectedAttendees,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      description: 'Including companions',
    },
    {
      title: 'Need Accommodation',
      value: stats.needAccommodation,
      icon: Bed,
      color: 'from-purple-500 to-purple-600',
      description: 'Require lodging',
    },
    {
      title: 'Male Registrants',
      value: stats.maleCount,
      icon: UserCheck,
      color: 'from-cyan-500 to-cyan-600',
      description: 'Male attendees',
    },
    {
      title: 'Female Registrants',
      value: stats.femaleCount,
      icon: UserCheck,
      color: 'from-pink-500 to-pink-600',
      description: 'Female attendees',
    },
    {
      title: 'Coming Alone',
      value: stats.comingAlone,
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      description: 'Individual attendees',
    },
  ];

  const transportCards = [
    {
      title: 'Public Transport',
      value: stats.transportationBreakdown.publicTransport,
      icon: Bus,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Private Vehicle',
      value: stats.transportationBreakdown.privateVehicle,
      icon: Car,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      title: 'Join Brethren',
      value: stats.transportationBreakdown.joinTheBrethren,
      icon: UsersRound,
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 hover:bg-white/15 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-sm">{card.title}</p>
                <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
                <p className="text-white/40 text-xs mt-1">{card.description}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transportation Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-white/80 mb-4">Transportation Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {transportCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="glass-card p-4 flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <p className="text-white/60 text-sm">{card.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatisticsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="glass-card p-6">
          <div className="h-4 w-24 bg-white/10 rounded mb-2" />
          <div className="h-8 w-16 bg-white/10 rounded" />
        </div>
      ))}
    </div>
  );
}
