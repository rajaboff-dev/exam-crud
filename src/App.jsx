import Dashboard from "./pages/Dashboard.jsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {Toaster} from "sonner";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='bg-slate-50'>
        <Dashboard/>
        <Toaster richColors={true} position={'top-right'}  />
      </div>
    </QueryClientProvider>
  )
}

export default App
