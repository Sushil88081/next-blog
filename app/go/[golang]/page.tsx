import { redirect } from "next/navigation";

// Redirect /go/[golang] to /go/golang
// This ensures all Go-related routes point to the main Go page with actual content
export default function GoLangPage() {
  redirect("/go/golang");
}
