import { AppRouter } from "@core/router/AppRouter";
import { Toaster } from "sonner";


export default function App() {

  return <>
    <AppRouter />
    <Toaster position="top-center"/>
  </>

}

