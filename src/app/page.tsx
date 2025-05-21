import { NextForm } from "@/components/NextForm";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-10 ">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to Next.js CRUD</h1>
        <p className="text-lg">
          This is a simple CRUD application built with Next.js.
        </p>
      </div>
      <div className="">
        <NextForm />
      </div>
    </div>
  );
}
