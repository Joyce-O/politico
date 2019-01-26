import partyModel from '../jsObjects/partyModel';

class userControl {
  static newPartyHandler(request, response) {
    request.body = JSON.parse(JSON.stringify(request.body));
    const newParty = {
      id: partyModel.length,
      name: request.body.name,
      hqAddress: request.body.hqAddress,
      logoUrl: request.body.hasOwnProperty('logoUrl') ? request.body.logoUrl : request.file.originalname,
      email: request.body.email,
      phone: request.body.phone,
    };


    partyModel.push(newParty);
    return response.status(201)
      .json({
        message: 'Party created successfully',
        newParty
      });
  }
}

const { newPartyHandler } = userControl;
export default newPartyHandler;
