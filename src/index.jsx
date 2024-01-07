import { StrictMode, useState, useCallback } from "react";
import { createRoot } from 'react-dom/client';

import "bootstrap/scss/bootstrap.scss";

import PageContent from './components/PageContent';
import { defaultSettings, Settings } from './components/Settings';

import { Boggle } from './Boggle';

export default function Home() {
  const [variant, setVariant] = useState(defaultSettings.variant);

  const handleChange = useCallback((newSettings) => {
    setVariant(newSettings.variant);
  }, [setVariant]);

  return <StrictMode>
            <PageContent>
              <Settings onChange={handleChange} />

              <h1 className="display-1 text-center mb-2">
                Koggle
              </h1>

              <Boggle variant={ variant } />
            </PageContent>
         </StrictMode>;
}

createRoot(document.getElementById('app')).render(<Home />);
