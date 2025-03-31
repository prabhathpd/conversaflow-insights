
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const setupApiKey = () => {
    // Set the VAPI API key in localStorage
    localStorage.setItem("vapiApiKey", "5d11e062-e323-4f45-96e7-3d9035e41fa8");
    
    // Show success message
    toast({
      title: "VAPI API Key Set Up",
      description: "The VAPI public API key has been automatically configured.",
    });
    
    // Navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to ConversaFlow</h1>
        <p className="text-xl text-gray-600 mb-4">AI-powered Call Analytics & Lead Management Dashboard</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/dashboard">
              Enter Dashboard
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={setupApiKey}
          >
            Auto-Configure API Key
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          Click "Auto-Configure API Key" to automatically set up the demo VAPI integration
        </p>
      </div>
    </div>
  );
};

export default Index;
