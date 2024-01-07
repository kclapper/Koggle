type Children = { children: React.ReactNode };

export default function Board({ letters, size }: { letters: string[], size: number }) {
  const letterSize = `${90 / size}vmin`;

  let rows = [];
  let currentRow = [];

  for (let i = 0; i < letters.length; i++ ) {
    currentRow.push(<Letter size={ letterSize } key={ i }>{ letters[i] }</Letter>)

    if ((i + 1) % size === 0) {
        rows.push(
            <Row key={ "row " + (i / size) }>
                { currentRow }
            </Row>
        );
        currentRow = [];
    }
  }

  return (
    <>
      { rows }
    </>
  ) 
}

function Row({ children }: Children) {
  return <div className="d-flex flex-row justify-content-center">
           { children }
         </div>
}

type LetterProps = { size: string, children: React.ReactNode }
function Letter({ size, children }: LetterProps): React.JSX.Element {
  const maxSize = "100px"
  return (
    <div className="d-flex flex-column border rounded"
         style={{ height: size,
                  width: size,
                  maxHeight: maxSize,
                  maxWidth: maxSize}}>
      <h2 className="display-2 text-center my-auto">
        { children }
      </h2>
    </div>
  )
}
