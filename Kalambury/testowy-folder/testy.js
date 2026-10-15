import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { writeFile } from 'node:fs/promises'

const server = createServer(async (request, response) =>
{
    console.log(
        request.method,
        request.url
    )

    if (request.url === '/read')
    {
        const text = await readFile('./plik_tekstowy.txt', 'utf8')
        response.end(text)
    }
    else if (request.url === '/write')
    {
        await writeFile('./result.txt', 'Result of writeFile')
        response.end('Zapisano plik')
    }
    else
    {
        response.statusCode = 404
        response.end('Nie znaleziono endpointu')
    }
})

server.listen(3000)