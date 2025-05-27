import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertWaitlistSchema,
  type InsertWaitlistEntry,
} from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function WaitlistForm() {
  const { toast } = useToast();

  const form = useForm<InsertWaitlistEntry>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertWaitlistEntry) => {
      // Save to waitlist
      await apiRequest("POST", "/api/waitlist", data);

      // Send confirmation email
      await fetch("/api/send-waitlist-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });
    },
    onSuccess: () => {
      toast({
        title: "🎉 Successfully Added!",
        description:
          "You've been added to the waitlist!",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          🚀 Be the First to Know
        </h2>
        <p className="text-muted-foreground mb-8">
          Get notified when we launch new courses, offers, and materials. Sign up and stay ahead.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full sm:w-[300px]">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="rounded-full px-5 py-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-full px-6 py-3 bg-purple-600 hover:bg-purple-700 transition-all"
            >
              {mutation.isPending ? "Joining..." : "Notify Me"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-gray-500 mt-4">
          🔒 No spam. Only valuable updates.
        </p>
      </div>
    </section>
  );
}
