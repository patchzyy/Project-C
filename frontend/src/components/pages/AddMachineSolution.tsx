import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Machine } from "@/services/Machine";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";

function AddMachineSolution() {
  useAuthenticated();

  const [Name, SetName] = useState("");
  const [Solution, SetSolution] = useState("");
  const navigate = useNavigate();

  async function HandleSubmit() {
    let machines = await fetch("http://localhost:5119/api/Machines", {
      method: "GET",
      headers: {
        Authorization: "bearer " + localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((machines) =>
        machines.filter((machine: Machine) => machine.name == Name)
      );
    if (machines.length >= 1) {
      machines.map(
        (machine: Machine) => (
          (machine.solution = Solution),
          fetch("http://localhost:5119/api/Machines/" + machine.machineId, {
            method: "PUT",
            headers: {
              Authorization: "bearer " + localStorage.getItem("Token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(machine),
          })
        )
      );

      if (machines.length == 1) {
        toast({
          variant: "default",
          title: "Succes!",
          description: machines.length + " solution added successfully.",
        });
      } else if (machines.length > 1) {
        toast({
          variant: "default",
          title: "Succes!",
          description: machines.length + " solutions added successfully.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "No solutions added.",
      });
    }
    switch (localStorage.getItem("Class")) {
      case "Admin":
        navigate("/admin");
        break;
      case "ServiceEmployee":
        navigate("/serviceEmployee");
        break;
    }
  }

  return (
    <div className="grid gap-2">
      <Input
        placeholder="Enter Machine Name"
        onChange={(e) => SetName(e.currentTarget.value)}
      />
      <Textarea
        placeholder="Describe solution"
        onChange={(e) => SetSolution(e.currentTarget.value)}
      />
      <Button className="w-fit" onClick={HandleSubmit}>
        Add machine solution
      </Button>
    </div>
  );
}

export default AddMachineSolution;
