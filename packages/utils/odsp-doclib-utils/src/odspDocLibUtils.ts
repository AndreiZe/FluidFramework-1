/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const odspTenants = new Map<string, string>([
    ["spo", "microsoft-my.sharepoint.com"],
    ["spo-df", "microsoft-my.sharepoint-df.com"],
]);

export function isOdspSiteUrl(server: string) {
    return server.endsWith("sharepoint.com") || server.endsWith("sharepoint-df.com");
}

export function getAadTenant(server: string) {
    let tenantName = server.substr(0, server.indexOf(".")).toLowerCase();
    if (tenantName.endsWith("-my")) {
        tenantName = tenantName.substr(0, tenantName.length - 3);
    } else if (tenantName.endsWith("-admin")) {
        tenantName = tenantName.substr(0, tenantName.length - 6);
    }

    let restOfTenantHostname = server.substr(tenantName.length).toLowerCase();
    if (restOfTenantHostname.indexOf(".sharepoint.") === 0) {
        restOfTenantHostname = `.onmicrosoft.${restOfTenantHostname.substr(12)}`;
    }

    return `${tenantName}${restOfTenantHostname}`;
}

export function getServer(tenantId: string): string {
    const server = odspTenants.get(tenantId);
    if (!server) {
        throw Error(`Invalid SPO tenantId ${tenantId}.`);
    }
    return server;
}
