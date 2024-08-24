import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Create a cached variable to store the connection
let cached = (global as any).mongoose;

// If the cached connection doesn't exist, create one
if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    // Return the cached connection if it exists
    if (cached.conn) {
        return cached.conn;
    }

    // If there's no cached promise, create one
    if (!cached.promise) {
        const opts: ConnectOptions = {
          dbName: 'makthemak',
        };

        // Create a new connection promise
        cached.promise = mongoose.connect(MONGODB_URI as string, opts);
        console.log('Connected to MongoDB');
    }

    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;