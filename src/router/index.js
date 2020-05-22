import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Note from "@/views/Note.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },

  {
    path: "/note/:id",
    name: "ToDo Item",
    props: true,
    component: Note
  },

  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
