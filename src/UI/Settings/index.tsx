import React from 'react';
import { useState, useCallback } from 'react';

import OffCanvas from 'react-bootstrap/Offcanvas';
const gearIconURL = new URL("../../../node_modules/bootstrap-icons/bootstrap-icons.svg", import.meta.url);

import { BoggleVariant, Settings } from '../../settings/Settings';

import { VariantSelect } from './VariantSelect';

type SettingsProps = { currentSettings: Settings, onChange: (newSettings: Settings) => void }
export default function Settings({ currentSettings, onChange }: SettingsProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const handleVariant = useCallback((newVariant: BoggleVariant) => {
    currentSettings.variant = newVariant;
    onChange(currentSettings);
  }, [currentSettings, onChange]);

  return (
    <div className="fixed-top d-flex flex-row p-2 pr-4">
      <div className="flex-grow-1" />
      <button onClick={toggleOpen} className="btn" type="button">
        <svg className='bi' width='24' height='24' fill='grey' >
          <use href={ gearIconURL + '#gear-wide-connected' }/>
        </svg>
      </button>

      <OffCanvas placement="end" show={open} onHide={toggleOpen}>
        <OffCanvas.Header closeButton>
          Boggle Settings
        </OffCanvas.Header>
        <OffCanvas.Body>
          <VariantSelect value={ currentSettings.variant } onChange={ handleVariant } />
        </OffCanvas.Body>
      </OffCanvas>
    </div>
  )
}