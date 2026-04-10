import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Terminal, Send, Cpu } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "NAME_REQUIRED_ERR.",
  }),
  email: z.string().email({
    message: "INVALID_IDENTIFIER_ERR.",
  }),
  message: z.string().min(10, {
    message: "DETAIL_INSUFFICIENT_ERR.",
  }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Transmission sent:", values);
    toast.success("TRANSMISSION_SUCCESS: I'll reach out shortly.", {
      className: "font-mono uppercase text-[10px] tracking-widest font-bold bg-background border-primary/20 text-primary",
    });
    form.reset();
  }

  return (
    <div className="glass-panel p-10 md:p-16 rounded-[48px] border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-10 opacity-10">
        <Cpu size={40} className="text-primary" />
      </div>

      <div className="flex items-center gap-4 mb-16">
        <div className="w-10 h-10 glass-panel rounded-xl flex items-center justify-center text-primary">
          <Terminal size={18} />
        </div>
        <div>
          <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-1">Inquiry Terminal</h2>
          <div className="h-[1px] w-12 bg-primary/30" />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem className="relative flex flex-col group">
                  <FormLabel className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-3 ml-1 transition-colors group-focus-within:text-primary">
                    Agent Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="GIVEN_NAME"
                      {...field}
                      className="h-14 glass-panel bg-white/5 border-none rounded-2xl font-mono text-[11px] font-bold tracking-widest uppercase px-6 focus-visible:ring-1 focus-visible:ring-primary/40 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="font-mono text-[8px] uppercase tracking-widest text-primary/60 mt-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="relative flex flex-col group">
                  <FormLabel className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-3 ml-1 transition-colors group-focus-within:text-primary">
                    System Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="IDENTIFIER@DOMAIN.SYS"
                      {...field}
                      className="h-14 glass-panel bg-white/5 border-none rounded-2xl font-mono text-[11px] font-bold tracking-widest uppercase px-6 focus-visible:ring-1 focus-visible:ring-primary/40 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="font-mono text-[8px] uppercase tracking-widest text-primary/60 mt-2" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field, fieldState }) => (
              <FormItem className="relative flex flex-col group">
                <FormLabel className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-3 ml-1 transition-colors group-focus-within:text-primary">
                  Project Parameters [Brief]
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="DESCRIBE_YOUR_SYSTEM_OBJECTIVES..."
                    className="min-h-[180px] glass-panel bg-white/5 border-none rounded-[32px] font-mono text-[11px] font-bold tracking-widest uppercase p-8 focus-visible:ring-1 focus-visible:ring-primary/40 transition-all resize-none leading-relaxed"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-mono text-[8px] uppercase tracking-widest text-primary/60 mt-2" />
              </FormItem>
            )}
          />
          <div className="flex justify-start pt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                type="submit"
                className="h-20 px-16 rounded-full bg-primary text-background hover:bg-primary/90 transition-all duration-700 font-mono text-[11px] font-bold tracking-[0.4em] uppercase shadow-2xl shadow-primary/20 flex items-center gap-4"
              >
                <span>Initialize Transmission</span>
                <Send size={16} />
              </Button>
            </motion.div>
          </div>
        </form>
      </Form>
    </div>
  );
}
