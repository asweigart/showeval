showeval
========

A JavaScript module to show the steps in evaluating an expression.

This module requires jQuery.

Example
-------

    <script src="jquery-1.11.1.min.js"></script>
    <script src="showEval.js"></script>
    <button id="nextStep">Next Step</button>
    <button id="reset">Reset</button>
    <div id="showeval"></div>

    <script>

    $( "#nextStep").click(function() { s.evaluateStep(); });
    $( "#reset"   ).click(function() { s.reset(0); });

    $(document).ready(function() {
      // for each step, put the part to replaced in the first set of {{ }}, and the replacement text in the following {{ }}
      steps = ["''.join({{eggs}}{{['dogs', 'cats', 'moose']}}).upper().join(eggs)",
               "{{''.join(['dogs', 'cats', 'moose'])}}{{'dogscatsmoose'}}.upper().join(eggs)",
               "{{'dogscatsmoose'.upper()}}{{'DOGSCATSMOOSE'}}.join(eggs)",
               "'DOGSCATSMOOSE'.join({{eggs}}{{['dogs', 'cats', 'moose']}})",
               "{{'DOGSCATSMOOSE'.join(['dogs', 'cats', 'moose'])}}{{'dogsDOGSCATSMOOSEcatsDOGSCATSMOOSEmoose'}}"];
      s = new SHOWEVAL.ShowEval($('#showeval'), steps, false);
    });

    </script>
