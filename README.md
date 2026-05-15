# 热敏纸报价与竞品对比计算器

一个基于 React + Vite 的公开网页工具，用于：

- 快速计算我家热敏纸理论报价
- 对比同尺寸竞品最低价、均价和各家价格
- 通过热门通货尺寸快速进入查询

## 本地启动

```bash
npm install
npm run dev
```

默认会启动一个本地开发地址。

## 生产构建

```bash
npm run build
```

构建产物输出到 `dist/`。

## 测试

```bash
npm test
```

## 数据来源

- 竞品聚合数据：`src/data/competitor-summary.json`
- 竞品明细数据：`src/data/competitor-details.json`
- 我家定价参数：`src/data/pricing-config.json`

这些文件由脚本生成：

```bash
node scripts/build-data.mjs
```

## 当前默认参数

- 材料：热胶热敏纸不干胶
- 材料单价：1.60 元/㎡
- 边距：4 mm
- 跳距：3 mm
- 加工价 <100 平：1.00
- 加工价 100-500 平：0.60
- 加工价 500-2000 平：0.45

## 下一步可扩展

- 接入后台上传 Excel
- 增加引流价 / 常规价 / 利润价策略
- 部署到 Vercel 或 Netlify 生成公开链接

## 部署到 Vercel

### 方式一：网页导入

1. 把 `thermal-pricing-web` 放进一个 git 仓库并推到 GitHub
2. 打开 Vercel，新建项目并选择这个仓库
3. 构建配置填写：
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 点击 Deploy

项目里已经包含 `vercel.json`，一般不需要再手动改配置。

### 方式二：Vercel CLI

```bash
npm i -g vercel
vercel
```

首次执行时按提示登录并绑定项目。

## 部署到 Netlify

1. 把 `thermal-pricing-web` 推到 GitHub
2. 在 Netlify 中选择 “Add new site” -> “Import an existing project”
3. 选择仓库后确认：
   - Build command: `npm run build`
   - Publish directory: `dist`
4. 点击 Deploy site

项目里已经包含 `netlify.toml`，一般会自动识别这些配置。

## 建议上线方式

如果你想尽快拿到公开链接，推荐：

1. 先把 `thermal-pricing-web` 单独建成一个 GitHub 仓库
2. 用 Vercel 导入部署
3. 拿到链接后先给 2-3 个同事试用

这样最省事，也最容易后续继续迭代。
