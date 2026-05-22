import { createRouter, createWebHistory } from 'vue-router'
function getRoutes() {
  let routes =[];
  routes.push({ path: '/', component: () => import('@/tasks/Dashboard.vue')});
  let vue_index_files = require.context('@/tasks/',true,/\/Index\.vue$/).keys();
  for(let i=0;i<vue_index_files.length;i++) {
    let index_file=vue_index_files[i];
    let path=index_file.substring(1,index_file.indexOf('/Index.vue'));
    let children=[];
    try{
      let data=require(`@/tasks${path}/routes.children.js`);
      children=data.default;
    }
    catch (error) {
      //console.log(error);
    }
    routes.push({ path: path, component: () => import('@/tasks'+path+'/Index.vue'), children: children});
  }
  routes.push({ path: '/:pathMatch(.*)', component: () => import('@/components/busy-states/404.vue')});
  return routes;
}
//console.log(getRoutes())


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes:getRoutes()
})

export default router
