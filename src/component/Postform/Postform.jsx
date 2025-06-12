
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteService.deleteFile(post.featured_image); // Changed from featuredImage
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      try {
        console.log("Form data being submitted:", data);
        console.log("Image data:", data.image);

        if (!data.image || !data.image[0]) {
          console.error("No image selected");
          return;
        }

        console.log("Attempting to upload file:", data.image[0].name, "Size:", data.image[0].size);
        const file = await appwriteService.uploadFile(data.image[0]);
        console.log("File upload response:", file);

        if (file) {
          const fileId = file.$id;
          console.log("Setting featuredImage to:", fileId);

          const postData = {
            ...data,
            featuredImage: fileId,
            userID: userData.$id
          };

          console.log("Sending post data to Appwrite:", postData);
          const dbPost = await appwriteService.createPost(postData);
          console.log("Post creation response:", dbPost);

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          } else {
            console.error("Post creation returned null or undefined");
          }
        } else {
          console.error("File upload failed or returned null");
        }
      } catch (error) {
        console.error("Error in submit function:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
    }
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
    <div className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-600">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {post ? "Edit Post" : "Create New Post"}
          </h2>
          <p className="text-gray-300">
            {post ? "Update your existing post" : "Share your thoughts with the world"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-8">
          <div className="w-full lg:w-2/3">
            <div className="space-y-6">
              <Input
                label="Title :"
                placeholder="Enter your post title"
                {...register("title", { required: true })}
              />
              <Input
                label="Slug :"
                placeholder="post-url-slug"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
              />
              <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
          </div>
          
          <div className="w-full lg:w-1/3">
            <div className="space-y-6">
              <Input
                label="Featured Image :"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {
                  required: "Featured image is required",
                  validate: (value) => {
                    if (!post && (!value || value.length === 0)) {
                      return "Featured image is required";
                    }
                    return true;
                  }
                })}
              />
              
              {post && (
                <div className="w-full">
                  <label className="inline-block mb-2 pl-1 text-gray-300 font-medium">Current Image:</label>
                  <img
                    src={appwriteService.getFilePreview(post.featured_image)}
                    alt={post.title}
                    className="rounded-lg w-full border border-gray-600"
                  />
                </div>
              )}
              
              <Select
                options={["active", "inactive"]}
                label="Status"
                {...register("status", { required: true })}
              />
              
              <Button
                type="submit"
                bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
                className="w-full"
              >
                {post ? "Update Post" : "Publish Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
