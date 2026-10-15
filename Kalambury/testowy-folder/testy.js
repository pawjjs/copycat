import {readFile} from 'node:fs/promises'
import {writeFile} from 'node:fs/promises'

console.log("=== START TESTU ZAPISU I ODCZYTU ===");

const text = await readFile(
    './plik_tekstowy.txt',
    'utf8'
)
console.log(text);

writeFile(
    './result.txt',
    'Result of writeFile'
)

console.log('Done')