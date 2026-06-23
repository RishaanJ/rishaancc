import { Suspense } from "react"
import LoginForm from "./LoginForm"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-5">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
