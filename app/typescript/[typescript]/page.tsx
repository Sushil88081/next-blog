import ComingSoon from "@/components/ComingSoon";

// TypeScript Coming Soon Page (Dynamic Route)
// This page displays a "Coming Soon" message for TypeScript content
export default function TypeScriptPostPage() {
  return (
    <ComingSoon
      title="TypeScript"
      image="/assets/images/typescript.jpg"
      description="We're working hard to bring you amazing TypeScript tutorials and guides. Check back soon for exciting content about TypeScript programming!"
    />
  );
}

