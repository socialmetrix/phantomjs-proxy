# Phantomjs Proxy
Simple html render for single page applications

## How it works
Every `GET` request to this server will be done on the specified `url` and returned to the caller when fully rendered.

## Usage

#### Single docker engine
```
docker run --rm -d \
  -p 8080:8080 \
  socialmetrix/phantomjs-proxy <url>
```

#### Docker swarm mode
```
docker service create \
    --restart-condition any \
    --name phantomjs-proxy \
    socialmetrix/phantomjs-proxy <url>
```

- The url must NOT end with "/".
- Every request will be made to `url` using the same path, query string and hash as the original request.

## Build
```
docker build -t phantomjs-proxy:$VERSION .
```

## License
Apache License Version 2.0