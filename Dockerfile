FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main cmd/mrp/main.go

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
COPY --from=builder /app/ui/dist ./ui/dist
EXPOSE 8080
CMD ["./main"]
