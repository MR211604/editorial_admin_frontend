import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routers/AppRouter";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AppRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
