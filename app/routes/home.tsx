import React from "react";
import type { Route } from "./+types/home";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="flex items-center justify-center pt-16 pb-4">
          <img src="https://www.jammable.com/cdn-cgi/image/width=640,quality=75,format=webp/https://images.jammable.com/voices/e3d7b93d-5b14-45aa-a4e0-ebd34084bb9d.png" alt="o i i a" />
      </main>
    </Layout>
  );
}