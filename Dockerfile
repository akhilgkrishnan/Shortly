# syntax=docker/dockerfile:1
FROM docker.io/library/ruby:3.2-slim AS base

WORKDIR /rails

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test" \
    NODE_ENV="production" \
    NODE_OPTIONS="--openssl-legacy-provider"

# Install runtime dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      curl \
      libpq-dev \
      libsqlite3-0 \
      sqlite3 \
      ca-certificates && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Build stage to install gems and compile frontend assets
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      git \
      libsqlite3-dev \
      pkg-config && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install --no-install-recommends -y nodejs && \
    npm install -g yarn && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# Install node dependencies
COPY package.json yarn.lock ./
RUN yarn install --check-files --production=false --ignore-scripts

# Copy application source
COPY . .

# Precompile assets (Webpack + Tailwind CSS)
RUN SECRET_KEY_BASE=dummy_key_for_precompile_assets bundle exec rails assets:precompile

# Final runtime image
FROM base

COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Run as non-root user for security
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER 1000:1000

ENTRYPOINT ["bin/docker-entrypoint"]

EXPOSE 3000

CMD ["bin/rails", "server", "-b", "0.0.0.0"]
