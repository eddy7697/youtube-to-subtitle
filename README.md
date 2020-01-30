```
docker build . -t youtube-to-subtitle

docker run -d -p 80:3000 -it --name youtube-to-subtitle youtube-to-subtitle

```