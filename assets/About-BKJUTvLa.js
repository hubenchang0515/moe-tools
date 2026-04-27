import{u as n,r as o,j as e}from"./index-N0iBfFQl.js";import{M as s}from"./Markdown-B2z5JwCz.js";import{C as m}from"./Container-Cp8dlJTK.js";import"./index-f086V9W7.js";import"./Chip-CVtje9O3.js";import"./Link-X-H7A3pJ.js";import"./Alert-DquRjgJq.js";import"./useSlot-D4-e8QoW.js";import"./Close-CxkhF6lv.js";import"./TableRow-BACUWYg6.js";import"./useThemeProps-Cll55PNR.js";const a=`# About

[moe-tools](https://github.com/hubenchang0515/moe-tools) is a versatile online toolset with [AGPL](https://github.com/hubenchang0515/moe-tools/blob/master/LICENSE).

## Dependencies

| Name                        | Author                                                               | License type | Link                                                                |
| :-------------------------- | :------------------------------------------------------------------- | :----------- | :------------------------------------------------------------------ |
| @emotion/react              | Emotion Contributors                                                 | MIT          | git+https://github.com/emotion-js/emotion.git#main                  |
| @emotion/styled             | n/a                                                                  | MIT          | git+https://github.com/emotion-js/emotion.git#main                  |
| @fontsource/roboto          | Google Inc.                                                          | Apache-2.0   | git+https://github.com/fontsource/font-files.git                    |
| @mui/icons-material         | MUI Team                                                             | MIT          | git+https://github.com/mui/material-ui.git                          |
| @mui/material               | MUI Team                                                             | MIT          | git+https://github.com/mui/material-ui.git                          |
| @types/css-modules          | n/a                                                                  | MIT          | https://github.com/DefinitelyTyped/DefinitelyTyped.git              |
| gh-pages                    | Tim Schaub http://tschaub.net/                                       | MIT          | git://github.com/tschaub/gh-pages.git                               |
| highlight.js                | Josh Goebel <hello@joshgoebel.com>                                   | BSD-3-Clause | git://github.com/highlightjs/highlight.js.git                       |
| html2canvas                 | Niklas von Hertzen niklasvh@gmail.com https://hertzen.com            | MIT          | git+ssh://git@github.com/niklasvh/html2canvas.git                   |
| i18next                     | Jan Mühlemann <jan.muehlemann@gmail.com> (https://github.com/jamuhl) | MIT          | git+https://github.com/i18next/i18next.git                          |
| marked                      | Christopher Jeffrey                                                  | MIT          | git://github.com/markedjs/marked.git                                |
| mime-types                  | n/a                                                                  | MIT          | git+https://github.com/jshttp/mime-types.git                        |
| ol                          | n/a                                                                  | BSD-2-Clause | git://github.com/openlayers/openlayers.git                          |
| react                       | n/a                                                                  | MIT          | git+https://github.com/facebook/react.git                           |
| react-dom                   | n/a                                                                  | MIT          | git+https://github.com/facebook/react.git                           |
| react-i18next               | Jan Mühlemann <jan.muehlemann@gmail.com> (https://github.com/jamuhl) | MIT          | git+https://github.com/i18next/react-i18next.git                    |
| react-router-dom            | Remix Software <hello@remix.run>                                     | MIT          | git+https://github.com/remix-run/react-router.git                   |
| streamsaver                 | Jimmy Wärting <jimmy@warting.se>                                     | MIT          | git+https://jimmywarting@github.com/jimmywarting/StreamSaver.js.git |
| @eslint/js                  | n/a                                                                  | MIT          | git+https://github.com/eslint/eslint.git                            |
| @types/mime-types           | n/a                                                                  | MIT          | https://github.com/DefinitelyTyped/DefinitelyTyped.git              |
| @types/react                | n/a                                                                  | MIT          | https://github.com/DefinitelyTyped/DefinitelyTyped.git              |
| @types/react-dom            | n/a                                                                  | MIT          | https://github.com/DefinitelyTyped/DefinitelyTyped.git              |
| @types/streamsaver          | n/a                                                                  | MIT          | https://github.com/DefinitelyTyped/DefinitelyTyped.git              |
| @vitejs/plugin-react        | Evan You                                                             | MIT          | git+https://github.com/vitejs/vite-plugin-react.git                 |
| eslint                      | Nicholas C. Zakas <nicholas+npm@nczconsulting.com>                   | MIT          | git+https://github.com/eslint/eslint.git                            |
| eslint-plugin-react-hooks   | n/a                                                                  | MIT          | git+https://github.com/facebook/react.git                           |
| eslint-plugin-react-refresh | Arnaud Barré (https://github.com/ArnaudBarre)                        | MIT          | git+https://github.com/ArnaudBarre/eslint-plugin-react-refresh.git  |
| globals                     | Sindre Sorhus sindresorhus@gmail.com https://sindresorhus.com        | MIT          | git+https://github.com/sindresorhus/globals.git                     |
| typescript                  | Microsoft Corp.                                                      | Apache-2.0   | git+https://github.com/microsoft/TypeScript.git                     |
| typescript-eslint           | n/a                                                                  | MIT          | git+https://github.com/typescript-eslint/typescript-eslint.git      |
| vite                        | Evan You                                                             | MIT          | git+https://github.com/vitejs/vite.git                              |
| vite-plugin-pwa             | antfu <anthonyfu117@hotmail.com>                                     | MIT          | git+https://github.com/vite-pwa/vite-plugin-pwa.git                 |
| vitest                      | Anthony Fu <anthonyfu117@hotmail.com>                                | MIT          | git+https://github.com:vitest-dev/vitest.git                        |

`;function d(){const{t}=n();return o.useEffect(()=>{var i;document.title=`${t("title")} - ${t("pages.about")}`,(i=document.querySelector('meta[name="description"]'))==null||i.setAttribute("content",t("description.base"))},[t]),e.jsx(m,{maxWidth:"xl",children:e.jsx(s,{text:a})})}export{d as default};
