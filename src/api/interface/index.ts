export interface AuthMenuItem {
    path: string;
    name: string;
    component: string;
    meta: {
        icon: string;
        title: string;
        isLink: string;
        isHide: boolean;
        isFull: boolean;
        isAffix: boolean;
        isKeepAlive: boolean;
    };
}
