export interface Options {
    port?: number,
    protocol?: string,
    host?: string,
    pathname?: string,
    family?: string,
    interface?: string,
    getNetwork?: boolean,
    indentation?: boolean
}

export interface Result {
    ip?: string,
    local: string,
    network?: string
}

export default function(option?: Options | number | string): Result;
export function print(option?: Options | number | string): void;