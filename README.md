# chainlit-openai-demo-app

This repository is a demo application using Chainlit and OpenAI API Key, running with Docker Compose.

## Overview

A basic project demonstrating how to integrate the Chainlit framework with the OpenAI API. It includes setup, making API calls, and handling responses within a Docker container using Docker Compose.

## Requirements

- Docker
- Docker Compose
- OpenAI API key

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/chainlit-openai-demo-app.git
    cd chainlit-openai-demo-app
    ```

2. Create a `.env` file and set your OpenAI API key:

    ```env
    OPENAI_API_KEY=your_openai_api_key
    ```

## Usage

1. Start the application with Docker Compose:

    ```bash
    docker-compose up
    ```

2. The application will be available at `http://localhost:8000`.

## License

This project is licensed under the MIT License.

## Author

Masanori Ishio
