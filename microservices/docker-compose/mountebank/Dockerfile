FROM node:alpine

ENV MOUNTEBANK_VERSION=2.9.1

RUN apk add --update nodejs-lts && \
    apk add --update npm
RUN npm install -g mountebank@${MOUNTEBANK_VERSION}
RUN npm install -g mb-graphql

COPY protocols.json .

EXPOSE 2525

ENTRYPOINT ["mb"]

CMD ["start"]