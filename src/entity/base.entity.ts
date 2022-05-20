/**
 * @file base.entity
 * @description defines base entity methods for other entities
*/

import * as _ from "lodash";
import { Helper } from "../utils/index"


export default class BaseEntity {

  constructor(protected model: any) {
    this.model = model;
  }

  async save(ModelName: any, data: IApp.DataKeys) {
    try {
      console.log(ModelName);
      return await new ModelName(data).save();

    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** 
   * finds a single user based on payload condition
   * @params payload (condition), projection
   */
  async findOne<T>(model: any, query: IApp.DataKeys, projection: IApp.DataKeys, options: IApp.DataKeys, populateQuery: any) {
    try {
      const ModelName: any = model;
      if (!_.isEmpty(populateQuery)) { // populate
        return await ModelName.findOne(query, projection, options).populate(populateQuery).exec();
      } else {
        return await ModelName.findOne(query, projection, options);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async PaginateAndFetchListing(pipeline: any, params: any) {
    try {
      let { pageNo, skip, limit } = Helper.calculatePaginate(params);
      //ADD SKIP STAGE
      console.log(pageNo);
      pipeline.push({
        "$skip": skip
      });
      //ADD LIMIT STAGE
      pipeline.push({
        "$limit": limit
      })

      pipeline.push({
        "$facet": {
          "data": [{ "$project": { firstName: 1, email: 1, phoneNo: 1, createdAt: 1 } }],
          "metadata": [{ "$count": "total" }]

        }
      })
      console.log(pipeline);
      let result = await this.aggregateWithPipeline(pipeline, {});

      if (result) {
        let metadata = result[0]["metadata"];
        let rows = result[0]["data"];

        if (rows && rows.length > 0) {
          let theTotal = metadata[0]["total"];
          let pageToSend = -1;
          //CHECK IF NEXT PAGE;
          if (theTotal > (pageNo * limit)) {
            pageToSend = pageNo + 1
          }
          return {
            "data": rows,
            "total": theTotal,
            "nextPage": pageToSend,
            "limit": limit
          }
        }
      }
      return {
        "data": [],
        "total": 0,
        "nextPage": -1,
        "limit": limit
      }

    } catch (error) {
      throw error;
    }
  }


  async aggregateWithPipeline(pipeline: any[], options: any) {
    try {
      return await this.model.aggregate(pipeline, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

}