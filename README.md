<h1 align="center">Blog Frontend</h1>

Web application to interact with the Blog API and handle certain data.

# Setting the project up

## CLI

Clone this repository and execute:

```bash
npm install

npm start
```

## Docker

Run the existing image by executing:

```bash
docker pull viniciusvviterbo/blog_frontend:latest

docker run \
    -d \
    --rm \
    -p 4444:4444 \
    --name blog_frontend \
    --link blog_backend:blog_api \
    viniciusvviterbo/blog_frontend:latest

```

or build your own image by cloning this repository and executing:

```bash
docker build -t viniciusvviterbo/blog_frontend:latest .

docker run \
    -d \
    --rm \
    -p 4444:4444 \
    --name blog_frontend \
    --link blog_backend:blog_api \
    viniciusvviterbo/blog_frontend:latest
```

# Usage

The application is now accessible at `http://localhost:4444`. Feel free to browse it.

---

**[GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html)**




docker run \
    -d \
    --rm \
    -p 4444:4444 \
    --name blog_frontend \
    --link blog_backend:blog_api \
    viniciusvviterbo/blog_frontend:latest