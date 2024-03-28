import { useState } from "react";
import CompanyDetailsModal from "./components/modals/CompanyDetailsModal";
import { Button } from "./components/ui/button";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-4 justify-center mt-5">
        <Button onClick={() => setIsOpen(true)}>
          Open Company Details Modal
        </Button>
      </div>

      <CompanyDetailsModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;
