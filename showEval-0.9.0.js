

var ShowEval = function(container, steps) {
  this.container = container;
  this.steps = steps;
  this.currentStep = 0;

  // create elements
  this.container.append($('<span>').addClass('pre showEval'));
  this.container.append($('<span>').addClass('eval showEval'));
  this.container.append($('<span>').addClass('post showEval'));
};

ShowEval.prototype.setStep = function(step) {
  this.currentStep = step;
  newWidth = this.getWidth(this.steps[this.currentStep][1]);
  this.container.children('.eval').width(newWidth);

  this.container.children('.pre').html(this.steps[step][0]);
  this.container.children('.eval').html(this.steps[step][1]);
  this.container.children('.post').html(this.steps[step][3]);
};

ShowEval.prototype.getWidth = function(text) { // TODO - class style must match or else width will be off.
  var newElem = $("<div>").addClass('showEval').hide().html(text);
  $('body').append(newElem);
  var newWidth = newElem.width() + 1; // +1 is a hack
  newElem.remove();

  return newWidth;
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

  newWidth = this.getWidth(this.steps[step][2]);
  var evalElem = this.container.children('.eval');

  var thisShowEval = this;

  evalElem.css('color', 'red');
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
};
