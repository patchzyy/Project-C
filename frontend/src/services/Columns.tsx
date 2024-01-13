import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket } from "../types/Ticket";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Machine } from "../types/Machine";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  putBaseMutateRequest,
} from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Solution } from "@/types/solution";
import { Account } from "@/types/Account";
import { Department } from "@/types/Department";
import { MachineModel } from "@/types/MachineModel";

async function Claimticket(ticket: any) {
  console.log(localStorage.getItem("Id"));
  try {
    let employee = await fetch(
      "http://localhost:5119/GetEmployeeById?id=" + localStorage.getItem("Id"),
      getBaseQueryRequest(),
    ).then((data) => data.json());
    ticket.employee_Id = employee.employeeId;
    await fetch(
      API_BASE_URL + "/api/tickets/" + ticket.ticketId,
      putBaseMutateRequest(JSON.stringify(ticket)),
    );
    toast({
      variant: "default",
      title: "Succes!",
      description: "Assigned employee to ticket.",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error!",
      description: "Error! unknown user identified",
    });
  }
}

async function ArchiveTicket(ticket: Ticket) {
  try {
    ticket.archived = true;
    await fetch(
      API_BASE_URL + "/api/tickets/" + ticket.ticketId,
      putBaseMutateRequest(JSON.stringify(ticket)),
    );
    await fetch(
      API_BASE_URL + "/api/solutions/ArchiveByTicket/" + ticket.ticketId,
      putBaseMutateRequest(JSON.stringify(ticket)),
    );
    toast({
      variant: "default",
      title: "Succes!",
      description: "Archived ticket.",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error!",
      description: "Error! Something went wrong.",
    });
  }
}

async function ArchiveMachine(machine: Machine) {
  try {
    machine.archived = true;
    await fetch(
      API_BASE_URL + "/api/machines/" + machine.machineId,
      putBaseMutateRequest(JSON.stringify(machine)),
    );
    toast({
      variant: "default",
      title: "Succes!",
      description: "Archived machine.",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error!",
      description: "Error! Something went wrong.",
    });
  }
}

async function ArchiveDepartment(department: Department) {
  try {
    department.archived = true;
    await fetch(
      API_BASE_URL + "/api/departments/" + department.departmentId,
      putBaseMutateRequest(JSON.stringify(department)),
    );
    await fetch(
      API_BASE_URL + "/api/Accounts/ArchiveByDepartment/" + department.departmentId,
      putBaseMutateRequest(JSON.stringify(department)),
    );
    await fetch(
      API_BASE_URL + "/api/Machines/ArchiveByDepartment/" + department.departmentId,
      putBaseMutateRequest(JSON.stringify(department)),
    );
    toast({
      variant: "default",
      title: "Succes!",
      description: "Archived department.",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error!",
      description: "Error! Something went wrong.",
    });
  }
}

async function ArchiveAccount(account: Account) {
  const localStorageId = parseInt(localStorage.getItem("Id") || "");
  if (account.accountId !== localStorageId) {
    try {
      account.archived = true;
      await fetch(
        API_BASE_URL + "/api/accounts/" + account.accountId,
        putBaseMutateRequest(JSON.stringify(account)),
      );
      toast({
        variant: "default",
        title: "Succes!",
        description: "Archived account.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Error! Something went wrong.",
      });
    }
  } else {
    toast({
      variant: "destructive",
      title: "Error!",
      description: "Error! You can't archive your own account.",
    });
  }
}

