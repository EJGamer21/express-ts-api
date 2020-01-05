import ModelBase from './modelbase';

export default class UserModel {
    public tablename: string = 'user';
    public fields: Array<string> = [
        'usuarios.*',
        'emails.email',
        'roles.rol, roles.level',
        'provincias.nombre as provincia',
        'ciudades.nombre as ciudad'
    ];
    public joins: Array<object> = [
        {
            table: 'emails',
            condition: 'usuarios.email_id = emails.id',
            type: 'LEFT',
        },
        {
            table: 'roles',
            condition: 'usuarios.role_id = roles.id',
            type: 'INNER'
        },
        {
            table: 'usuarios_direcciones',
            condition: 'usuarios.id = usuarios_direcciones.usuario_id',
            type: 'LEFT'
        },
        {
            table: 'direcciones',
            condition: 'usuarios_direcciones.direccion_id = direcciones.id',
            type: 'LEFT'
        },
        {
            table: 'provincias',
            condition: 'direcciones.provincia_id = provincias.provincia_id',
            type: 'LEFT'
        },
        {
            table: 'ciudades',
            condition: 'direcciones.ciudad_id = ciudades.ciudad_id',
            type: 'LEFT'
        }
    ];
    private modelBase: ModelBase;

    constructor() {
        this.modelBase = new ModelBase(
            this.tablename,
            this.fields,
            this.joins
        );
    }

    public get(id?: string | number): boolean | Promise<any> {
        if (id) {
            return this.modelBase.get(id);
        } else {
            return this.modelBase.get();
        }
    }
}