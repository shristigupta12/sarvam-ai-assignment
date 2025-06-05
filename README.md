# React Flow Authoring

A visual editor for creating interactive call flows.

This project allows users to design and configure call flows by dragging and dropping different types of nodes onto a canvas, connecting them, and customizing their properties. It provides a user-friendly interface for building complex call logic visually.

## Features

*   **Visual Flow Canvas:** A drag-and-drop interface powered by ReactFlow for designing call flows.
*   **Diverse Node Types:** Includes nodes for various call actions such as:
    *   `Begin`: Starting point of the flow.
    *   `Conversation`: For IVR prompts and user interactions.
    *   `Function`: To integrate custom server-side logic (details selected via a modal).
    *   `Call Transfer`: To transfer calls to a specified phone number.
    *   `Press Digit`: To handle DTMF inputs from the user.
    *   `End Call`: To terminate the call flow.
*   **Node Configuration:** A settings panel allows users to customize the properties of each selected node (e.g., prompts, phone numbers, function names).
*   **Custom Edges:** Connections between nodes can be customized (though currently default to 'No condition set').
*   **Node Sidebar:** A dedicated panel to easily drag new nodes onto the canvas.
*   **State Management:** Uses Zustand for managing the state of the flow (nodes, edges, UI states like modal visibility).

## Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) (with React)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Flow Canvas Library:** [ReactFlow](https://reactflow.dev/)
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
*   **Styling:** (Primarily inline styles or global JSX, easily extendable with Tailwind CSS or CSS Modules)

## Project Structure

```
.
├── app/                  # Next.js App Router (pages, layout, API routes)
│   ├── page.tsx          # Main entry point for the application UI
│   └── favicon.ico       # Application favicon
├── modules/              # Core application logic and components
│   ├── canvas/           # Custom nodes and edges for ReactFlow
│   ├── constants/        # Application-wide constants (e.g., node data)
│   ├── hooks/            # Custom React hooks (e.g., useCreateNode)
│   ├── interfaces/       # TypeScript interface definitions
│   ├── node-settings-panel/ # UI for configuring selected nodes
│   ├── node-sidebar/     # UI for dragging new nodes
│   ├── providers/        # React context providers (e.g., SidebarProvider)
│   ├── store/            # Zustand store for state management (flow-store.ts)
│   ├── types/            # TypeScript type definitions for flow elements
│   ├── utility/          # Helper functions
│   ├── flow-canvas.tsx   # Main ReactFlow canvas wrapper and logic
├── public/               # Static assets
├── ...                   # Other standard Next.js files and configs (package.json, tsconfig.json, etc.)
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
