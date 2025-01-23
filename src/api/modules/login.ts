import * as authMenuList from '@/assets/json/authMenu.json'
import service from "@/api/index";

export const getAuthMenuList = () => {
    return authMenuList
}

export const testAuth = () => {
    return service.get('/api/unauthorized')
}

export const testMockio = () => {
    return service.get('https://run.mocky.io/v3/dea9421c-6aa1-4d18-a866-8a797992c1f0')
}

export const testMockoon = () => {
    return service.get('http://localhost:3000/template')
}

export const downloadFile = () => {
    return service.get('http://localhost:3000/template')
}