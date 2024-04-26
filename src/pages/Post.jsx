import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
<Container>
    <div className="relative flex justify-between mb-4 border rounded-xl p-2 bg-black text-white">
        <div className="w-1/2">
            <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-xl w-full"
            />
        </div>

<div className="w-1/2 pl-4">
    <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{post?.title}</h1>
    </div>
    <div className="browser-css">
        {typeof post?.content === 'string' ? parse(post.content) : null}
    </div>
</div>

{isAuthor && post && deletePost && (
    <div className="absolute bottom-0 right-0 mb-4 mr-4 flex">
        <Link to={`/edit-post/${post.$id}`}>
            <Button className="mr-3 bg-black text-white border border-white hover:bg-white hover:text-black transition-all duration-500 ease-in-out flex items-center justify-center">
                <FaEdit />
            </Button>
        </Link>
        <Button onClick={deletePost} className="bg-black text-white border border-white hover:bg-white hover:text-black transition-all duration-500 ease-in-out flex items-center justify-center">
            <FaTrash />
        </Button>
    </div>
)}
</div>
</Container>
</div>
) : null;
}