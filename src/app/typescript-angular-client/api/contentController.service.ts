/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { KeyValue } from '../model/keyValue';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ContentControllerService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * getAllCities
     *
     * @param companies companies
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllCitiesUsingGET(companies: string, observe?: 'body', reportProgress?: boolean): Observable<Array<KeyValue>>;
    public getAllCitiesUsingGET(companies: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<KeyValue>>>;
    public getAllCitiesUsingGET(companies: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<KeyValue>>>;
    public getAllCitiesUsingGET(companies: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (companies === null || companies === undefined) {
            throw new Error('Required parameter companies was null or undefined when calling getAllCitiesUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (companies !== undefined && companies !== null) {
            queryParameters = queryParameters.set('companies', <any>companies);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<KeyValue>>(`${this.basePath}/sales/getAllCities`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllDepartments
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllDepartmentsUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<KeyValue>>;
    public getAllDepartmentsUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<KeyValue>>>;
    public getAllDepartmentsUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<KeyValue>>>;
    public getAllDepartmentsUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<KeyValue>>(`${this.basePath}/sales/getAllDepartments`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllDesignations
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllDesignationsUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<KeyValue>>;
    public getAllDesignationsUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<KeyValue>>>;
    public getAllDesignationsUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<KeyValue>>>;
    public getAllDesignationsUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<KeyValue>>(`${this.basePath}/sales/getAllDesignations`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllLocations
     *
     * @param cityID cityID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllLocationsUsingGET(cityID: string, observe?: 'body', reportProgress?: boolean): Observable<Array<KeyValue>>;
    public getAllLocationsUsingGET(cityID: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<KeyValue>>>;
    public getAllLocationsUsingGET(cityID: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<KeyValue>>>;
    public getAllLocationsUsingGET(cityID: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (cityID === null || cityID === undefined) {
            throw new Error('Required parameter cityID was null or undefined when calling getAllLocationsUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (cityID !== undefined && cityID !== null) {
            queryParameters = queryParameters.set('cityID', <any>cityID);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<KeyValue>>(`${this.basePath}/sales/getAllLocations`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllUsers
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllUsersUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<KeyValue>>;
    public getAllUsersUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<KeyValue>>>;
    public getAllUsersUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<KeyValue>>>;
    public getAllUsersUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<KeyValue>>(`${this.basePath}/sales/getAllUsers`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getCompanyList
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCompanyListUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<string>>;
    public getCompanyListUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<string>>>;
    public getCompanyListUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<string>>>;
    public getCompanyListUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<string>>(`${this.basePath}/sales/getCompanyList`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
