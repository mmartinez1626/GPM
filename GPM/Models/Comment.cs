using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GPM.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public string Note { get; set; }
        public DateTime DatePosted { get; set; }
        public string Attachment { get; set; }
    }
}
