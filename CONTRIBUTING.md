# Contributing to AstroFusion Design System

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Workflow

This is a monorepo managed by `turbo` and `pnpm`.

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Build all packages:**
    ```bash
    pnpm build
    ```

3.  **Run the MCP Server locally:**
    ```bash
    cd mcp-server
    npm start
    ```

## Adding New Tokens

1.  Navigate to `tokens/src`.
2.  Add your token to the appropriate JSON file (e.g., `colors.json`).
3.  Run `pnpm build` to regenerate the types.

## Adding New Components

1.  Navigate to `components/src`.
2.  Create your component file (e.g., `MyComponent.tsx`).
3.  Export it in `index.ts`.
4.  Run `pnpm build` to check for type errors.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
