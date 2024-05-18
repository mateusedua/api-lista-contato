import { sign, verify } from "hono/jwt";


const encode = async (data:{}, key:string) => {
    
    const token = await sign(data,key)
    return token
}

const decode = async (token:string, key:string) => {
    const data = await verify(token,key)
    return data
}

export default {
    encode,
    decode
}