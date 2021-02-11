/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Represents token response
 */
export interface TokenResponse {
    /** Token value */
    token: string;

    /** Flag indicating whether token was obtained from local cache */
    fromCache?: boolean;
}

/**
 * Represents access token fetch options
 */
export interface TokenFetchOptions {
    /**
     * Value indicating whether fresh token has to be returned.
     * If false then it is okay to return cached unexpired token if available.
     */
    refresh: boolean;

    /**
     * Claims that have to be passed with token fetch request.
     * These can be used to specify additional information that must be passed to token authority.
     */
    claims?: string;

    /**
     * Tenant id of authority that must be handling token fetch.
     * If it is not specified then it is up to token fetching logic to determine which tenant authority
     * to use to issue access token.
     */
    tenantId?: string;
}

/**
 * Method signature for callback method used to fetch access token
 * @param options - token fetch options
 * @returns If successful, TokenResponse object representing token value along with flag indicating
 * whether token came from cache. Legacy implementation may return a string for token value;
 * in this case it should be assumes that fromCache signal is undefined. Null is returned in case of failure.
 */
export type TokenFetcher = (options: TokenFetchOptions) => Promise<string | TokenResponse | null>;

/**
 * Represents access token fetch options for ODSP resource
 */
export interface OdspResourceTokenFetchOptions extends TokenFetchOptions {
    /** Site url representing ODSP resource location */
    siteUrl: string;
}

/**
 * Method signature for callback method used to fetch token for accessing ODSP resource with location
 * represented by site url.
 * @param options - token fetch options
 * @returns If successful, TokenResponse object representing token value along with flag indicating
 * whether token came from cache. Legacy implementation may return a string for token value;
 * in this case it should be assumes that fromCache signal is undefined. Null is returned in case of failure.
 */
export type OdspResourceTokenFetcher =
    (options: OdspResourceTokenFetchOptions) => Promise<string | TokenResponse | null>;

export interface GraphResourceTokenFetchOptions extends OdspResourceTokenFetchOptions {
    type: "Graph";
}

export interface OneDriveResourceTokenFetchOptions extends OdspResourceTokenFetchOptions {
    type: "OneDrive";
}

export type SharingLinkTokenFetchOptions = GraphResourceTokenFetchOptions | OneDriveResourceTokenFetchOptions;

/**
 * Method signature for callback method used to fetch tokens used when generating Sharing link
 * @param options - token fetch options
 * @returns If successful, TokenResponse object representing token value along with flag indicating
 * whether token came from cache. Legacy implementation may return a string for token value;
 * in this case it should be assumes that fromCache signal is undefined. Null is returned in case of failure.
 */
export type SharingLinkTokenFetcher = (options: SharingLinkTokenFetchOptions) => Promise<string | TokenResponse | null>;

/**
 * Helper method which transforms return value for TokenFetcher method to token string
 * @param tokenResponse - return value for TokenFetcher method
 * @returns Token value
 */
export function tokenFromResponse(tokenResponse: string | TokenResponse | null | undefined): string | null {
    return tokenResponse === null || typeof tokenResponse === "string"
        ? tokenResponse
        : tokenResponse === undefined ? null : tokenResponse.token;
}

/**
 * Helper method which returns flag indicating whether token response comes from local cache
 * @param tokenResponse - return value for TokenFetcher method
 * @returns Value indicating whether response came from cache.
 * Undefined is returned when we could not determine the source of token.
 */
export function isTokenFromCache(tokenResponse: string | TokenResponse | null): boolean | undefined {
    return tokenResponse === null || typeof tokenResponse === "string"
        ? undefined
        : tokenResponse.fromCache;
}

export type IdentityType = "Consumer" | "Enterprise";
