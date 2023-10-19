> [English](./CONTRIBUTING.md) | 简体中文

# 贡献指南

感谢你的宝贵时间。你的贡献将使这个项目变得更好！在提交贡献之前，请务必花点时间阅读下面的入门指南。

## 行为准则

该项目有一份 [行为准则](./CODE_OF_CONDUCT.md)，希望参与项目的贡献者都能严格遵守。

## 透明的开发

所有工作都直接透明地在 `GitHub` 上进行。核心团队成员和外部贡献者的 `pull requests` 都需要经过相同的 `code review` 流程。

## 语义化版本

该项目遵循语义化版本。我们对重要的漏洞修复发布修订号，对新特性或不重要的变更发布次版本号，对重大且不兼容的变更发布主版本号。

## 报告 Issues

我们使用 [Github issues](https://github.com/ikun-svelte/ikun-ui/issues) 进行 bug 报告和新 feature 建议。在报告 bug 之前，请确保已经搜索过类似的 [问题](https://github.com/onu-ui/onu-ui/issues)，因为它们可能已经得到解答或正在被修复。对于 bug 报告，请包含可用于重现问题的代码。对于新 feature 建议，请指出你想要的更改以及期望的行为。

## 提交 Pull Request

1. Fork [此仓库](https://github.com/ikun-svelte/ikun-ui)，从 `main` 创建分支。新功能实现请发 pull request 到 `feature` 分支。其他更改发到 `main` 分支。
2. 使用 `pnpm install` 安装依赖。
3. 运行 `pnpm run dev` 对所有组件、预设、utils进行构建。
4. 调试组件请运行 `pnpm run play` ，调试文档站点请运行 `pnpm run dev:docs`。
5. 根据你的需求进行修改。
6. 对代码库进行更改。如果适用的话，请确保写了相应的测试。
7. 确认执行 `pnpm run test` 后所有的测试都是通过的。
8. 提交 git commit, 请同时遵守 [Commit 规范](#commit-指南)。
9. 提交 pull request, 如果有对应的 issue，请进行[关联](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)。

> 我知道DX并不是很好，如果你有好的方法欢迎提交PR

## 组件指南

使用`pnpm run create:new:comp <组建名>`创建新的组件。

例如，运行`pnpm run create:new:comp button`，自动创建一个名为`button`组件的目录及基本的模版，并将其作为依赖添加到根目录的`package.json`中。

### 目录结构

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

## Commit 指南

Commit messages 请遵循[conventional-changelog 标准](https://www.conventionalcommits.org/en/v1.0.0/)：

```bash
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]


// 例如
feat(components/Button): typing and classes
```

👉 [Commit example](https://github.com/unocss/unocss/releases/tag/v0.39.0)

### Commit 类型

以下是 commit 类型列表:

- feat: 新特性或功能
- fix: 缺陷修复
- docs: 文档更新
- style: 代码风格或者组件样式更新
- refactor: 代码重构，不引入新功能和缺陷修复
- perf: 性能优化
- test: 单元测试

## ikun-ui 项目结构

本仓库使用 `pnpm` 管理

1. `component`: 组件库入口, 每一个组件都是单独的包`@ikun-ui/xxxx`
2. `docs`: 组件库文档站
3. `play`: 一个svelte kit 项目，开发时使用
4. `playground`: 组件库演练场(🚧 TODO)
5. `preset`: 组件库 `UnoCSS` 预设 `@ikun-ui/preset`
6. `scripts`: 组件库使用的一些工具脚本
7. `utils`: 组件库工具方法`@ikun-ui/utils`

## License

[MIT 协议](./LICENSE).
