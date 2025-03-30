
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  MessageSquare, 
  Paperclip, 
  Send
} from "lucide-react";
import { EmailThread, EmailMessage } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface EmailThreadPanelProps {
  emailThreads: EmailThread[];
  leadEmail: string;
  onSendEmail: (subject: string, body: string) => void;
}

export function EmailThreadPanel({ emailThreads, leadEmail, onSendEmail }: EmailThreadPanelProps) {
  const [activeThread, setActiveThread] = useState<EmailThread | null>(null);
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleSendEmail = () => {
    if (!newSubject.trim() || !newMessage.trim()) {
      toast({
        title: "Error",
        description: "Subject and message body are required",
        variant: "destructive",
      });
      return;
    }
    
    onSendEmail(newSubject, newMessage);
    setNewSubject("");
    setNewMessage("");
    
    toast({
      title: "Email sent",
      description: `Your message has been sent to ${leadEmail}`,
    });
  };

  if (emailThreads.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Email Communication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">No email threads found for this lead</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Start Email Thread
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>New Email</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To:</label>
                    <Input type="email" value={leadEmail} disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject:</label>
                    <Input 
                      placeholder="Enter email subject" 
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message:</label>
                    <Textarea 
                      placeholder="Type your message here..." 
                      rows={6}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSendEmail}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Email Communication
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Email Threads</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  New Email
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>New Email</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To:</label>
                    <Input type="email" value={leadEmail} disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject:</label>
                    <Input 
                      placeholder="Enter email subject" 
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message:</label>
                    <Textarea 
                      placeholder="Type your message here..." 
                      rows={6}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSendEmail}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-3">
            {emailThreads.map((thread) => (
              <Card key={thread.id} className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-3" onClick={() => setActiveThread(thread)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{thread.subject}</h4>
                      <p className="text-xs text-gray-500">
                        {thread.messages.length} messages • Last updated {formatDistanceToNow(new Date(thread.lastMessageDate))} ago
                      </p>
                    </div>
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {activeThread && (
            <div className="mt-4 border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">{activeThread.subject}</h4>
                <Button size="sm" variant="outline" onClick={() => setActiveThread(null)}>
                  Close Thread
                </Button>
              </div>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {activeThread.messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-3 rounded-lg ${
                      message.sender === leadEmail ? 'bg-gray-100 ml-8' : 'bg-blue-50 mr-8'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium">
                        {message.sender === leadEmail ? 'Lead' : 'You'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(message.date).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.body}</p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2">
                        {message.attachments.map((attachment, idx) => (
                          <div key={idx} className="flex items-center text-blue-600 text-xs">
                            <Paperclip className="h-3 w-3 mr-1" />
                            {attachment}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Textarea 
                  placeholder={`Reply to "${activeThread.subject}"...`}
                  className="mb-2"
                  rows={3}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={() => {
                    onSendEmail(activeThread.subject, newMessage);
                    setNewMessage("");
                    
                    toast({
                      title: "Reply sent",
                      description: `Your reply has been sent to ${leadEmail}`,
                    });
                  }}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
