
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IntentBadge } from "@/components/ui/intent-badge";
import { getLeads } from "@/lib/mock-data";
import { Lead, DealStage } from "@/lib/types";
import { Plus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STAGES: { id: DealStage; name: string }[] = [
  { id: "new", name: "New Leads" },
  { id: "contacted", name: "Contacted" },
  { id: "meeting", name: "Meeting Scheduled" },
  { id: "proposal", name: "Proposal Sent" },
  { id: "closed", name: "Closed Won" },
];

export default function DealPipeline() {
  const [leadsMap, setLeadsMap] = useState<Record<DealStage, Lead[]>>({
    new: [],
    contacted: [],
    meeting: [],
    proposal: [],
    closed: [],
  });
  const { toast } = useToast();

  useEffect(() => {
    // Get all leads and organize them by deal stage
    const allLeads = getLeads();
    const leadsByStage: Record<DealStage, Lead[]> = {
      new: [],
      contacted: [],
      meeting: [],
      proposal: [],
      closed: [],
    };
    
    allLeads.forEach(lead => {
      if (lead.dealStage) {
        leadsByStage[lead.dealStage].push(lead);
      } else {
        leadsByStage.new.push(lead);
      }
    });
    
    setLeadsMap(leadsByStage);
  }, []);

  const handleDragStart = (e: React.DragEvent, leadId: string, currentStage: DealStage) => {
    e.dataTransfer.setData("leadId", leadId);
    e.dataTransfer.setData("currentStage", currentStage);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: DealStage) => {
    e.preventDefault();
    
    const leadId = e.dataTransfer.getData("leadId");
    const currentStage = e.dataTransfer.getData("currentStage") as DealStage;
    
    if (currentStage === targetStage) return;
    
    // Find the lead in the current stage
    const lead = leadsMap[currentStage].find(l => l.id === leadId);
    if (!lead) return;
    
    // Create a new leads map with the lead moved to the new stage
    const newLeadsMap = { ...leadsMap };
    newLeadsMap[currentStage] = newLeadsMap[currentStage].filter(l => l.id !== leadId);
    newLeadsMap[targetStage] = [...newLeadsMap[targetStage], { ...lead, dealStage: targetStage }];
    
    setLeadsMap(newLeadsMap);
    
    toast({
      title: "Lead moved",
      description: `${lead.name} moved to ${STAGES.find(s => s.id === targetStage)?.name}`,
    });
  };

  const calculateTotalValue = (leads: Lead[]) => {
    // In a real app, this would calculate the total potential value of leads
    // Here we just use a placeholder calculation based on lead score
    return leads.reduce((sum, lead) => sum + lead.score * 100, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deal Pipeline</h1>
          <p className="text-muted-foreground">
            Manage your deals through the sales pipeline
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {STAGES.map((stage) => (
          <div
            key={stage.id}
            className="min-w-[280px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <Card className="h-full">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">
                    {leadsMap[stage.id].length}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  ${calculateTotalValue(leadsMap[stage.id]).toLocaleString()} potential value
                </p>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {leadsMap[stage.id].length === 0 ? (
                    <div className="p-2 text-center text-sm text-gray-500">
                      <p>No leads in this stage</p>
                      <p className="text-xs">Drag leads here</p>
                    </div>
                  ) : (
                    leadsMap[stage.id].map((lead) => (
                      <Card
                        key={lead.id}
                        className="cursor-grab active:cursor-grabbing"
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id, stage.id)}
                      >
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-sm">{lead.name}</h3>
                                <p className="text-xs text-gray-500">{lead.company}</p>
                              </div>
                              <IntentBadge intent={lead.intent} className="ml-2" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-xs text-gray-500">
                                <Users className="h-3 w-3 mr-1" />
                                {lead.calls.length} calls
                              </div>
                              <div className="bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                                {lead.score}%
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
