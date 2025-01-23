// import { AxiosResponse } from "axios";

/**
 * 使用递归扁平化菜单
 * @param menuList 
 */
export function getFlatMenuList(menuList) {
    let newMenuList = JSON.parse(JSON.stringify(menuList));

    return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
}

export function getShowMenuList(menuList) {
    let newMenuList = JSON.parse(JSON.stringify(menuList));
    return newMenuList.filter(item => {
        item.children?.length && (item.children = getShowMenuList(item.children))
        return !item.meta?.isHide
    })
}

export function getAllBreadcrumbList(menuList: Menu.MenuOptions[], parent: [] = [], result: { [key: string]: any } = {}) {
    for (const item of menuList) {
        result[item.path] = [...parent, item]
        if (item.children) getAllBreadcrumbList(item.children, result[item.path], result)
    }
    return result
}

export function handleFileDownload(response: any, contentType: string) {
    // 获取文件名
    console.log(response.headers);

    const contentDisposition = response.headers['content-disposition']
    console.log('contentDisposition', contentDisposition);

    const fileName = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'download';

    // 创建 blob 对象
    const blob = new Blob([response.data], { type: contentType });

    // 创建url 对象
    const url = URL.createObjectURL(blob);

    // 创建临时的 a 标签触发下载
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 释放 URL 对象
    URL.revokeObjectURL(url);
}