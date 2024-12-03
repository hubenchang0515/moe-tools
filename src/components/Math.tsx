import ReactDOMServer from 'react-dom/server';

export function Root(base:any, index:any) {
    const b = base ? ReactDOMServer.renderToStaticMarkup(base) : '0';
    const i = ReactDOMServer.renderToStaticMarkup(index);
    const ml = `<math xmlns='http://www.w3.org/1998/Math/MathML'> <mroot> <mi> ${b} </mi>  <mn> ${i} </mn> </mroot> </math>`;
    return <span dangerouslySetInnerHTML={{__html: ml}}/>
}