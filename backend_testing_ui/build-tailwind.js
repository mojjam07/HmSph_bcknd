import fs from 'fs';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const inputCssPath = './src/index.css';
const outputCssPath = './dist/output.css';

async function buildTailwind() {
  try {
    const css = fs.readFileSync(inputCssPath, 'utf8');
    const result = await postcss([tailwindcss, autoprefixer]).process(css, { from: inputCssPath, to: outputCssPath });
    fs.mkdirSync('./dist', { recursive: true });
    fs.writeFileSync(outputCssPath, result.css);
    if (result.map) {
      fs.writeFileSync(outputCssPath + '.map', result.map.toString());
    }
    console.log('Tailwind CSS built successfully.');
  } catch (error) {
    console.error('Error building Tailwind CSS:', error);
  }
}

buildTailwind();
