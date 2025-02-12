"use client";

// import { useActionState, useState } from "react";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import MDEditor from "@uiw/react-md-editor";
// import { Button } from "./ui/button";
// import { Send } from "lucide-react";
// import { formSchema } from "@/lib/validation";
// import { z } from "zod";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { createPitch } from "@/lib/actions";

const ContactForm = () => {
  //   const [errors, setErrors] = useState<Record<string, string>>({});
  //   const [pitch, setPitch] = useState("");
  //   const { toast } = useToast();
  //   const router = useRouter();

  //   const handleFormSubmit = async (prevState: any, formData: FormData) => {
  //     try {
  //       const formValues = {
  //         title: formData.get("title") as string,
  //         description: formData.get("description") as string,
  //         category: formData.get("category") as string,
  //         link: formData.get("link") as string,
  //         pitch,
  //       };

  //       await formSchema.parseAsync(formValues);

  //       // console.log('Form data from the front end: ', formValues);
  //       const result = await createPitch(prevState, formData, pitch);

  //       // console.log(result)

  //       if (result.status == "SUCCESS") {
  //         toast({
  //           title: "Success",
  //           description: "Your pitch has been created successfully",
  //         });
  //         router.push(`/startup/${result._id}`);
  //       }

  //       return result;
  //     } catch (error) {
  //       if (error instanceof z.ZodError) {
  //         const fieldErrors = error.flatten().fieldErrors;
  //         setErrors(fieldErrors as unknown as Record<string, string>);

  //         toast({
  //           title: "Error",
  //           description: "Please check our inputs and try again",
  //           variant: "destructive",
  //         });

  //         return {
  //           ...prevState,
  //           error: "Validation failed",
  //           status: "ERROR",
  //         };
  //       }
  //       toast({
  //         title: "Error",
  //         description: "An unexpected error has occurred",
  //         variant: "destructive",
  //       });

  //       return {
  //         ...prevState,
  //         error: "An unexpected error has occurred",
  //         status: "ERROR",
  //       };
  //     }
  //   };
  //   const [state, formAction, isPending] = useActionState(handleFormSubmit, {
  //     error: "",
  //     status: "INITIAL",
  //   });

  return (
    <form className="">
      <div className="p-2">
        <div className="m-2 mb-4 flex flex-col gap-1">
          <label htmlFor="name" className="">
            Name
          </label>

          <input className="w-full rounded border p-1 text-black"></input>
          {/* <Input
          id="name"
          name="name"
          className="startup-form_input"
          required
          placeholder="Startup name"
        /> */}

          {/* {errors.title && <p className="startup-form_error">{errors.title}</p>} */}
        </div>

        <div className="m-2 mb-4 flex flex-col gap-1">
          <label htmlFor="email" className="">
            Email
          </label>

          <input className="w-full rounded border p-1 text-black"></input>
          {/* <Input
          id="name"
          name="name"
          className="startup-form_input"
          required
          placeholder="Startup name"
        /> */}

          {/* {errors.title && <p className="startup-form_error">{errors.title}</p>} */}
        </div>

        <div className="m-2 mb-4 flex flex-col gap-1">
          <label htmlFor="message" className="">
            Message
          </label>

          <textarea className="h-40 w-full rounded border p-1 text-black"></textarea>
          {/* <Input
          id="name"
          name="name"
          className="startup-form_input"
          required
          placeholder="Startup name"
        /> */}

          {/* {errors.title && <p className="startup-form_error">{errors.title}</p>} */}
        </div>

        <button className="m-2 flex content-end rounded border border-slate-500 p-3">
          Send
        </button>
        {/* <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size06 ml-2" />
      </Button> */}
      </div>
    </form>
  );
};

export default ContactForm;
