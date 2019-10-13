using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GPM.Models
{
    public class Kanban
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public List<Task> Tasks { get; set; }
    }
}
