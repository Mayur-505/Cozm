import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import CompanyDetailsModal from "./components/modals/CompanyDetailsModal";
import { Button } from "./components/ui/button";
import { loginUser as loginUserApi } from "./services";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (data: FormData) => loginUserApi(data),
    onSuccess: (response) => {
      localStorage.setItem("token", response.access);
    },
  });

  const handleLogin = () => {
    const payload = new FormData();
    payload.append("email", "sandbox@thecozm.com");
    payload.append("password", "WelcomeCozm123!@#");
    loginUser(payload);
  };

  return (
    <div>
      <div className="flex gap-4 justify-center mt-5">

        {!localStorage.getItem("token") && 
        <Button isLoading={isPending} onClick={handleLogin}>
          Login
        </Button>}
        {localStorage.getItem("token") && <Button onClick={() => setIsOpen(true)}>
          Open Company Details Modal
        </Button>}
      </div>

      <CompanyDetailsModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;
