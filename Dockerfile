FROM wernight/phantomjs:2.1.1

COPY proxy.js .

EXPOSE 8080
ENTRYPOINT [ "phantomjs", "proxy.js" ]