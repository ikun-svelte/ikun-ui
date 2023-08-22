> English | [简体中文](./CONTRIBUTING.zh-CN.md)

# Contributing

Thank you for taking your time to contribute and make this project better! Here are some guidelines to help you get started. Please make sure to take a moment and read through them before submitting your contributions.

## Code of Conduct

This project is governed by the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to adhere to it.

## Open Development

All work happens directly on `GitHub`. Both core team members and external contributors send pull requests which go through the same `code review` process.

## Semantic Versioning

This project follows semantic versioning. We release patch versions for bug fixes or other changes that do not change the behavior of the API, minor versions for new features that are backward-compatible, and major versions for any breaking changes.

Every significant change is documented in the changelog file.

## Reporting Issues

We use [Github issues](https://github.com/onu-ui/onu-ui/issues) for bug reports and feature requests. Before reporting an issue, please make sure you have searched for similar [issues](https://github.com/onu-ui/onu-ui/issues) as they may have been already answered or being fixed. For bug reporting, please include the minimum code that can be used to reproduce the problem. For feature request,

## Sending a pull request

1. Fork [the repository](https://github.com/onu-ui/onu-ui)，and create your branch from `main`. For new feature, please submit your changes directly to the `feature` branch. Other changes should go against `main` branch.
2. Use `pnpm install` install the dependencies
3. Run `pnpm run build` to build all components, presets, utils
4. Please run `pnpm run play` to debug the component, and `pnpm run dev:docs` to debug the documentation site
5. Modify according to your needs, whether it is to modify presets or components, you need to manually run `pnpm run build` in the corresponding directory after modification. Additionally, you can use `pnpm run watch` for automatic building of your changes.
6. Make changes to the codebase. Please add tests if applicable.
7. Make sure the test suite passes with `pnpm run test`.
8. Commit your changes, adhering to the [Commit Guidelines](#commit-guidelines).
9. Open a new pull request, [referencing corresponding issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) if available.

> I know DX is not very good, if you have a good method, welcome to submit a PR

## Components Guidelines

Run `pnpm run create:new:comp <component name>` to create a new component.

For instance, you can run `pnpm run create:new:comp button` to automatically generate the `button` directory along with its base template. and will also add the new component to the root `package.json` as a dependency.

### Directory Structure

```
svelte-ui
├─ components
│  ├─ Button
│  │  ├─ __test__
│  │  │  └─ button.spec.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ index.svelte
│  │  │  ├─ index.ts
│  │  │  └─ types.ts
│  │  └─ tsconfig.json
```

## Commit Guidelines

Commit messages are required to follow the [conventional-changelog standard](https://www.conventionalcommits.org/en/v1.0.0/):

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

👉 [Commit example](https://github.com/unocss/unocss/releases/tag/v0.39.0)

### Commit types

The following is a list of commit types:

- feat: A new feature or functionality
- fix: A bug fix
- docs: Documentation only changes
- style: Code formatting or component style changes
- refactor: Code changes that neither fixes a bug nor adds a feature.
- perf: Improve performance.
- test: Add missing or correct existing tests.

## OnuUI Repository Structure

This repository is managed by `pnpm`:

1. `component`: component library entry, each component is a separate package `@ikun-ui/xxxx`
2. `docs`: Component Library Documentation Site
3. `play`: A svelte kig project, used during development
4. `playground`: Component Library Playground (🚧 TODO)
5. `preset`: `UnoCSS` preset for component library (`@ikun-ui/preset`)
6. `scripts`: Some tool scripts used by the component library
7. `utils`: Component library utility methods (`@ikun-ui/utils`)

## License

By contributing your code to the repository, you agree to license your contribution under the [MIT license](./LICENSE).
