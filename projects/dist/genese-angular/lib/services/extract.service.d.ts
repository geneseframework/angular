export declare class ExtractService {
    constructor();
    /**
     * Extract all the fields of some data corresponding to a given extraction model
     * @param data
     * @param extractionModel
     */
    static extractFieldsFromData(data: any, extractionModel: any): any;
    /**
     * For a given key of an extraction model and with the path corresponding of this key,
     * returns the fields from data which have the same key for the same path
     * @param data
     * @param key
     * @param pathExtraction
     */
    static extractFieldsForOneProperty(data: any, key: string, pathExtraction: string): object;
    /**
     * With a given key and a given path, extracts the value of a data object for this key and this path
     * @param data
     * @param key
     * @param path
     */
    static extractValue(data: any, key: string, path: string): any;
}
