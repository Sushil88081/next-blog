import ComingSoon from "@/components/ComingSoon";

// Python Coming Soon Page (Dynamic Route)
// This page displays a "Coming Soon" message for Python content
export default function PythonPostPage() {
  return (
    <ComingSoon
      title="Python"
      image="/assets/images/python.jpg"
      description="We're working hard to bring you amazing Python tutorials and guides. Check back soon for exciting content about Python programming!"
    />
  );
}
