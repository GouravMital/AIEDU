import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "./pages/Dashboard";
import GeneratedContent from "./pages/GeneratedContent";
import Library from "./pages/Library";
import Sidebar from "./components/Sidebar";
import MobileSidebarToggle from "./components/MobileSidebarToggle";
import { useSidebar } from "./contexts/SidebarContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/generated-content" component={GeneratedContent} />
      <Route path="/library" component={Library} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isOpen } = useSidebar();
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 pb-16">
          <Router />
        </main>
        <MobileSidebarToggle />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
