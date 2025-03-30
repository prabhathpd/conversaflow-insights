
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Save, 
  User, 
  Building, 
  Briefcase, 
  DollarSign, 
  Tag,
  Edit
} from "lucide-react";
import { Lead } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface LeadDetailPanelProps {
  lead: Lead;
  onUpdateLead: (updatedLead: Partial<Lead>) => void;
}

export function LeadDetailPanel({ lead, onUpdateLead }: LeadDetailPanelProps) {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: lead.name,
    company: lead.company,
    industry: lead.industry || "",
    designation: lead.designation || "",
    projectValue: lead.projectValue || 0,
    notes: lead.notes || ""
  });
  const { toast } = useToast();

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === 0) return "Not specified";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const handleSave = () => {
    onUpdateLead({
      name: editData.name,
      company: editData.company,
      industry: editData.industry || undefined,
      designation: editData.designation || undefined,
      projectValue: parseInt(editData.projectValue.toString()) || 0,
      notes: editData.notes || undefined
    });
    
    setEditMode(false);
    
    toast({
      title: "Lead updated",
      description: "Lead details have been successfully updated",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <User className="mr-2 h-5 w-5" />
          Lead Details
        </CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Lead Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company" 
                    value={editData.company}
                    onChange={(e) => setEditData({...editData, company: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input 
                    id="industry" 
                    value={editData.industry}
                    onChange={(e) => setEditData({...editData, industry: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input 
                    id="designation" 
                    value={editData.designation}
                    onChange={(e) => setEditData({...editData, designation: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectValue">Project Value ($)</Label>
                <Input 
                  id="projectValue" 
                  type="number"
                  min="0"
                  value={editData.projectValue}
                  onChange={(e) => setEditData({...editData, projectValue: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  rows={4}
                  value={editData.notes}
                  onChange={(e) => setEditData({...editData, notes: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 flex items-center mb-1">
                <User className="h-4 w-4 mr-1" />
                Name
              </p>
              <p className="font-medium">{lead.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center mb-1">
                <Building className="h-4 w-4 mr-1" />
                Company
              </p>
              <p className="font-medium">{lead.company}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 flex items-center mb-1">
                <Tag className="h-4 w-4 mr-1" />
                Industry
              </p>
              <p>{lead.industry || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center mb-1">
                <Briefcase className="h-4 w-4 mr-1" />
                Designation
              </p>
              <p>{lead.designation || "Not specified"}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 flex items-center mb-1">
              <DollarSign className="h-4 w-4 mr-1" />
              Project Value
            </p>
            <p className="font-medium text-green-600">{formatCurrency(lead.projectValue)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Notes</p>
            <p className="text-sm">{lead.notes || "No notes available"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
