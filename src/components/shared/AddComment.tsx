import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
// import FileUploader from "../shared/FileUploader";
import { CommentValidation, PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesandmutations";
import { useUserContext } from "@/context/authContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Toast } from "../ui/toast";


type PostFormProps = {
    post?: Models.Document;
    action: "create" | "update";
}

const AddComment = ({ post, action }: PostFormProps ) => {
    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
    const { user } = useUserContext();
    const { toast } = useToast();
    const navigate = useNavigate();

    // 1. Define your form.
    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            comment: post ? post?.caption : "",
          },
    })

    // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof PostValidation>) {
    // if(post && action === 'update') {
    //     const updatedPost = await updatePost({
    //         ...values,
    //         postId: post.$id,
    //         imageId: post?.imageId,
    //         imageUrl: post?.imageUrl,
    //     })
    //     if(!updatedPost) {
    //         Toast({
    //             title: "please try again"
    //         })
    //     }
    //     return navigate(`/posts/${post.$id}`);
    // }
    // value: z.infer<typeof PostValidation>
        // Do something with the form values.
        const newPost = await createPost({
            ...values,
            userId: user.id,
        })
        if(!newPost) {
            toast({
                title: "please try again"
            })
        }
        // ✅ This will be type-safe and validated.
        navigate(`/posts/${post.$id}`);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-9 max-w-5xl">
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Comment</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
               
                <div className="flex gap-4 justify-end items-center">
                    <Button type="submit" className="shad-button_primary whitespace-nowrap"
                    disabled={isLoadingCreate || isLoadingUpdate}>
                        {isLoadingCreate || isLoadingUpdate && "Loading...."}
                        {action} post
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default AddComment;
 