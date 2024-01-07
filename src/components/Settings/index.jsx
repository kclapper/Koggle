import React from 'react';
import { useState, useCallback } from 'react';

import bootstrapIcons from 'bootstrap-icons/bootstrap-icons.svg';
import Form from 'react-bootstrap/Form';
import OffCanvas from 'react-bootstrap/Offcanvas';

export const defaultSettings = {
  variant: "4x4"
}

export function Settings({ onChange }) {
  let [settings, setSettings] = useState(defaultSettings);

  const changeSettings = useCallback((newSettings) => {
    setSettings(newSettings);
    if (onChange) {
      onChange(newSettings);
    }
  }, [onChange, setSettings]);

  const handleVariant = useCallback((event) => {
    settings.variant = event.target.value;
    changeSettings(settings);
  }, [settings, changeSettings]);

  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  return (
    <div className="fixed-top d-flex flex-row p-2 pr-4">
      <div className="flex-grow-1" />
      <button onClick={toggleOpen} className="btn" type="button">
        <svg className='bi' width='24' height='24' fill='grey' >
          <use href={ bootstrapIcons + '#gear-wide-connected' }/>
        </svg>
      </button>

      <OffCanvas placement="end" show={open} onHide={toggleOpen}>
        <OffCanvas.Header closeButton>
          Boggle Settings
        </OffCanvas.Header>
        <OffCanvas.Body>
          <div>
              <p>Select Boggle Variant:</p>
              <Form.Select aria-label={ settings.variant } 
                           onChange={ handleVariant }
                           value={ settings.variant }>
                <option value="4x4">Boggle (4 x 4)</option>
                <option value="5x5">Big Boggle (5 x 5)</option>
              </Form.Select>
          </div>
        </OffCanvas.Body>
      </OffCanvas>
    </div>
  )
}