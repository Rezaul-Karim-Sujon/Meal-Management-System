import {UPDATE_COMPANIES} from "./companiesActionTypes"

export const updateCompaniesAction = (companies)=>{
    return{
        type:UPDATE_COMPANIES,
        payloads:companies
    }
}
