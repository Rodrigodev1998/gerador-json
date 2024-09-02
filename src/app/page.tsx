import HierarchyBuilder from "./components/HierarchyBuilder";

export default function Home() {
  return (
    <>
      <main className="min-h-screen p-6 ">
      <div className="container mx-auto bg-white p-2 rounded">
          <div className="mb-2">
            <h1 className="text-3xl font-bold">
              JSON{' '}<span className="text-slate-500">initialzr</span>
            </h1>
            <p className="text-slate-500">Crie hierarquia da forma que deseja e logo após faça download.</p>
          </div>
          <div className="w-full  bg-slate-300 mb-6 rounded"></div>
          <HierarchyBuilder />
        </div>
      </main>
      <footer>
        <p className="text-center text-gray-500 mb-2">Copyright © 2024 JSON Initialzr. All rights reserved.</p>
      </footer>
    </>
  );
}
