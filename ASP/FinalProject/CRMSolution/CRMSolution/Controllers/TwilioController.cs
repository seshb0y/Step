using CRMSolution.DTO.Requests.Twilio;
using CRMSolution.Services.Classes;
using CRMSolution.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Twilio.TwiML;
using Twilio.TwiML.Voice;

namespace CRMSolution.Controllers;

[ApiController]
[Route("api/v1/twilio")]
public class TwilioController : ControllerBase
{
    private readonly ITwilioService _twilioService;

    public TwilioController(ITwilioService twilioService)
    {
        _twilioService = twilioService;
    }

    [HttpPost("calls")]
    public IActionResult MakeCall([FromBody] CallRequest request)
    {
        var callSid = _twilioService.MakeCall(request.To);
        return Ok(new { CallSid = callSid });
    }

    [HttpGet("recordings/{callSid}")]
    public IActionResult GetRecordingUrl(string callSid)
    {
        var url = _twilioService.GetRecordingUrl(callSid);
        return url != null ? Ok(new { MediaUrl = url }) : NotFound();
    }
    
    [HttpPost("recordings")]
    public IActionResult SaveRecording([FromBody] SaveRecordRequest request)
    {
        _twilioService.SaveCallRecording(request.orderId, request.callSid);
        return Ok("url added");
    }
}