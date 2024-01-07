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
                Boggle
              </h1>

              <Boggle variant={ variant } />

              <div className="text-end mt-4 mb-4 fst-italic fs-6 w-75">
                - Love Kyle
              </div>
            </PageContent>
         </StrictMode>;
}

createRoot(document.getElementById('app')).render(<Home />);
