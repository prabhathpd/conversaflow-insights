
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IntentBadge } from "@/components/ui/intent-badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { getLeads, getCalls } from "@/lib/mock-data";
import { Lead, LeadIntent } from "@/lib/types";
import { 
  Search, 
  Filter, 
  Phone, 
  Clock, 
  Mail, 
  Calendar, 
  Sliders, 
  ChevronDown,
  Briefcase,
  Building,
  Star,
  X,
  MessageSquare,
  Slack,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [intentFilter, setIntentFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [scoreMinFilter, setScoreMinFilter] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Fetch leads data
    const allLeads = getLeads();
    setLeads(allLeads);
  }, []);

  // Filter leads based on search term and all filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesIntent = intentFilter === "all" || lead.intent === intentFilter;
    
    const matchesCompany = !companyFilter || 
      lead.company.toLowerCase().includes(companyFilter.toLowerCase());
    
    const matchesIndustry = !industryFilter || 
      (lead.industry && lead.industry.toLowerCase().includes(industryFilter.toLowerCase()));
    
    const matchesEmail = !emailFilter || 
      lead.email.toLowerCase().includes(emailFilter.toLowerCase());
    
    const matchesDesignation = !designationFilter || 
      (lead.designation && lead.designation.toLowerCase().includes(designationFilter.toLowerCase()));
    
    const matchesScore = !scoreMinFilter || 
      lead.score >= parseInt(scoreMinFilter);
    
    const matchesDate = !dateFilter || 
      (new Date(lead.lastContact) >= new Date(dateFilter));
    
    return matchesSearch && matchesIntent && matchesCompany && 
           matchesIndustry && matchesEmail && matchesDesignation && 
           matchesScore && matchesDate;
  });

  // Sort leads by score (highest first)
  const sortedLeads = [...filteredLeads].sort((a, b) => b.score - a.score);

  const handleContactClick = (type: string, lead: Lead) => {
    toast({
      title: `${type} contact initiated`,
      description: `You're contacting ${lead.name} via ${type}`,
    });
  };

  const clearFilters = () => {
    setDateFilter("");
    setCompanyFilter("");
    setIndustryFilter("");
    setEmailFilter("");
    setDesignationFilter("");
    setScoreMinFilter("");
    setIntentFilter("all");
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lead Management</h1>
        <p className="text-muted-foreground">
          Track and manage your leads with AI-powered insights
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={intentFilter} onValueChange={setIntentFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Intent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Intent</SelectItem>
              <SelectItem value="high">High Intent</SelectItem>
              <SelectItem value="medium">Medium Intent</SelectItem>
              <SelectItem value="low">Low Intent</SelectItem>
            </SelectContent>
          </Select>
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Sliders className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Lead Filters</h3>
                
                <div className="space-y-2">
                  <label className="text-sm" htmlFor="date-filter">Contact Date After</label>
                  <Input
                    id="date-filter"
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm" htmlFor="company-filter">Company</label>
                  <Input
                    id="company-filter"
                    placeholder="Filter by company"
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm" htmlFor="industry-filter">Industry</label>
                  <Input
                    id="industry-filter"
                    placeholder="Filter by industry"
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm" htmlFor="email-filter">Email</label>
                  <Input
                    id="email-filter"
                    placeholder="Filter by email"
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm" htmlFor="designation-filter">Designation</label>
                  <Input
                    id="designation-filter"
                    placeholder="Filter by designation"
                    value={designationFilter}
                    onChange={(e) => setDesignationFilter(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm" htmlFor="score-filter">Minimum Lead Score</label>
                  <Input
                    id="score-filter"
                    type="number"
                    placeholder="Min score (0-100)"
                    min="0"
                    max="100"
                    value={scoreMinFilter}
                    onChange={(e) => setScoreMinFilter(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                  <Button size="sm" onClick={() => setShowFilters(false)}>Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-4">
        {sortedLeads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No leads found matching your search criteria</p>
          </div>
        ) : (
          sortedLeads.map((lead) => (
            <Card key={lead.id}>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <h3 className="font-semibold text-lg">{lead.name}</h3>
                    <p className="text-gray-500">{lead.company}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <IntentBadge intent={lead.intent} />
                      <div className="bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                        Score: {lead.score}%
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {lead.email}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {lead.phone}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Last contact: {new Date(lead.lastContact).toLocaleDateString()}
                    </p>
                    {lead.designation && (
                      <p className="text-sm text-gray-500 flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {lead.designation}
                      </p>
                    )}
                  </div>
                  <div className="lg:col-span-2">
                    <div className="flex flex-col h-full">
                      <div className="mb-2">
                        <p className="text-sm font-medium">Notes:</p>
                        <p className="text-sm text-gray-600">{lead.notes || "No notes available"}</p>
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2">
                        <Button size="sm" onClick={() => handleContactClick("Phone", lead)}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleContactClick("Email", lead)}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleContactClick("Meeting", lead)}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                        
                        {/* Multi-channel follow-up options */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              More Options
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleContactClick("WhatsApp", lead)}>
                              <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
                              WhatsApp
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleContactClick("Slack", lead)}>
                              <Slack className="h-4 w-4 mr-2 text-purple-500" />
                              Slack
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleContactClick("SMS", lead)}>
                              <Send className="h-4 w-4 mr-2 text-blue-500" />
                              SMS
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
