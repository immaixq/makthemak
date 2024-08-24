import mongoose, { Document, Model, Schema } from 'mongoose';

interface IPost extends Document {
    title: string;
    publishedAt: Date;
    revisedAt?: Date;
    summary: string;
    tags?: string[];
    slug: string;
    likes: number;
}

const PostSchema = new Schema<IPost>({
    title: { type: String, required: true },
    publishedAt: { type: Date, required: false },
    revisedAt: Date,
    summary: { type: String, required: false },
    tags: [String],
    slug: { type: String, required: false, unique: false },
    likes: { type: Number, default: 0 },
});

const Post: Model<IPost> = mongoose.model<IPost>('posts', PostSchema);

export default Post;