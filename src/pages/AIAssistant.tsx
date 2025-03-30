
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User, Zap } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hi there! I'm your AI Sales Assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responses = [
        "Based on the call analytics, I recommend focusing on the technical benefits when talking to this lead.",
        "Looking at the data, this lead shows high interest in the cost-saving aspects of our solution.",
        "This lead's engagement pattern suggests they're comparing multiple solutions. I recommend highlighting our unique features.",
        "The sentiment analysis from the last call indicates some hesitation about implementation complexity. Consider addressing this in your next conversation.",
        "Based on similar customers, this lead might be interested in our enterprise package. Would you like me to draft a personalized proposal?",
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Sales Assistant</h1>
        <p className="text-muted-foreground">
          Get real-time help and insights from your AI assistant
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-220px)]">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg flex items-center">
                <Bot className="mr-2 h-5 w-5 text-app-blue" />
                ConversaFlow Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-[calc(100%-65px)]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-start max-w-[80%]">
                      {message.sender === "assistant" && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-app-blue text-white">AI</AvatarFallback>
                          <AvatarImage src="/placeholder.svg" />
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-app-blue text-white"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 ml-2">
                          <AvatarFallback className="bg-gray-500">ME</AvatarFallback>
                          <AvatarImage src="/placeholder.svg" />
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2">
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                  />
                  <Button onClick={handleSend} disabled={isLoading || !inputValue.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-[calc(100vh-220px)]">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg flex items-center">
                <Zap className="mr-2 h-5 w-5 text-app-purple-dark" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setInputValue("Help me prepare for my call with TechCorp Inc.");
                  }}
                >
                  Help me prepare for a call
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setInputValue("Analyze the sentiment from my last call with Financial Services LLC");
                  }}
                >
                  Analyze call sentiment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setInputValue("Draft a follow-up email to DevOps Pro");
                  }}
                >
                  Draft a follow-up email
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setInputValue("Suggest objection handling for pricing concerns");
                  }}
                >
                  Objection handling tips
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setInputValue("Summarize today's calls and insights");
                  }}
                >
                  Summarize today's insights
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
