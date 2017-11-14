export default [
    {
        path: '*',
        redirect: '/404',
    },
    {
        path: '/',
        redirect: '/framework',
    },
    {
        path: '/400',
        component: () => import('comp/common/400'),
    },
    {
        path: '/404',
        component: () => import('comp/common/404'),
    },
    {
        path: '/login',
        component: () => import('comp/common/login'),
    },
    {
        path: '/framework',
        redirect: '/framework/welcome',
        component: () => import('comp/framework'),
        children: [
            {
                path: 'welcome',
                component: () => import('comp/common/welcome'),
            },
            {
                path: 'taobao',
                component: () => import('comp/a'),
            },
            {
                path: 'tmall',
                component: () => import('comp/b'),
            }
        ],
    }
];