# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# ARG NEXT_PUBLIC_REST_API_URL
# ARG NEXT_PUBLIC_GRAPHQL_API_URL
# ARG NEXT_PUBLIC_MAP_API_KEY
# ARG NEXT_PUBLIC_SENTRY_AUTH_TOKEN

# ENV NEXT_PUBLIC_REST_API_URL=${NEXT_PUBLIC_REST_API_URL}
# ENV NEXT_PUBLIC_GRAPHQL_API_URL=${NEXT_PUBLIC_GRAPHQL_API_URL}
# ENV NEXT_PUBLIC_MAP_API_KEY=${NEXT_PUBLIC_MAP_API_KEY}
# ENV NEXT_PUBLIC_SENTRY_AUTH_TOKEN=${NEXT_PUBLIC_SENTRY_AUTH_TOKEN}

# EXPOSE 3000

# CMD [ "npm", "run", "start" ]

# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:18-alpine AS PRODUCTION

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ARG NEXT_PUBLIC_REST_API_URL
ARG NEXT_PUBLIC_GRAPHQL_API_URL
ARG NEXT_PUBLIC_MAP_API_KEY
ARG NEXT_PUBLIC_SENTRY_AUTH_TOKEN
ENV NEXT_PUBLIC_REST_API_URL=${NEXT_PUBLIC_REST_API_URL}
ENV NEXT_PUBLIC_GRAPHQL_API_URL=${NEXT_PUBLIC_GRAPHQL_API_URL}
ENV NEXT_PUBLIC_MAP_API_KEY=${NEXT_PUBLIC_MAP_API_KEY}
ENV NEXT_PUBLIC_SENTRY_AUTH_TOKEN=${NEXT_PUBLIC_SENTRY_AUTH_TOKEN}

EXPOSE 3000

CMD ["npm", "run", "start"]




