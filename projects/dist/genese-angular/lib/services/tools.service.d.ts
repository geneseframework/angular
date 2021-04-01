export declare class Tools {
    constructor();
    /**
     * clone object with deep copy
     */
    static clone(model: any): any;
    /**
     * Check if an object is a primitive or not
     */
    static isPrimitive(target: any): boolean;
    /**
     * Returns a value by default if value to check doesn't exists
     */
    static default(valueToCheck: any, valueByDefault: any): any;
    /**
     * Check if two objects have the same values for every key
     */
    static isSameObject(obj1: any, obj2: any): boolean;
    static isPath(str: string): boolean;
    /**
     * Get the root path of the api
     */
    static apiRoot(rootApi: string, path?: string, id?: string): string;
    /**
     * Check if the id is correct
     */
    static checkId(id: string): void;
    /**
     * Check if the path is correct
     */
    static checkPath(path: string): void;
}
