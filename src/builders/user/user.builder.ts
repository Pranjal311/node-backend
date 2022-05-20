import { Helper } from "../../utils/index"


export class UserBuilder {


    public static buildUsersList(params: any) {
        try {
            let pipeline = [];
            let matchStage: any = {
                "$match": {}
            }

            let OrCondition = [];
            if (params.searchKey && params.searchKey !== "") {
                //ADDING MATCH STAGE IN CASE OF SEARCH TO BOTH FACET PIPELINE
                let search = Helper.generateSearchRegex(params.searchKey);
                OrCondition.push({ "firstName": { "$regex": search } }, { "email": { "$regex": search } })
                    matchStage["$match"]["$or"] = OrCondition;
            }
           


            let filterOptions: any = {};

            if (params.fromDate) {
                filterOptions["$gte"] = new Date(params.fromDate)
            }
            if (params.toDate) {
                filterOptions["$lte"] = new Date(params.toDate)
            }
            if (Object.keys(filterOptions).length > 0) {
                matchStage["$match"]["createdAt"] = filterOptions;
            }
            //ADD MATCH STAGE 
            pipeline.push(matchStage);
            //ADD SORT STAGE
            pipeline.push({
                "$sort": {
                    createdAt: -1
                }
            })
            return pipeline
        } catch (error) {
            throw error;
        }
    }








}