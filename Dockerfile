# Build stage
FROM node:22 AS build

# Install necessary tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app
# Copy package.json and pnpm-lock.yaml files to the working directory
COPY ./package.json /app/
# COPY ./pnpm-lock.yaml /app/
# Only copy 'file.txt' if it exists
RUN if [ -f "pnpm-lock.yaml" ]; then cp pnpm-lock.yaml /app/; fi

# Install global Quasar CLI and project dependencies
RUN npm install @quasar/cli -g
RUN npm install -g pnpm@latest 
## Install dependencies
RUN pnpm install --shamefully-hoist --ignore-scripts

# Copy the rest of the application files to the working directory
COPY . ./
RUN pnpm postinstall
RUN pnpm build
# RUN quasar build -m ssr

# Production stage
FROM node:22-alpine

# Set timezone
ENV TZ=Asia/Bangkok
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install PM2
RUN npm install -g pm2

# Set environment to production
ENV NODE_ENV=production

# Use non-root user
USER node
WORKDIR /app

# Copy built artifacts with correct permissions
COPY --chown=node:node --from=build /app/dist/ssr /app
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/ecosystem.config.cjs /app

# Optional health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD wget -q -O /dev/null http://localhost:3000 || exit 1

# Use PM2 to run the application
CMD ["pm2-runtime", "ecosystem.config.cjs"]