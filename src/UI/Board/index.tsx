type Children = { children: React.ReactNode };

type BoardProps = { letters: string[], size: number };
export default function Board({ letters, size }: BoardProps) {
  const letterSize = `${90 / size}vmin`;

  const rows = [];
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
