const isValidObject = (object : any) : boolean =>  {
    if(object && typeof object === 'object' && Object.keys(object).length > 0) return true
    
    return false
}

export default isValidObject