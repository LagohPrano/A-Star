import config from './config.json'

const getCompanyCategoryRecommendation = async(major) => {
    var res = await fetch(`http"//${config.server_host}:${config.server_port}/recommendation/company-category?major=${major}`, {
        method: 'GET',
    })
    return res.json()
}

const getCompanyRegionRecommendation = async(major) => {
    var res = await fetch(`http"//${config.server_host}:${config.server_port}/recommendation/company-region?major=${major}`, {
        method: 'GET',
    })
    return res.json()
}

export{
    getCompanyCategoryRecommendation,
    getCompanyRegionRecommendation
}