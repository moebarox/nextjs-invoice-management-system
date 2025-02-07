# InvoiceHub - Invoice Management System

IncoiceHub is an invoice management system app that streamlines the process of creating and managing invoices.

## Dependencies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Jest](https://jestjs.io/)
- [Zod](https://zod.dev/)
- [MUI](https://mui.com/)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 18.17 or higher
- NPM 9.x or higher

## Installation

Clone the repository:

```bash
git clone git@github.com:moebarox/nextjs-invoice-app.git
```

Navigate to the project directory:

```bash
cd nextjs-invoice-app
```

Install the dependencies:

```bash
npm install
```

## Project Structure

The project structure is as follows:

```bash
.
├── __tests__                             # Test files
├── app
│   ├── page.tsx                          # Main page component
│   ├── page.module.scss                  # Page module styles
│   └── layout.tsx                        # Layout component
├── components
│   └── SampleComponent                   # SampleComponent directory
│       ├── SampleComponent.tsx           # SampleComponent component
│       ├── SampleComponent.module.scss   # SampleComponent module styles
│       └── index.tsx                     # Export SampleComponent component
├── constants                             # Constants
├── helpers                               # Helper functions
├── lib                                   # Utility functions
├── types                                 # Type definitions
├── styles                                # Style directory
├── public                                # Public assets
├── next.config.ts                        # Next.js configuration
├── jest.config.ts                        # Jest configuration
├── tsconfig.json                         # TypeScript configuration
└── package.json                          # Project dependencies
```

## Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building the Application

To build the application, run the following command:

```bash
npm run build
```

The build artifacts will be stored in the `.next/` directory.

## Testing

To run the unit tests, run the following command:

```bash
npm run test
```
