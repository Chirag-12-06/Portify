// import { generateProjectDocument } from "./document.service.js";

// const project = await generateProjectDocument("cms04tssu0000thno1vofe6p2");

// console.dir(project, { depth: null });



import { indexProjectDocument } from "./document.service.js";

const document = await indexProjectDocument("cms04tssu0000thno1vofe6p2");

console.dir(document, { depth: null });