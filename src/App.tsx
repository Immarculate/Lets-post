import SigninForm from "./_auth/Forms/SignupForm";
import SignupForm from "./_auth/Forms/SignupForm";
import { Home } from "./_root/Pages";
import "./globals.css";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";

function App() {

  return (
    <main className="flex h-screen">
      <Routes>
        {/* public route */}
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<SigninForm />} />
          <Route path="signup" element={<SignupForm />} />
        </Route>

        {/* private route */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App
