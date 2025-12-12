interface StatsCardProps {
  title: string;
  value: number;
  unit: string;
  icon: string;
  color: string;
}

export default function StatsCard({ title, value, unit, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {value.toFixed(0)}
        <span className="text-lg text-gray-500 ml-1">{unit}</span>
      </div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
}