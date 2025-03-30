
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [vapiKey, setVapiKey] = useState("");
  const [openAIKey, setOpenAIKey] = useState("");
  const [enableAIInsights, setEnableAIInsights] = useState(true);
  const [enableCallRecording, setEnableCallRecording] = useState(true);
  const { toast } = useToast();

  const handleSaveAPISettings = () => {
    toast({
      title: "Settings saved",
      description: "Your API settings have been updated successfully.",
    });
  };

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your basic application settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-md font-medium">Features</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-insights">AI-Powered Insights</Label>
                    <p className="text-sm text-gray-500">
                      Enable AI analysis of call recordings
                    </p>
                  </div>
                  <Switch
                    id="ai-insights"
                    checked={enableAIInsights}
                    onCheckedChange={setEnableAIInsights}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="call-recording">Call Recording</Label>
                    <p className="text-sm text-gray-500">
                      Automatically record and store calls
                    </p>
                  </div>
                  <Switch
                    id="call-recording"
                    checked={enableCallRecording}
                    onCheckedChange={setEnableCallRecording}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-md font-medium">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive updates about new calls and leads
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="slack-notifications">Slack Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send notifications to connected Slack channels
                    </p>
                  </div>
                  <Switch id="slack-notifications" />
                </div>
              </div>
              
              <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>
                Add your API keys to connect with external services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="vapi-key">VAPI API Key</Label>
                <Input
                  id="vapi-key"
                  type="password"
                  placeholder="Enter your VAPI API key"
                  value={vapiKey}
                  onChange={(e) => setVapiKey(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Used to fetch call recordings and transcripts
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="Enter your OpenAI API key"
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Used for AI-powered call analysis and insights
                </p>
              </div>
              
              <Button onClick={handleSaveAPISettings}>Save API Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage team members and their access levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                User management will be available in the next version.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect with other tools and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Integration settings will be available in the next version.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
