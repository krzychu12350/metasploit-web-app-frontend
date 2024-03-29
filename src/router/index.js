import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/DashboardView.vue";
import SetupView from "../views/SetupView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import SessionsView from "../views/SessionsView.vue";
import JobsView from "../views/JobsView.vue";
import ModulesView from "../views/ModulesView.vue";
import SessionInteractWorkspaceView from '../views/SessionInteractWorkspaceView.vue'
import RpcConnectionsView from '../views/RpcConnectionsView.vue'
import HostsView from '../views/HostsView.vue'
import WorkspacesView from '../views/WorkspacesView.vue'
import ScriptsView from '../views/ScriptsView.vue'
import { useMsfAuth } from '../stores/useMsfAuth';

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: HomeView,
    },
    {
        path: "/hosts",
        name: "HostsView",
        component: HostsView,
    },
    {
        path: "/modules",
        name: "ModulesView",
        component: ModulesView,
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
        path: "/rpc-connections",
        name: "rpc-connectionss",
        component: RpcConnectionsView,
    },
    {
        path: "/setup",
        name: "Setup",
        component: SetupView,
    },
    {
        path: "/workspaces",
        name: "Workspaces",
        component: WorkspacesView,
    },
    {
        path: "/scripts",
        name: "Scripts",
        component: ScriptsView,
    },
    {
        path: "/sessions/:id",
        component: SessionInteractWorkspaceView,
        params: true,
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
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active-link',
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
