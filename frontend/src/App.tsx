import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
