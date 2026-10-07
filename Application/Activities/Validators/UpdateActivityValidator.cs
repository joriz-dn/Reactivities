using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class UpdateActivityValidator : BaseActivityValidator<UpdateActivity.Command, UpdateActivityDto>
{
   public UpdateActivityValidator() : base(x => x.ActivityDto)
   {
      RuleFor(x => x.ActivityDto.Id)
         .NotEmpty().WithMessage("Id is required");
   }
}