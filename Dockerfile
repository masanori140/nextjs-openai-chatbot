FROM python:3.12-slim as python-base

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

ENV PIP_NO_CACHE_DIR=off
ENV PIP_DISABLE_PIP_VERSION_CHECK=on
ENV PIP_DEFAULT_TIMEOUT=100

ENV POETRY_VERSION=1.7.0
ENV POETRY_HOME="/opt/poetry"
ENV POETRY_VIRTUALENVS_CREATE=false

ENV PYSETUP_PATH="/opt/pysetup"
ENV PATH="$POETRY_HOME/bin:$PATH"

FROM python-base as initial
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    curl \
    build-essential

RUN curl -sSL https://install.python-poetry.org | python3 -

WORKDIR $PYSETUP_PATH

FROM initial as development-base
ENV POETRY_NO_INTERACTION=1
COPY poetry.lock pyproject.toml ./

FROM development-base as development
RUN poetry install

WORKDIR /app

FROM development-base as builder-base
RUN poetry install --only main

FROM python-base as production
COPY --from=builder-base /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY ./.chainlit /app/.chainlit
COPY ./demo_app /app/demo_app
COPY ./chainlit.toml /app/chainlit.toml
WORKDIR /app
