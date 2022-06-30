function parseProb(prob){
    /* Parse proba to add .0 when prob is 0 or 1 */
     var parse_prob = ""
     if (prob.length === 1){
       parse_prob = prob + ".0"
     }
     else{
       parse_prob = prob;
     }
     return parse_prob
   }