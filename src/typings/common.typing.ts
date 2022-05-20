export interface IFilteredRequest<T = {}> extends Request {
    data?: T
}

export namespace Common {

    export interface GetPaginatedListing {
        pageNo?: number,
        limit?: number,
        search?: string,
        sortBy?: string,
        sortOrder?: string,
        fromDate?: any,
        toDate?: any,
        status?:any,
        verificationStatus?:any
    }
}