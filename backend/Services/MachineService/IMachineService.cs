using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.MachineService
{
    public interface IMachineService
    {
        Task<ActionResult<IEnumerable<Machine>>> GetMachines();
        Task<ActionResult<Machine>> GetMachineById(int id);
        Task<ActionResult<IEnumerable<Machine>>> GetMachinePerAccountId(int id);
        Task<IActionResult> UpdateMachine(int id, Machine machine);
        Task<ActionResult<Machine>> AddMachine(Machine machine);
        Task<IActionResult> DeleteMachine(int id);
    }
}