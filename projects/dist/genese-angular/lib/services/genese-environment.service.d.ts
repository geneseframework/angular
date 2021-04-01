import { GeneseConfig } from '../models/genese-config.model';
export declare class GeneseEnvironmentService {
    api: string;
    extract: string;
    pageIndex: string;
    pageSize: string;
    results: string;
    totalResults: string;
    constructor();
    /**
     * Configure Genese environment
     */
    setEnvironment(config: GeneseConfig): void;
}
