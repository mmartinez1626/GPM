using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GPM.Models
{
    public class Task
    {
        public int Id { get; set; }
        public int BoardId { get; set; }
        public int SubCategoryId { get; set; }
        public List<Task> Dependencies { get; set; }
        public string AssignedUser { get; set; }
        public List<Comment> Comments { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public string Description { get; set; }
        public int KanbanId { get; set; }
        public decimal SuggestedHours { get; set; }
    }
}
