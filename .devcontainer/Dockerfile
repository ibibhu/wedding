FROM node:22

# Install basic development tools
RUN apt update && apt install -y less git procps

# Ensure default node user has access to "node_modules"
ARG USERNAME=node
RUN mkdir -p /home/$USERNAME/.npm && \
    chown -R $USERNAME:$USERNAME /home/$USERNAME/.npm

# Set up working directory
WORKDIR /workspace

# Install global packages
RUN npm install -g @nuxt/cli

# Switch to non-root user
USER $USERNAME