import React from "react";
import { ClipboardList, CheckCircle, Clock, TrendingUp } from "lucide-react";

const KPICards = ({ kpi }) => {
  const cards = [
    {
      title: "Total Tasks",
      value: kpi?.totalTasks || 0,
      icon: ClipboardList,
      color: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-950/50",
    },
    {
      title: "Completed",
      value: kpi?.completedTasks || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/50",
    },
    {
      title: "Pending",
      value: kpi?.pendingTasks || 0,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/50",
    },
    {
      title: "Completion Rate",
      value: kpi?.taskCompletionRate || "0%",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="card p-5 hover:scale-[1.02] transition-transform duration-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {card.title}
              </p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                {card.value}
              </p>
            </div>
            <div className={`${card.bg} p-2.5 rounded-xl`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
