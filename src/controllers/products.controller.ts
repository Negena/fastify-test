import axios from "axios";
import NodeCache from "node-cache";
import fastify from "../index"
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour


//caching 
// Utility function to handle caching
async function cacheWrapper(cacheKey: any, fetchData: any) {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        return cachedData;  // Return the cached data if found
    }

    const data = await fetchData(); // Fetch the data if not in cache
    cache.set(cacheKey, data);  // Cache the fetched data
    return data;
}


//GET CLIENTS
export const clients = async (request: any, reply: any) => {
    try {
        const clients = await fastify.pg.query('SELECT * FROM clients');
        reply.send(clients.rows);
    } catch (error) {
        console.error('Error fetching clients:', error);
        reply.status(500).send({ error: 'Failed to fetch clients' });
    }
};



//BUY PRODUCTS 
export const products = async (request: any, reply: any) => {
    const cacheKey = 'skinport_items';

    try {
        // Use cacheWrapper to handle caching
        const data = await cacheWrapper(cacheKey, async () => {
            const res = await axios.get("https://api.skinport.com/v1/items");
            return res.data; // Return the data instead of sending the response here
        });

        // Send the response after data is either retrieved from cache or the API
        reply.send(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        reply.status(500).send({ error: 'Failed to fetch products' });
    }
};


// Example protected route
export const profile = async (request: any, reply: any) => {
    const user = request.user; // user data added by authenticate hook
    reply.send({ user });
};



//deduct PRODUCTS 
export const deduct = async (request: any, reply: any) => {
    const id = request.user.id;
    const { market_hash_name, tradable } = request.body as { market_hash_name: string; tradable: boolean };
    const cacheKey = `product_${market_hash_name}`;

    try {
        // Fetch product data with caching
        const data = await cacheWrapper(cacheKey, async () => {
            const response = await axios.get('https://api.skinport.com/v1/items');
            return response.data.find((item: any) => item.market_hash_name === market_hash_name);
        });

        if (!data) {
            return reply.status(404).send({ error: 'Product not found' });
        }

        // // Determine the price to deduct
        const price = tradable ? data.min_price : data.median_price;

        if (price == null) {
            return reply.status(500).send({ error: 'Price not available for the selected product' });
        }

        // // // Fetch user's balance from database
        const userResult = await fastify.pg.query('SELECT balance FROM clients WHERE id = $1', [id]);

        if (userResult.rows.length === 0) {
            return reply.status(404).send({ error: 'User not found' });
        }

        const currentBalance = userResult.rows[0].balance;

        if (isNaN(currentBalance)) {
            return reply.status(500).send({ error: 'Invalid balance value' });
        }

        if (currentBalance < price) {
            return reply.status(400).send({ error: 'Insufficient balance' });
        }

        // // Deduct the price from user's balance
        const newBalance = currentBalance - price;

        await fastify.pg.query('UPDATE clients SET balance = $1 WHERE id = $2', [newBalance, id]);

        // Return success message
        return reply.send(
            {
                message: 'Balance deducted successfully',
                newBalance,
                product: {
                    market_hash_name: data.market_hash_name,
                    price
                }
            }

        );

    } catch (error) {
        console.error('Error in /deduct route:', error);
        reply.status(500).send({ error: 'Failed to deduct balance' });
    }
};