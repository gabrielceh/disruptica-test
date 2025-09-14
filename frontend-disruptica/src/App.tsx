import { HeroUIProvider } from '@heroui/react';
import { useNavigate } from 'react-router';
import { AppRouter } from "@core/router/AppRouter";


export default function App() {
  const navigate = useNavigate();

  return <HeroUIProvider navigate={navigate}>
          <AppRouter />
        </HeroUIProvider>
}

