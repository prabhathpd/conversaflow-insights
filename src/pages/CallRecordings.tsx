import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CallScore } from "@/components/ui/call-score";
import { ToneBadge } from "@/components/ui/tone-badge";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCalls, getLeads } from "@/lib/mock-data";
import { Call, Lead } from "@/lib/types";
import { Search, Calendar, FileText, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CallRecordings() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [leads, setLeads] = useState<Record<string, Lead>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [filter, setFilter] = useState("all");
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const { toast } = useToast();
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    // Check if API key exists
    const apiKey = localStorage.getItem("vapiApiKey");
    setApiKeyMissing(!apiKey);
    
    if (!apiKey) {
      toast({
        title: "VAPI API Key Missing",
        description: "For the best experience, please set up your VAPI API key in Settings or use the Auto-Configure option from the home page.",
        variant: "destructive"
      });
    } else {
      console.log("VAPI API key found in localStorage");
    }
    
    // Fetch calls data
    const allCalls = getCalls();
    setCalls(allCalls);
    
    // Create a map of leads for quick lookup
    const leadsMap: Record<string, Lead> = {};
    getLeads().forEach(lead => {
      leadsMap[lead.id] = lead;
    });
    setLeads(leadsMap);
  }, [toast]);

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

  const generateSummary = (call: Call) => {
    setIsGeneratingSummary(true);
    // Simulate AI summarization
    setTimeout(() => {
      setIsGeneratingSummary(false);
      toast({
        title: "Summary Generated",
        description: "The call summary has been updated with AI insights.",
      });
    }, 1500);
  };

  const toggleTranscript = () => {
    setShowFullTranscript(!showFullTranscript);
  };

  // Mock transcript content
  const mockTranscript = `
    [00:00] Agent: Hello, this is ConversaFlow sales team. How can I help you today?
    
    [00:05] Client: Hi there, I'm calling about your software solution. I saw it mentioned in a newsletter.
    
    [00:12] Agent: Great to hear that! Yes, our platform helps sales teams analyze calls and manage leads more effectively. Could you tell me a bit about your current process?
    
    [00:25] Client: Sure, we're currently using spreadsheets to track everything, and it's becoming a mess. We have about 15 salespeople and no good way to analyze their calls.
    
    [00:38] Agent: I understand completely. Many teams face that challenge as they grow. Our platform specifically addresses that by automatically recording and analyzing calls.
    
    [00:52] Client: That sounds promising. What kind of insights does your AI provide after calls?
    
    [01:00] Agent: Great question! Our AI analyzes tone, engagement levels, and key topics discussed. It also identifies potential follow-up items and can even suggest the best times to reconnect based on what was discussed.
    
    [01:20] Client: That's impressive. What about pricing? We're a mid-sized company.
    
    [01:25] Agent: We have several tiers designed for different team sizes. For 15 salespeople, I'd recommend our Growth plan which offers unlimited calls, full analytics, and CRM integration for $49 per user monthly.
    
    [01:40] Client: That seems reasonable compared to what we're looking at elsewhere. Do you offer a trial period?
    
    [01:47] Agent: Absolutely! We offer a 14-day full-feature trial with no credit card required. I'd be happy to set that up for you today if you're interested.
    
    [01:56] Client: Yes, that would be great. Let's proceed with that.
    
    [02:00] Agent: Excellent! I'll just need some basic information to get your trial account set up...
  `;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Call Recordings</h1>
        <p className="text-muted-foreground">
          Listen to your recorded calls and review AI-powered insights
        </p>
      </div>

      {apiKeyMissing && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-4">
          <h3 className="text-yellow-800 font-medium">VAPI API Key Missing</h3>
          <p className="text-yellow-700 text-sm mt-1">
            You need to add your VAPI API key in Settings to access call recordings.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
            onClick={() => window.location.href = "/settings"}
          >
            Go to Settings
          </Button>
        </div>
      )}

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
                    <div className="flex flex-col gap-3">
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
                      </div>

                      {selectedCall?.id === call.id && (
                        <div>
                          <div className="mb-3">
                            <AudioPlayer recordingUrl={call.recordingUrl} />
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-1 text-gray-500" />
                                <p className="text-xs font-semibold">Transcript</p>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={toggleTranscript}
                              >
                                {showFullTranscript ? "Show Less" : "Show More"}
                              </Button>
                            </div>
                            <div className={`bg-gray-50 p-3 rounded-md border overflow-y-auto transition-all ${showFullTranscript ? 'max-h-96' : 'max-h-32'}`}>
                              <pre className="text-sm whitespace-pre-wrap font-sans">
                                {call.transcriptUrl ? mockTranscript : "No transcript available for this call."}
                              </pre>
                            </div>
                            {call.transcriptUrl && (
                              <div className="mt-2 flex justify-end">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => generateSummary(call)}
                                  disabled={isGeneratingSummary}
                                  className="flex items-center gap-1"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  {isGeneratingSummary ? 'Summarizing...' : 'Summarize'}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
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
