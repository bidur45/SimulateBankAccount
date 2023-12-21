namespace Presentation.DTO
{
  
        public class Response<T> where T : class
        {
            public Response()
            {
            }
            public Response(string message, bool isSuccess)
            {
                IsSuccess = isSuccess;
                Data = null;
                TotalCount = 0;
                Message = message;
            }
            public Response(T data, bool isSuccess = true, string? message = null, int? totalCount = 0)
            {
                IsSuccess = isSuccess;
                Data = data;
                TotalCount = totalCount;
                Message = message;
            }

            public bool IsSuccess { get; set; } = false;
            public string? Message { get; set; } = null;
            public T? Data { get; set; } = null;
            public int? TotalCount { get; set; } = 0;

        }
}