export const ticketColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticketId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "date_Created",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "employee_Id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Options",
    cell: ({ row }) => {
      const ticket = row.original;
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                localStorage.setItem(
                  "currentticketID",
                  ticket.ticketId.toString(),
                );
                navigate(`/view-ticket`);
              }}
            >
              View ticket
            </DropdownMenuItem>
            {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
            {localStorage.getItem("Class") == "ServiceEmployee" ||
              localStorage.getItem("Class") == "Admin" ? (
              <DropdownMenuItem onClick={() => Claimticket(ticket)}>
                Claim ticket
              </DropdownMenuItem>
            ) : null}
            {/* <DropdownMenuItem onClick={() => viewticket(currentData.[findIndex(]rowIndex))}>View ticket </DropdownMenuItem> */}
            {localStorage.getItem("Class") == "Admin" ? (
              <DropdownMenuItem onClick={() => ArchiveTicket(ticket)}>
                Archive ticket
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const machineColumns: ColumnDef<Machine>[] = [
  {
    accessorKey: "modelId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "machineId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "name",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Name
  //         {column.getIsSorted() === "desc" ? (
  //           <ArrowDownIcon className="ml-2 h-4 w-4" />
  //         ) : column.getIsSorted() === "asc" ? (
  //           <ArrowUpIcon className="ml-2 h-4 w-4" />
  //         ) : (
  //           <CaretSortIcon className="ml-2 h-4 w-4" />
  //         )}
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "description",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Description
  //         {column.getIsSorted() === "desc" ? (
  //           <ArrowDownIcon className="ml-2 h-4 w-4" />
  //         ) : column.getIsSorted() === "asc" ? (
  //           <ArrowUpIcon className="ml-2 h-4 w-4" />
  //         ) : (
  //           <CaretSortIcon className="ml-2 h-4 w-4" />
  //         )}
  //       </Button>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: "Options",
    cell: ({ row }) => {
      const machine = row.original;
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            // onClick={() => {
            //   localStorage.setItem(
            //     "currentticketID",
            //     machine.machineId.toString(),
            //   );
            //   navigate(`/view-ticket`);
            // }}
            >
              View machine
            </DropdownMenuItem>
            {/* {localStorage.getItem("Class") == "ServiceEmployee" ||
            localStorage.getItem("Class") == "Admin" ? (
              <DropdownMenuItem onClick={() => AssignTicket(ticket)}>
                Assign Ticket
              </DropdownMenuItem>
            ) : null} */}
            {/* <DropdownMenuItem onClick={() => viewticket(currentData.[findIndex(]rowIndex))}>View ticket </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const modelColums: ColumnDef<MachineModel>[] = [
  {
    accessorKey: "modelId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Options",
    cell: ({ row }) => {
      const machine = row.original;
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                localStorage.setItem(
                  "currentmachineID",
                  machine.machineId.toString(),
                );
                navigate(`/view-machine`);
              }}
            >
              View machine
            </DropdownMenuItem>
            {/* {localStorage.getItem("Class") == "ServiceEmployee" ||
            localStorage.getItem("Class") == "Admin" ? (
              <DropdownMenuItem onClick={() => AssignTicket(ticket)}>
                Assign Ticket
              </DropdownMenuItem>
            ) : null} */}
            {/* <DropdownMenuItem onClick={() => viewticket(currentData.[findIndex(]rowIndex))}>View ticket </DropdownMenuItem> */}
            {localStorage.getItem("Class") == "Admin" ? (
              <DropdownMenuItem onClick={() => ArchiveMachine(machine)}>
                Archive machine
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const accountColumns: ColumnDef<Account>[] = [
  {
    accessorKey: "accountId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone number
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Options",
    cell: ({ row }) => {
      const account = row.original;
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                localStorage.setItem(
                  "currentaccountID",
                  account.accountId.toString(),
                );
                navigate(`/view-account`);
              }}
            >
              View account
            </DropdownMenuItem>
            {/* {localStorage.getItem("Class") == "ServiceEmployee" ||
            localStorage.getItem("Class") == "Admin" ? (
              <DropdownMenuItem onClick={() => AssignTicket(ticket)}>
                Assign Ticket
              </DropdownMenuItem>
            ) : null} */}
            {/* <DropdownMenuItem onClick={() => viewticket(currentData.[findIndex(]rowIndex))}>View ticket </DropdownMenuItem> */}
            {localStorage.getItem("Class") == "Admin" ? (
              <DropdownMenuItem onClick={() => ArchiveAccount(account)}>
                Archive account
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const departmentColumns: ColumnDef<Department>[] = [
  {
    accessorKey: "departmentId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Options",
    cell: ({ row }) => {
      const department = row.original;
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            // onClick={() => {
            //   localStorage.setItem(
            //     "currentticketID",
            //     department.departmentId.toString(),
            //   );
            //   navigate(`/view-ticket`);
            // }}
            >
              View department
            </DropdownMenuItem>
            {/* {localStorage.getItem("Class") == "ServiceEmployee" ||
            localStorage.getItem("Class") == "Admin" ? (
              <DropdownMenuItem onClick={() => AssignTicket(ticket)}>
                Assign Ticket
              </DropdownMenuItem>
            ) : null} */}
            {/* <DropdownMenuItem onClick={() => viewticket(currentData.[findIndex(]rowIndex))}>View ticket </DropdownMenuItem> */}
            {localStorage.getItem("Class") == "Admin" ? (
              <DropdownMenuItem onClick={() => ArchiveDepartment(department)}>
                Archive department
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const solutionColumns: ColumnDef<Solution>[] = [
  {
    accessorKey: "solutionId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "problemDescription",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Problem Description
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "solutionDescription",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Solution Description
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  // {
  //   id: "ticketId",
  //   header: "Options",
  //   cell: ({ row }) => {
  //     const solution = row.original;
  //     const navigate = useNavigate();

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem
  //           // onClick={() => {
  //           //   localStorage.setItem(
  //           //     "currentticketID",
  //           //     machine.machineId.toString(),
  //           //   );
  //           //   navigate(`/view-ticket`);
  //           // }}
  //           >
  //             View machine
  //           </DropdownMenuItem>
  //           {/* {localStorage.getItem("Class") == "ServiceEmployee" ||
  //           localStorage.getItem("Class") == "Admin" ? (
  //             <DropdownMenuItem onClick={() => AssignTicket(ticket)}>
  //               Assign Ticket
  //             </DropdownMenuItem>
  //           ) : null} */}
  //           {/* <DropdownMenuItem onClick={() => viewticket(currentData.[findIndex(]rowIndex))}>View ticket </DropdownMenuItem> */}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
