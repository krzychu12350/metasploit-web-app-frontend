import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/DashboardView.vue";
import SetupView from "../views/SetupView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import SessionsView from "../views/SessionsView.vue";
import TeamsView from "../views/TeamsView.vue";
import AnalysisView from "../views/AnalysisView.vue";
import JobsView from "../views/JobsView.vue";
import PayloadGeneratorView from "../views/PayloadGeneratorView.vue";
import SingleSessionView from "../views/SingleSessionView.vue";
import ModulesView from "../views/ModulesView.vue";
import SessionInteractWorkspaceView from '../views/SessionInteractWorkspaceView.vue'
import { useMsfAuth } from '../stores/useMsfAuth';

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: HomeView,
    },
    {
        path: "/analysis",
        name: "AnalysisView",
        component: AnalysisView,
    },
    {
        path: "/modules",
        name: "ModulesView",
        component: ModulesView,
    },
    {
        path: "/teams",
        name: "TeamsView",
        component: TeamsView,
    },
    {
        path: "/jobs",
        name: "JobsView",
        component: JobsView,
    },
    {
        path: "/sessions",
        name: "SessionsView",
        component: SessionsView,
    },
    {
        path: "/sessions/1",
        name: "SingleSessionView",
        component: SingleSessionView,
    },
    {
        path: "/payload-generator",
        name: "PayloadGeneratorView",
        component: PayloadGeneratorView,
    },
    {
        path: "/setup",
        name: "Setup",
        component: SetupView,
    },
    {
        path: "/session-interact",
        component: SessionInteractWorkspaceView,
    },
    {
        path: '/:pathMatch(.*)*', // Unrecognized path automatically matches 404
        name: "NotFoundView",
        component: NotFoundView,
    },
    

]


const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/setup'];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired && !useMsfAuth().loggedIn) {
        next('/setup');
    } else {
        next();
    }
  });

export default router;
