const { response } = require("express")


const compareResult = ( compare ,req, res = response) => {

    const votation = Object.values(compare.votation)
    let sum1 = 0
    let sum2 = 0
    
    for( i=0; i < votation.length; i++ ){
      for( j=0; j< votation[0].length; j++){
          if( j === 0 ) sum1 = sum1 + parseInt(votation[i][j])
          if( j === 1 ) sum2 = sum2 + parseInt(votation[i][j])
        }
      }

    return [sum1, sum2]

}


module.exports = {
    compareResult,

}