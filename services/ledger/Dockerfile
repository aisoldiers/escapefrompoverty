FROM golang:1.22-alpine
WORKDIR /app
COPY . .
RUN go build -o ledger ./...
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
