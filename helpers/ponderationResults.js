const { response } = require("express")


const ponderationResults = ( compare ,req, res = response) => {

    const result = [];
    const votation = Object.values(compare.votation)

    const newVotation = votation.filter( vote => typeof vote === 'object')
                                
    const resultList = newVotation.map( votation => votation.map( e => {
        return parseFloat(e)
    })).filter( votation => {
        return !votation.some( e => isNaN(e) )
    })


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
    ponderationResults,

}