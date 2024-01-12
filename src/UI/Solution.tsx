type SolutionProps = { show: boolean, solution?: string[] };
export default function Solution({ show, solution }: SolutionProps) {
    if (!show || solution === undefined) {
        return <div></div>;
    }

    const words = [];
    for (const word of solution) {
        words.push(
            <div key={ word } className='p-2'>
                { word }
            </div>
        );
    }

    return (
        <div className="mt-4">
            <h6 className="display-6 text-center">Possible Words: { solution.length }</h6>
            <div className="text-center mb-2">
                <a href="https://scrabble.merriam.com/" target="_blank" className="text-decoration-none text-center">
                    Official Scrabble Dictionary
                </a>
            </div>
            <div className="d-flex flex-wrap">
                { words }
            </div>
        </div>
    )
}