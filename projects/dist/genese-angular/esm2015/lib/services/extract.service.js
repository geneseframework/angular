import { Injectable } from '@angular/core';
export class ExtractService {
    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------
    constructor() { }
    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------
    /**
     * Extract all the fields of some data corresponding to a given extraction model
     * @param data
     * @param extractionModel
     */
    static extractFieldsFromData(data, extractionModel) {
        if (!extractionModel) {
            return data;
        }
        const result = {};
        for (const key of Object.keys(extractionModel)) {
            Object.assign(result, { [key]: this.extractFieldsForOneProperty(data, key, extractionModel[key]) });
        }
        return result;
    }
    /**
     * For a given key of an extraction model and with the path corresponding of this key,
     * returns the fields from data which have the same key for the same path
     * @param data
     * @param key
     * @param pathExtraction
     */
    static extractFieldsForOneProperty(data, key, pathExtraction) {
        const extracts = [];
        if (Array.isArray(data)) {
            for (const element of data) {
                extracts.push(this.extractFieldsForOneProperty(element, key, pathExtraction));
            }
        }
        else {
            return ExtractService.extractValue(data, key, pathExtraction);
        }
        return extracts;
    }
    /**
     * With a given key and a given path, extracts the value of a data object for this key and this path
     * @param data
     * @param key
     * @param path
     */
    static extractValue(data, key, path) {
        if (!data || !path || typeof path !== 'string') {
            return data;
        }
        const branches = path.split('.');
        let value;
        for (const branch of branches) {
            if (!value) {
                value = data[branch];
            }
            else {
                value = value[branch];
            }
        }
        return value;
    }
}
ExtractService.decorators = [
    { type: Injectable }
];
ExtractService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZ2VuZXNlL2FuZ3VsYXIvc3JjL2xpYi9zZXJ2aWNlcy9leHRyYWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNLE9BQU8sY0FBYztJQUV2QixxREFBcUQ7SUFDckQsa0NBQWtDO0lBQ2xDLHFEQUFxRDtJQUdyRCxnQkFBZ0IsQ0FBQztJQUlqQixxREFBcUQ7SUFDckQsOEJBQThCO0lBQzlCLHFEQUFxRDtJQUVyRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQVMsRUFBRSxlQUFvQjtRQUN4RCxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7U0FDckc7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBR0Q7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLDJCQUEyQixDQUFDLElBQVMsRUFBRSxHQUFXLEVBQUUsY0FBc0I7UUFDN0UsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixLQUFLLE1BQU0sT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDeEIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO2FBQ2pGO1NBQ0o7YUFBTTtZQUNILE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUdEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFTLEVBQUUsR0FBVyxFQUFFLElBQVk7UUFDcEQsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE1BQU0sUUFBUSxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBSSxLQUFLLENBQUM7UUFDVixLQUFLLE1BQU0sTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0gsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6QjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7O1lBekVKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFeHRyYWN0U2VydmljZSB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgQ09OU1RSVUNUT1JcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBNRVRIT0RTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEV4dHJhY3QgYWxsIHRoZSBmaWVsZHMgb2Ygc29tZSBkYXRhIGNvcnJlc3BvbmRpbmcgdG8gYSBnaXZlbiBleHRyYWN0aW9uIG1vZGVsXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcGFyYW0gZXh0cmFjdGlvbk1vZGVsXG4gICAgICovXG4gICAgc3RhdGljIGV4dHJhY3RGaWVsZHNGcm9tRGF0YShkYXRhOiBhbnksIGV4dHJhY3Rpb25Nb2RlbDogYW55KTogYW55IHtcbiAgICAgICAgaWYgKCFleHRyYWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhleHRyYWN0aW9uTW9kZWwpKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwge1trZXldOiB0aGlzLmV4dHJhY3RGaWVsZHNGb3JPbmVQcm9wZXJ0eShkYXRhLCBrZXksIGV4dHJhY3Rpb25Nb2RlbFtrZXldKX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBGb3IgYSBnaXZlbiBrZXkgb2YgYW4gZXh0cmFjdGlvbiBtb2RlbCBhbmQgd2l0aCB0aGUgcGF0aCBjb3JyZXNwb25kaW5nIG9mIHRoaXMga2V5LFxuICAgICAqIHJldHVybnMgdGhlIGZpZWxkcyBmcm9tIGRhdGEgd2hpY2ggaGF2ZSB0aGUgc2FtZSBrZXkgZm9yIHRoZSBzYW1lIHBhdGhcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gcGF0aEV4dHJhY3Rpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgZXh0cmFjdEZpZWxkc0Zvck9uZVByb3BlcnR5KGRhdGE6IGFueSwga2V5OiBzdHJpbmcsIHBhdGhFeHRyYWN0aW9uOiBzdHJpbmcpOiBvYmplY3Qge1xuICAgICAgICBjb25zdCBleHRyYWN0cyA9IFtdO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBleHRyYWN0cy5wdXNoKHRoaXMuZXh0cmFjdEZpZWxkc0Zvck9uZVByb3BlcnR5KGVsZW1lbnQsIGtleSwgcGF0aEV4dHJhY3Rpb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBFeHRyYWN0U2VydmljZS5leHRyYWN0VmFsdWUoZGF0YSwga2V5LCBwYXRoRXh0cmFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dHJhY3RzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2l0aCBhIGdpdmVuIGtleSBhbmQgYSBnaXZlbiBwYXRoLCBleHRyYWN0cyB0aGUgdmFsdWUgb2YgYSBkYXRhIG9iamVjdCBmb3IgdGhpcyBrZXkgYW5kIHRoaXMgcGF0aFxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICovXG4gICAgc3RhdGljIGV4dHJhY3RWYWx1ZShkYXRhOiBhbnksIGtleTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBpZiAoIWRhdGEgfHwgIXBhdGggfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBicmFuY2hlczogc3RyaW5nW10gPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgZm9yIChjb25zdCBicmFuY2ggb2YgYnJhbmNoZXMpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFbYnJhbmNoXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVticmFuY2hdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG4iXX0=