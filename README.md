# InvoiceHub - Invoice Management System

IncoiceHub is an invoice management system app that streamlines the process of creating and managing invoices. You can see the live demo [here](https://nextjs-invoice-management-system-nks5.vercel.app/).

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
├── components
│   ├── invoices                          # Invoices directory
│   ├── base                              # Base directory
│   └── layout                            # Layout component
├── src
│   ├── app                               # App directory
│   │   ├── create
│   │   │   └── page.tsx                  # Create invoice page component
│   │   ├── edit
│   │   │   └── [id]
│   │   │       └── page.tsx              # Edit invoice page component
│   │   ├── page.tsx                      # Invoice list page component
│   │   └── layout.tsx                    # Layout component
├── constants                             # Constants directory
├── hooks                                 # Hooks directory
├── lib                                   # Library directory
│   ├── schemas                           # Schema definitions
│   └── types                             # Type definitions
├── utils                                 # Utility functions
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
