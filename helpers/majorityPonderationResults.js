const { response } = require("express")


const majorityResults = ( compare ,req, res = response) => {

    const result = [];
    const votation = Object.values(compare.votation)
    const newVotation = votation.filter( vote => typeof vote === 'object')
                                
    const votationList = newVotation.filter( vote => {
        return !vote.some( element => typeof element === 'string')
    })

    const resultList = votationList.map( votation => votation.map( vote => {
        if( vote === true ) return 1
        if( vote === false ) return 0
    }))

   

    resultList.forEach(sub => {
        sub.forEach((num, index) => {
            if(result[index]){
                result[index] += num;
            }else{
                result[index] = num;
            }
        });
    });

    return result;
}


module.exports = {
    majorityResults,

}