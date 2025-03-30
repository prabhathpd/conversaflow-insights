
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  Bell,
  Plus,
  Calendar as CalendarIcon
} from "lucide-react";
import { format } from "date-fns";
import { FollowUp, NotificationType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface FollowUpPanelProps {
  followUps: FollowUp[];
  onCreateFollowUp: (type: NotificationType, dueDate: string, notes: string) => void;
  onCompleteFollowUp: (id: string) => void;
}

export function FollowUpPanel({ followUps, onCreateFollowUp, onCompleteFollowUp }: FollowUpPanelProps) {
  const [newType, setNewType] = useState<NotificationType>("call");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const { toast } = useToast();

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "sms": return <MessageSquare className="h-4 w-4" />;
      case "meeting": return <Calendar className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getLabelForType = (type: NotificationType) => {
    switch (type) {
      case "call": return "Call";
      case "email": return "Email";
      case "sms": return "SMS";
      case "meeting": return "Meeting";
      default: return "Other";
    }
  };

  const handleCreateFollowUp = () => {
    if (!newDate || !newTime || !newNotes) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    const dueDate = `${newDate}T${newTime}:00`;
    onCreateFollowUp(newType, dueDate, newNotes);
    
    // Reset form
    setNewType("call");
    setNewDate("");
    setNewTime("");
    setNewNotes("");
    
    toast({
      title: "Follow-up created",
      description: `Follow-up scheduled for ${format(new Date(dueDate), "PPpp")}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Follow-ups & Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Scheduled Follow-ups</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Follow-up
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schedule Follow-up</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type:</label>
                    <div className="flex gap-2">
                      {(["call", "email", "meeting", "sms", "other"] as NotificationType[]).map((type) => (
                        <Button 
                          key={type}
                          variant={newType === type ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setNewType(type)}
                          className="flex-1"
                        >
                          {getIconForType(type)}
                          <span className="ml-2">{getLabelForType(type)}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date:</label>
                      <Input 
                        type="date" 
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time:</label>
                      <Input 
                        type="time" 
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes:</label>
                    <Textarea 
                      placeholder="What do you need to follow up about?" 
                      rows={3}
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateFollowUp}>
                    Schedule Follow-up
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {followUps.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No follow-ups scheduled</p>
            </div>
          ) : (
            <div className="space-y-3">
              {followUps.map((followUp) => {
                const isPast = new Date(followUp.dueDate) < new Date();
                const isToday = format(new Date(followUp.dueDate), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                
                return (
                  <div 
                    key={followUp.id} 
                    className={`border rounded-md p-3 ${
                      followUp.completed 
                        ? 'bg-gray-50 border-gray-200' 
                        : isPast 
                        ? 'bg-red-50 border-red-200' 
                        : isToday 
                        ? 'bg-yellow-50 border-yellow-200' 
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div>
                          {followUp.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            getIconForType(followUp.type)
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={followUp.completed ? "outline" : "default"}>
                              {getLabelForType(followUp.type)}
                            </Badge>
                            <span className="text-xs flex items-center text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {format(new Date(followUp.dueDate), "PPp")}
                            </span>
                          </div>
                          <p className={`mt-1 text-sm ${followUp.completed ? 'line-through text-gray-500' : ''}`}>
                            {followUp.notes}
                          </p>
                        </div>
                      </div>
                      
                      {!followUp.completed && (
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <Checkbox 
                              id={`complete-${followUp.id}`}
                              checked={followUp.completed}
                              onCheckedChange={() => onCompleteFollowUp(followUp.id)}
                            />
                            <label 
                              htmlFor={`complete-${followUp.id}`}
                              className="ml-2 text-xs font-medium cursor-pointer"
                            >
                              Mark Complete
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {followUp.notificationSent && (
                      <div className="mt-2 text-xs flex items-center text-gray-500">
                        <Bell className="h-3 w-3 mr-1 text-blue-500" />
                        Notification sent
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
