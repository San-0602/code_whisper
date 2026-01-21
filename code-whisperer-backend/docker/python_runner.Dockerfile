FROM python:3.11-slim

# Security: run as non-root
RUN useradd -m runner
USER runner
WORKDIR /home/runner

# No network, read-only filesystem
# These are enforced by Docker run options

CMD ["python", "-c", "print('Ready')"]
