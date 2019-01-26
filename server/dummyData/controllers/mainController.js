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

  static allParties(request, response) {
    if (partyModel.length < 1 || partyModel === undefined) {
      response.status(404)
        .json({
          success: false,
          message: 'No registered party yet.'
        });
    } else {
      const sortArr = item => {
        let sortOrder = 1;

        if (item[0] === '-') {
          sortOrder = -1;
          item = item.substr(1);
        }
        return (a, b) => {
          if (sortOrder === -1) {
            return b[item].localeCompare(a[item]);
          }
          return a[item].localeCompare(b[item]);
        };
      };

      const parties = partyModel.sort(sortArr('name'));
      return response.status(201)
        .json({
          success: true,
          message: 'All parties',
          parties
        });
    }
  }
}

const { newPartyHandler, allParties } = userControl;
export { newPartyHandler, allParties };
