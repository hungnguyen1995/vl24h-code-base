# CodeBase Frontend SieuViet

Script in package.json:

    "start:dev": "nodemon", // Run dev
    "build": "next build && tsc --project tsconfig.server.json", // Build Before Run Production
    "start": "cross-env NODE_ENV=production node dist/index.js", // Run on Production 
    "lint": "eslint './{src,pages,server}/**/*' --ext .tsx,.ts",
    "pretty": "prettier --write --config .prettierrc.js {src,pages,server}/**/*.{ts,tsx}",
    "format": "npm run lint -- --fix",
    "analyze": "cross-env BUNDLE_ANALYZE=both npm run build",
    "export": "cross-env NODE_ENV=production next export",
    "cli": "pankod-cli add"

## Features


next-boilerplate project provides a lot of features out of the box. Here's an overview of the included components and tools.

* **Next.js** - SSR.
* **Typescript** - Giống PropsType fake OOP dùng để validate props trong component .
* **Redux** - Quản lý State .
* **Express.js**- Node.js framework chạy Server trong Next.js.
* **Built-in Project CLI**- Create pages, components, actions, reducers with one command by using built-in cli.
* **Sass/Scss** - CSS top-level.
* **Babel** -  Dùng để biên dịch JavaScript.
* **ESLint** - Ràng buộc syntax , chuẩn hóa code các thành viên trọng team .
* **next-runtime-dotenv** - đọc file .env trong Next.js
* **next-i18next** - Support multi lang.

<br/>
<div>
 <img width="600" src="./boilerplate-cli.gif" >
</div>

    ~ $ npm run cli

##### Document
* [Front-end with React , Next jS [Tiếng việt]](https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/front-end/front-end-fast.md)
* [Tools Build Template CLI next-boilerplate ](https://github.com/pankod/next-boilerplate)
* [TypeScript](https://codetheworld.io/xay-dung-ung-dung-bang-react-su-dung-typescript.html)
## License

Licensed SieuViet-DevTeam
