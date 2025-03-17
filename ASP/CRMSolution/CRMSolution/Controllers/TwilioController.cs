using CRMSolution.DTO.Requests.Twilio;
using CRMSolution.Services.Classes;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Twilio.TwiML;
using Twilio.TwiML.Voice;

namespace CRMSolution.Controllers;

[ApiController]
[Route("api/twilio")]
public class TwilioController : ControllerBase
{
    private readonly ITwilioService _twilioService;

    public TwilioController(ITwilioService twilioService)
    {
        _twilioService = twilioService;
    }

    [HttpPost("call")]
    public IActionResult MakeCall([FromBody] CallRequest request)
    {
        var callSid = _twilioService.MakeCall(request.To);
        return Ok(new { CallSid = callSid });
    }

    [HttpGet("recording/{callSid}")]
    public IActionResult GetRecordingUrl(string callSid)
    {
        var url = _twilioService.GetRecordingUrl(callSid);
        return Ok(new { RecordingUrl = url });
    }
    
    [HttpPost("call/save-recording")]
    public IActionResult SaveRecording([FromBody] SaveRecordRequest request)
    {
        _twilioService.SaveCallRecording(request.orderId, request.callSid);
        return Ok("url added");
    }
}