

var ShowEval = function(container, steps) {
  this.container = container;
  this.container.addClass('showEval');
  this.steps = steps;
  this.currentStep = 0;
  this.createTrace = false; // TODO - reset doesn't work for traces

  // create elements
  this.currentStepDiv = $('<div>').addClass('currentStepDiv');
  this.container.append(this.currentStepDiv);
  this.currentStepDiv.append($('<span>').addClass('pre'));
  this.currentStepDiv.append($('<span>').addClass('eval'));
  this.currentStepDiv.append($('<span>').addClass('post'));
};

ShowEval.prototype.reset = function() {
  this.container.find('.previousStep').remove();
  this.setStep(0);
};

ShowEval.prototype.setStep = function(step) {
  this.currentStep = step;
  newWidth = this.getWidth(this.steps[this.currentStep][1]);
  this.currentStepDiv.children('.eval').width(newWidth);
  this.currentStepDiv.children('.pre').html(this.steps[step][0]);
  this.currentStepDiv.children('.eval').html(this.steps[step][1]);
  this.currentStepDiv.children('.post').html(this.steps[step][3]);
};

ShowEval.prototype.getWidth = function(text) { // TODO - class style must match or else width will be off.
  var newElem = $("<div>").addClass('showEval').hide().html(text);
  $('body').append(newElem);
  var newWidth = newElem.width() + 1; // +1 is a hack
  newElem.remove();

  return newWidth;
};

ShowEval.prototype.createPreviousStepDiv = function(step) {
  this.currentStepDiv.before($('<div>').addClass('previousStep').html(this.steps[step][0] + this.steps[step][1] + this.steps[step][3]));
};

ShowEval.prototype.evaluateStep = function(step) {
  if (step === undefined) {
    step = this.currentStep;
  }
  if (this.currentStep >= this.steps.length) {
    //this.currentStep = 0;
    //step = 0;
    return; // do nothing if on last step
  }
  this.setStep(step);

  var fadeInSpeed = 0;
  if (this.createTrace) {
    this.createPreviousStepDiv(step);
    this.currentStepDiv.hide();
    fadeInSpeed = 200;
  }

  newWidth = this.getWidth(this.steps[step][2]);
  var evalElem = this.currentStepDiv.children('.eval');

  var thisShowEval = this;

  evalElem.css('color', 'red');

  this.currentStepDiv.fadeTo(fadeInSpeed, 1, function() {
    window.setTimeout(function() {
      evalElem.fadeTo(400, 0, function() {
        //evalElem.css('overflow', 'hidden');
        evalElem.animate({width: newWidth, duration: 400}, function() {
          evalElem.html(thisShowEval.steps[step][2]);
          evalElem.fadeTo(400, 1, function() {
            window.setTimeout(function() {
              //evalElem.css('overflow', 'visible');
              evalElem.css('color', 'black');
              thisShowEval.currentStep += 1;
              if (thisShowEval.currentStep < thisShowEval.steps.length) {
                thisShowEval.setStep(thisShowEval.currentStep);
              }
            }, 600);
          });
        });
      });
    }, 600);
  });
};
