<script setup lang="ts">
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "vue-sonner";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

const router = useRouter();

const formSchema = toTypedSchema(
  z.object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(1, "Username is required"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  if (values.username === "admin" && values.password === "123456") {
    localStorage.setItem("role", "admin");
    router.push("/");
    return toast.success("Login successful", { duration: 1500 });
  } else if (values.username === "user" && values.password === "123456") {
    localStorage.setItem("role", "viewer");
    router.push("/");
    return toast.success("Login successful", { duration: 1500 });
  } else {
    toast.error("Invalid credentials");
  }
});
</script>

<template>
  <Card class="mx-auto w-full max-w-sm h-full md:h-auto rounded-none md:rounded-2xl">
    <CardHeader>
      <CardTitle class="text-2xl">Login</CardTitle>
      <CardDescription>Login to your account to view shipments.</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="onSubmit" class="grid gap-4">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <Label for="username">Username</Label>
            <Input id="username" v-bind="componentField" placeholder="Username" />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-bind="componentField" placeholder="Password" />
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full cursor-pointer">Login</Button>
      </form>
    </CardContent>
  </Card>
</template>
