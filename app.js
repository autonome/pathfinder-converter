import {Component, render, html, useState, useEffect} from './uland-esm.js';

const labels = [
  'startTime',
  'speakers',
  'title',
  'description'
];

// TODO: system linebreak
// TODO: support linebreaks between entries
const separated2toml = (input, colDelimiter) => {

  // break by empty line between entries
  // with as few redundant loops
  // or temp strings as possible
  return input.split('\n')
    //console.log('split', rows)

    // trim each row
    // and split by tab into array of cols
    .map(

      // split by tab into array of cols
      (line) => line.trim().split(colDelimiter)

        // stringify entry into toml line
        .map((col, i) => `${labels[i]}="${col}"`)

          // join each entry into one section of toml string
          .join('\n')
    )

    // join entries, separated by empty line
    .join('\n\n');
};

const Textarea = Component((initialState) => {
  const [text, setText] = useState(initialState);
  return html`
  <textarea onkeyup=${() => setText(event.target.value)}>
    ${text}
  </textarea>`;
});

const Textareas = Component((initialState) => {
  const [text, setText] = useState(initialState);
  const toml = separated2toml(text, '\t');
  return html`
  <textarea onkeyup=${() => setText(event.target.value)}>
    ${text}
  </textarea>
  <textarea>
    ${toml}
  </textarea>`;
});

const testTabInput = `9:00 AM	speaker1	title	description
10:00 AM	speaker2	title	description
11:00 AM	speaker3	title	description`;

// render components within an element
render(document.body, html`
  <h3>Copy and paste Google sheet spreadsheet rows (which default to tab-delimited), assuming a column order of startTime, speakers, title, description</h3>
  ${Textareas(testTabInput)}
`);
