const permissionList=['http://localhost:3000/register','http://localhost:3000/auth'] 
// URL´s permitadas desde el front al back
const methodsToUse=['GET','POST','DELETE']

export const corsPermissions={
    credentials: true,
     methods: methodsToUse,
      origin: permissionList,
      allowedHeaders:['Content-Type','Date','Last-Modified'],
      maxAge:30,
      optionsSuccessStatus: 204
}


