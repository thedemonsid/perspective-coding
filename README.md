# Code2Tech

## About

Code2Tech is a project that aims to teach programming to students in a fun and interactive way.The project is based on the idea of using a visual programming language to teach programming concepts to students.

 
## What makes it different then a Blog
We are using MDX to create interactive lessons that include code snippets, images, and videos. This allows us to create a more engaging learning experience for students.

> Due to use of MDX we can add our own custom components to the lessons which can be used to create interactive lessons.

> **Note**: This project is still in the early stages of development. We are actively working on adding new features and improving the user experience. If you have any feedback or suggestions, please feel free to open an issue or submit a pull request.


## Table of Contents

- [Code2Tech](#code2tech)
  - [About](#about)
  - [What makes it different then a Blog](#what-makes-it-different-then-a-blog)
  - [Table of Contents](#table-of-contents)
  - [Features We Aim to provide](#features-we-aim-to-provide)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)

## Features We Aim to provide

- Interactive visual and text-based lessons regarding education focusing on (Maths,Computer Science,AI,Physics)
- Real-time collaborative coding environment
- Gamified learning experience
- Progress tracking and analytics
- Peer-to-peer learning
- Collaborative problem-solving
- Supports multiple programming concepts
- Fun and engaging learning experience

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS , Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Prisma
- **Authentication**: Auth.js
- **Deployment**: Docker, Vercel
- **Payment Gateway**: Razorpay
- **Interactive Content**: MDX

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 18.x)
- Docker
- PostgreSQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/code2tech.git
   cd code2tech
   ```
   ```sh
   pnpm install
   ```
    ```sh
    cp .env.example .env
    ```
    ```sh
    docker compose up -d
    pnpm prisma db push
    ```
    ```sh
    pnpm dev
    ```
## Usage
- Navigate through the different sections of the application to explore the interactive programming lessons.
  Use the visual programming language to solve problems and learn new concepts.
- Collaborate with classmates to enhance the learning experience.
 
## Contributing
We welcome contributions from the community! If you'd like to      contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a new Pull Request
