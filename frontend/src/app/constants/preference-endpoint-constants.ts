export class PreferenceEndpointConstants {
    static API_ENDPOINT = 'http://localhost:8080/api/';

    static getAll(): string {
        return `${this.API_ENDPOINT}preference`;
    }

    static save(type: string, value: string): string {
        return `${this.API_ENDPOINT}preference/type/${type}/value/${value}`;
    }
}
