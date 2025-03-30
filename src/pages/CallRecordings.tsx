
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CallScore } from "@/components/ui/call-score";
import { ToneBadge } from "@/components/ui/tone-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCalls, getLeads } from "@/lib/mock-data";
import { Call, Lead } from "@/lib/types";
import { Search, Calendar, PlayCircle, PauseCircle } from "lucide-react";

export default function CallRecordings() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [leads, setLeads] = useState<Record<string, Lead>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Fetch calls data
    const allCalls = getCalls();
    setCalls(allCalls);
    
    // Create a map of leads for quick lookup
    const leadsMap: Record<string, Lead> = {};
    getLeads().forEach(lead => {
      leadsMap[lead.id] = lead;
    });
    setLeads(leadsMap);
  }, []);

  // Filter calls based on search term and filter
  const filteredCalls = calls.filter(call => {
    const matchesSearch = 
      call.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (leads[call.leadId]?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (leads[call.leadId]?.company.toLowerCase().includes(searchTerm.toLowerCase()));
      
    if (filter === "all") return matchesSearch;
    if (filter === "high-score") return matchesSearch && call.score >= 4;
    if (filter === "low-score") return matchesSearch && call.score <= 2;
    return matchesSearch;
  });

  // Sort calls by date (most recent first)
  const sortedCalls = [...filteredCalls].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handlePlayToggle = (call: Call) => {
    if (selectedCall?.id === call.id) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedCall(call);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Call Recordings</h1>
        <p className="text-muted-foreground">
          Listen to your recorded calls and review AI-powered insights
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search calls or leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Calls</SelectItem>
              <SelectItem value="high-score">High Score (4-5)</SelectItem>
              <SelectItem value="low-score">Low Score (1-2)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedCalls.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No calls found matching your search criteria</p>
          </div>
        ) : (
          sortedCalls.map((call) => (
            <Card key={call.id} className={selectedCall?.id === call.id ? "border-app-blue" : ""}>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-3">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handlePlayToggle(call)}
                        className="mt-1"
                      >
                        {selectedCall?.id === call.id && isPlaying ? (
                          <PauseCircle className="h-10 w-10 text-app-blue" />
                        ) : (
                          <PlayCircle className="h-10 w-10 text-gray-400 hover:text-app-blue" />
                        )}
                      </Button>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <h3 className="font-semibold">
                            {leads[call.leadId]?.name} ({leads[call.leadId]?.company})
                          </h3>
                          <span className="text-sm text-gray-500">
                            • {new Date(call.date).toLocaleDateString()} • {Math.floor(call.duration / 60)}m {call.duration % 60}s
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{call.summary}</p>
                        {selectedCall?.id === call.id && (
                          <div className="mt-4 bg-gray-50 p-3 rounded-md border">
                            <p className="text-xs font-semibold mb-1">Transcript Preview</p>
                            <p className="text-sm">
                              {call.transcriptUrl 
                                ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula magna quis tortor cursus, nec auctor sem luctus. Sed interdum metus at metus commodo, ac efficitur velit tincidunt..."
                                : "No transcript available for this call."}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Call Score:</span>
                        <CallScore score={call.score} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Tone:</span>
                        <ToneBadge tone={call.tone} />
                      </div>
                      {selectedCall?.id === call.id && (
                        <>
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-1">AI Insights:</p>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {call.aiInsights?.map((insight, index) => (
                                <li key={index}>{insight}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Follow-up Suggestions:</p>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {call.followUpSuggestions?.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                      {!selectedCall || selectedCall.id !== call.id ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => setSelectedCall(call)}
                        >
                          Show details
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
