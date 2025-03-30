
import { BarChart3, Phone, Users, Zap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { getDashboardStats, getLeads, getCalls } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { DashboardStats, Call, Lead } from "@/lib/types";
import { IntentBadge } from "@/components/ui/intent-badge";
import { CallScore } from "@/components/ui/call-score";
import { ToneBadge } from "@/components/ui/tone-badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentCalls, setRecentCalls] = useState<Call[]>([]);
  const [highIntentLeads, setHighIntentLeads] = useState<Lead[]>([]);

  useEffect(() => {
    // Fetch dashboard data
    setStats(getDashboardStats());
    
    // Get recent calls
    const calls = getCalls().sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 3);
    setRecentCalls(calls);
    
    // Get high intent leads
    const leads = getLeads()
      .filter(lead => lead.intent === "high")
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    setHighIntentLeads(leads);
  }, []);

  if (!stats) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  // Data for pipeline chart
  const pipelineData = [
    { name: "New", value: stats.dealsPipeline.new },
    { name: "Contacted", value: stats.dealsPipeline.contacted },
    { name: "Meeting", value: stats.dealsPipeline.meeting },
    { name: "Proposal", value: stats.dealsPipeline.proposal },
    { name: "Closed", value: stats.dealsPipeline.closed },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your call analytics and lead management
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Calls"
          value={stats.totalCalls}
          description="All time recorded calls"
          icon={<Phone className="h-4 w-4" />}
          trend="up"
          trendValue="12% from last month"
        />
        <DashboardCard
          title="Total Leads"
          value={stats.totalLeads}
          description="Active leads in your CRM"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue="4 new this week"
        />
        <DashboardCard
          title="Avg. Call Score"
          value={stats.avgCallScore.toFixed(1)}
          description="Based on engagement and sentiment"
          icon={<BarChart3 className="h-4 w-4" />}
          trend="up"
          trendValue="0.3 points"
        />
        <DashboardCard
          title="High Intent Leads"
          value={stats.highIntentLeads}
          description="Leads likely to convert"
          icon={<Zap className="h-4 w-4" />}
          trend="neutral"
          trendValue="No change"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">Deal Pipeline</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pipelineData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 24 }}
                >
                  <XAxis 
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#2563EB"
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">High Intent Leads</h3>
              <Button variant="outline" size="sm" asChild>
                <a href="/leads">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="space-y-4">
              {highIntentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-semibold">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <IntentBadge intent={lead.intent} />
                    <p className="text-sm font-medium">{lead.score}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Recent Calls</h3>
          <Button variant="outline" size="sm" asChild>
            <a href="/calls">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="space-y-4">
          {recentCalls.map((call) => (
            <Card key={call.id}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="font-semibold">{call.summary}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(call.date).toLocaleDateString()} • {Math.floor(call.duration / 60)}m {call.duration % 60}s
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <ToneBadge tone={call.tone} />
                    <CallScore score={call.score} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
