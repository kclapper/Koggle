import { StrictMode, useState, useCallback } from "react";
import { createRoot } from 'react-dom/client';

import "bootstrap/scss/bootstrap.scss";

import { BoggleSettings, BoggleVariant } from '../settings/Settings';

import PageContent from '../UI/PageContent';
import Settings from '../UI/Settings';

import { Boggle } from '../Boggle';

export default function Home() {
  const [variant, setVariant] = useState<BoggleVariant>("4x4");

  const handleChange = useCallback((newSettings: BoggleSettings) => {
    setVariant(newSettings.variant);
  }, [setVariant]);

  return <StrictMode>
            <PageContent>
              <Settings currentSettings={{ variant: variant }} onChange={handleChange} />

              <h1 className="display-1 text-center mb-2">
                Koggle
              </h1>

              <Boggle variant={ variant } />
            </PageContent>
         </StrictMode>;
}

createRoot(document.getElementById('app')!).render(<Home />);
