import fastify from "../index"
import bcrypt from "bcryptjs"



//REGISTER A CLIENT ROUTE
export const register = async (request: any, reply: any) => {
    const { username, email, user_password, balance } = request.body as {
        username: string;
        email: string;
        user_password: string;
        balance: number;
    };

    if (!username || !email || !user_password || balance === undefined) {
        return reply.status(400).send({ error: 'Missing required fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(user_password, 10);
        const result = await fastify.pg.query(
            'INSERT INTO clients (username, email, user_password, balance) VALUES ($1, $2, $3, $4) RETURNING id',
            [username, email, hashedPassword, balance]
        );

        const clientId = result.rows[0].id;

        reply.status(201).send({ id: clientId, username, email, balance });
    } catch (error: any) {
        console.error('Error registering client:', error.message);
        reply.status(500).send({ error: 'Failed to register client' });
    }
}




//LOGIN A CLIENT ROUTE
export const login = async (request: any, reply: any) => {
    const { email, user_password } = request.body as {
        email: string;
        user_password: string;
    };

    if (!email || !user_password) {
        return reply.status(400).send({ error: 'Missing email or password' });
    }

    try {
        const result = await fastify.pg.query('SELECT * FROM clients WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return reply.status(401).send({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(user_password, user.user_password);

        if (!passwordMatch) {
            return reply.status(401).send({ error: 'Invalid credentials' });
        }

        const token = fastify.jwt.sign({ id: user.id, username: user.username });

        reply.send({ token });
    } catch (error: any) {
        console.error('Error logging in:', error.message);
        reply.status(500).send({ error: 'Failed to login' });
    }
}

