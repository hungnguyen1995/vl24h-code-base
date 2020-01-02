# CodeBase Frontend SieuViet

### Install [Yarn or Npm]
    ~ $ yarn install
    
    ## Replace - env.example -> .env
##### Run dev 
    ~ $ yarn start:dev 
##### Run Production
       ~ $ yarn build
       ~ $ yarn start 
    

Script in package.json:

    "start:dev": "nodemon", // Run dev
    "build": "next build && tsc --project tsconfig.server.json", // Build Before Run Production
    "start": "cross-env NODE_ENV=production node dist/index.js", // Run on Production 
    "lint": "eslint './{src,pages,server}/**/*' --ext .tsx,.ts",
    "pretty": "prettier --write --config .prettierrc.js {src,pages,server}/**/*.{ts,tsx}",// Format Code
    "format": "npm run lint -- --fix", // Fix Eslint
    "analyze": "cross-env BUNDLE_ANALYZE=both npm run build", // Phân tích dung lượng thư viện
    "export": "cross-env NODE_ENV=production next export", // Build ra file tĩnh
    "cli": "pankod-cli add" // CLi add new Page , Component

## Features

#### Update new Stack

* **Next.js** - Server Side Render x2 Performance so với Client Side Render...  
* **Typescript** - OOP , Giống PropsType React dùng để Validate props trong component...
* **Redux** - Quản lý State.
* **Express.js**- Node.js framework chạy Server trong Next.js.
* **Built-in Project CLI**- Tạo Page + Component giống Artisan Laravel.
* **Sass/Scss** - CSS top-level.
* **Babel** -  Dùng để biên dịch JavaScript.
* **ESLint** - Ràng buộc syntax , chuẩn hóa code các thành viên trọng team.
* **next-runtime-dotenv** - Support .env in Next.js.
* **next-i18next** - Support multi lang.
* **PWA + Service Worker** - Chạy trên Thiết Bị Di Động , Chạy Khi Offline cache... 

<br/>

    ~ $ npm run cli

##### Document
* [Next Js ** https://nextjs.org/ ](https://nextjs.org/)
* [Front-end with React , Next jS [Tiếng việt]](https://github.com/nguyenvanhoang26041994/dev-experiences/blob/master/front-end/front-end-fast.md)
* [Tools Build Template CLI next-boilerplate ](https://github.com/pankod/next-boilerplate)
* [TypeScript](https://codetheworld.io/xay-dung-ung-dung-bang-react-su-dung-typescript.html)
## License


####Todo
* LURL cache HTML on Server Node
* Site map 
* PWA Service Worker cache img + html + js (done)

Licensed SieuViet-DevTeam
