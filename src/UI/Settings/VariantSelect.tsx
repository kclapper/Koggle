import { useCallback } from "react";

import Form from "react-bootstrap/Form";

import { BoggleVariant } from "../../util";

type VariantSelectProps = { value: BoggleVariant, onChange: (newVariant: BoggleVariant) => void};
export function VariantSelect({ value, onChange}: VariantSelectProps) {

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.currentTarget.value as BoggleVariant); 
  }, [onChange]);

  return (
    <div>
        <p>Select Boggle Variant:</p>
        <Form.Select aria-label={ value } 
                    onChange={ handleChange }
                    value={ value }>
          <VariantOption value={ "4x4" }>Boggle (4 x 4)</VariantOption>
          <VariantOption value={ "5x5" }>Big Boggle (5 x 5)</VariantOption>
          <VariantOption value={ "Es" }>Oops all E's</VariantOption>
        </Form.Select>
    </div>
  )
}

type VariantOptionProps = { value: BoggleVariant, children: React.ReactNode };
function VariantOption({ value, children }: VariantOptionProps) {
  return <option value={ value }>{ children }</option>
}
