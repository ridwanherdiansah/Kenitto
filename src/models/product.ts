import dbPool from '../config/database';

interface Product  {
    name: string;
    size:string;
    id_users:number;
    imageUrl: string;
};



const create = (body: Product) => {
    const { name, size, id_users, imageUrl } = body;
    const SQLQuery = `INSERT INTO product (name, size, id_users, imageUrl) VALUES (?, ?, ?, ?)`;

    return dbPool.execute(SQLQuery, [name, size, id_users, imageUrl]);
};

const get = () => {
    const SQLQuery = 'SELECT * FROM product';

    return dbPool.execute(SQLQuery);
};

const update = (body:Product, params: {id: number}) => {
    const { name, size, id_users, imageUrl} = body;
    const { id } = params;
    const SQLQuery = `  UPDATE product
                        SET name = '${body.name}', size = '${body.size}', id_users = '${body.id_users}', imageUrl = '${body.imageUrl}'
                        WHERE id = ${id} ;`;
    
    return dbPool.execute(SQLQuery, [id, name, size, id_users, imageUrl]);
}

const destroy = (params: {id:number}) => {
    const { id } = params;
    const SQLQuery = `  DELETE FROM product 
                        WHERE id = ${id};`;

    return dbPool.execute(SQLQuery, [id]);
}

const getJoinProduct = () => {
    const SQLQuery = `  SELECT *
                        FROM users
                        INNER JOIN product ON users.ID = product.id_users`;
    
    return dbPool.execute(SQLQuery);
}

export default {
    get,
    create,
    update,
    destroy,
    getJoinProduct
};
