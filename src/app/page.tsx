import HierarchyBuilder from "./components/HierarchyBuilder";

export default function Home() {
  return (
    <main className="min-h-screen p-6 ">
      <div className="container mx-auto bg-white p-2 rounded">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Gerador de Hierarquia de Palavras
        </h1>
        <HierarchyBuilder />
      </div>
    </main>
  );
}
