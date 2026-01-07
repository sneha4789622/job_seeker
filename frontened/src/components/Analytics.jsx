import { Briefcase, Target, TrendingUp, User } from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      icon: User,
      title: "Active Users",
      value: "1.5M+",
      growth: "+0.1%",
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      icon: Briefcase,
      title: "Jobs Posted",
      value: "25K+",
      growth: "+0.3%",
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      icon: Target,
      title: "Successful Hires",
      value: "10K+",
      growth: "+0.2%",
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      icon: TrendingUp,
      title: "Match Rate",
      value: "92%",
      growth: "+1.1%",
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
  ];

  return (
    <section className="w-full py-20 px-6">
   
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Platform Analytics
        </h1>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Track real-time growth and performance of our hiring platform.
        </p>
      </div>

  
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${item.bg}`}
                >
                  <Icon className={`${item.text}`} size={22} />
                </div>

                <span className="text-sm font-medium text-green-600">
                  {item.growth}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                {item.value}
              </h2>
              <p className="text-gray-500 mt-1">{item.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Analytics;
