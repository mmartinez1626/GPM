using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GPM.Models
{
    public class Board
    {
        [Key]
        public int Id { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime StartDate { get; set; }
        public string Information { get; set; }
        public string Description { get; set; }
        public List<Task> Task { get; set; }
    }
}
