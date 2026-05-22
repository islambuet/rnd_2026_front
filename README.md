## How to Create Project
## I used vue ui
    -> vue ui
    ->then create project
# IntelliJ IDEA
    it shows error when I copy git repo
    -> File->settings->version control->directory mapping: remove files
# Editor help
    ->Ctrl+Alt+Shift+J: to select all case-sensitively matching words or text ranges in the document.Mar 17, 2022
    ->Alt+j for next matching word
    ->Alt+Shift+click: to multiple cursor
    ->Ctrl+Shift+U: upper/lowercase Press CtrlShift+U or choose Edit | Toggle Case in the main menu .
    ->Ctrl+Alt+J: For Template

## Project setup
    npm install
### Compiles and hot-reloads for development
    npm run serve
### Compiles and minifies for production
    npm run build
## Other Packages
    ### https://github.com/Maronato/vue-toastification/tree/next
        npm install --save vue-toastification@next
    
        npm install axios -save
## To change main domain and subdomain
    need to change golbal.js line 110
    need to add/remove public path at vue.config file like  publicPath:'/rnd_2023'
## close port
    netstat -ano | findstr :8080
    npx kill-port 1900