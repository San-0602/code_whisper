FROM node:20-slim

# Security: run as non-root
RUN useradd -m runner
USER runner
WORKDIR /home/runner

CMD ["node", "-e", "console.log('Ready')"]
