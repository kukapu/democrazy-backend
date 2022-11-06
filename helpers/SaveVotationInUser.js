const User = require("../models/User")

const SaveVotationInUser  = async( idParticipant, idVotation ) => {
    const user = await User.findOne({ _id: idParticipant })
    if( user.votationParticipating.some( votation => votation === idVotation )) return 
    user.votationParticipating = [ ...user.votationParticipating, idVotation ]
    await user.save()
} 

module.exports = {
    SaveVotationInUser,

}