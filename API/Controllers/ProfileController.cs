using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfileController : ApiController.BaseApiController
{
    [HttpGet("{userId}")]
    public async Task<ActionResult<List<Photo>>> GetProfile([FromRoute] string userId)
    {
        return HandleResult(await Mediator.Send(new GetProfile.Query{ UserId = userId }));
    }
    
    [HttpPost("{userid}/photos/add")]
    public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
    {
        return HandleResult(await Mediator.Send(new AddPhoto.Command { File = file }));
    }

    [HttpGet("{userid}/photos")]
    public async Task<ActionResult<List<Photo>>> GetPhotos([FromRoute] string userid)
    {
        return HandleResult(await Mediator.Send(new GetProfilePhotos.Query{ UserId = userid }));
    }
    
    [HttpDelete("{userId}/photos/{photoId}/delete")]
    public async Task<ActionResult<Photo>> DeletePhoto([FromRoute] string photoId)
    {
        return HandleResult(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
    }
    
    [HttpPost("{userId}/photos/{photoId}/set-as-main")]
    public async Task<ActionResult<Photo>> SetMainPhoto([FromRoute] string photoId)
    {
        return HandleResult(await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId }));
    }
    
    [HttpDelete("{userId}/photos/clean-up")]
    public async Task<ActionResult<Photo>> CleanUpPhotos()
    {
        return HandleResult(await Mediator.Send(new CleanupGallery.Command{}));
    }
    
    [HttpPut("{userId}/edit")]
    public async Task<ActionResult<Photo>> EditProfile([FromRoute] string userId,  [FromBody] EditProfileDto profile)
    {
        return HandleResult(await Mediator.Send(new EditProfile.Command { EditProfileDto = profile }));
    }
}