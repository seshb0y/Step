// using ApiGateway.DTO.Requests.Twilio;
// using CRMSolution.Grpc.Twilio;
// using Microsoft.AspNetCore.Mvc;
//
// namespace ApiGateway.Controllers;
//
// [ApiController]
// [Route("api/v1/twilio")]
// public class TwilioController : ControllerBase
// {
//
//     [HttpPost("calls")]
//     public IActionResult MakeCall([FromBody] HttpCallRequest request)
//     {
//         var grpcRequest = new MakeCallRequest
//         {
//             To = request.To
//         };
//         var grpcResponse = new MakeCallResponse();
//         return Ok(new { CallSid = grpcResponse });
//     }
//
//     [HttpGet("recordings/{callSid}")]
//     public IActionResult GetRecordingUrl(string callSid)
//     {
//         var url = _twilioService.GetRecordingUrl(callSid);
//         return url != null ? Ok(new { MediaUrl = url }) : NotFound();
//     }
//     
//     [HttpPost("recordings")]
//     public IActionResult SaveRecording([FromBody] SaveRecordRequest request)
//     {
//         _twilioService.SaveCallRecording(request.orderId, request.callSid);
//         return Ok("url added");
//     }
// }