export default interface IModelBase {
    get(id?: number | string, conditions?: Array<string>): any;
    create(data: any): Promise<any> | boolean;
    update(id: number | string, data?: object): Promise<any> | boolean;
    delete(id: number | string): Promise<any> | boolean;
}