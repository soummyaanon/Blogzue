import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPaperPlane, FaSpinner } from 'react-icons/fa'; // Import spinner icon

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isLoading, setIsLoading] = useState(false);

    const submit = async (data) => {
        setIsLoading(true);
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
        setIsLoading(false);
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-indigo-100 border-2 border-indigo-500 shadow-md rounded-lg p-6 justify-start">
            <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
                <label className="block text-indigo-700 text-sm font-bold mb-2 text-left" htmlFor="title">
                    Title
                </label>
                <input
                    id="title"
                    placeholder="Title"
                    className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...register("title", { required: true })}
                />
                <label className="block text-indigo-700 text-sm font-bold mb-2 mt-4 text-left" htmlFor="slug">
                    Slug
                </label>
                <input
                    id="slug"
                    placeholder="Slug"
                    className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <label className="block text-indigo-700 text-sm font-bold mb-2 text-left" htmlFor="image">
                    Featured Image
                </label>
                <input
                    id="image"
                    type="file"
                    className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4 mt-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <label className="block text-indigo-700 text-sm font-bold mb-2 mt-4 text-left" htmlFor="status">
                    Status
                </label>
                <select
                    id="status"
                    className="shadow appearance-none border border-indigo-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...register("status", { required: true })}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white font-bold py-2 px-4 rounded mt-4 w-auto transition duration-150 ease-in-out transform active:scale-90">
                {isLoading ? <FaSpinner className="animate-spin" /> : (post ? "Update" : "Submit")} <FaPaperPlane className="ml-2" />
            </button>
            </div>
        </form>
    );
}