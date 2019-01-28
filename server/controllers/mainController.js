import partyObj from '../dummyData/partyObj';
import officeObj from '../dummyData/officeObj';

class mainController {
  static handleCreateParty(request, response) {
    request.body = JSON.parse(JSON.stringify(request.body));
    const newParty = {
      id: partyObj.length,
      name: request.body.name,
      hqAddress: request.body.hqAddress,
      logoUrl: request.body.hasOwnProperty('logoUrl') ? request.body.logoUrl : request.file.originalname,
      email: request.body.email,
      phone: request.body.phone,
    };


    partyObj.push(newParty);
    return response.status(201)
      .json({
        message: 'Party created successfully',
        newParty
      });
  }

  static allParties(request, response) {
    if (partyObj.length < 1 || partyObj === undefined) {
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

      const parties = partyObj.sort(sortArr('name'));
      return response.status(200)
        .json({
          success: true,
          message: 'All parties',
          parties
        });
    }
  }

  static handleGetAParty(request, response) {
    const details = request.body;
    return response.status(200)
      .json({
        success: true,
        message: 'Party found',
        details
      });
  }

  static editParty(request, response) {
    const party = request.body;
    response.status(200)
      .json({
        success: true,
        message: 'name updated!',
        party
      });
  }

  static deleteParty(request, response) {
    const { partyId } = request.params;
    const index = partyObj.findIndex(parties => parties.id === Number(partyId));
    if (index !== -1) {
      partyObj.splice(index, 1);
      response.status(200)
        .json({
          success: true,
          message: 'party is deleted!',
        });
    } else {
      response.status(404)
        .json({
          success: false,
          message: 'party does not exist'
        });
    }
  }

  static handleCreateOffice(request, response) {
    const newOffice = {
      id: partyObj.length,
      name: request.body.name,
      type: request.body.type
    };


    partyObj.push(newOffice);
    return response.status(201)
      .json({
        message: 'office created successfully',
        newOffice
      });
  }

  static allOffices(request, response) {
    if (officeObj.length < 1 || officeObj === undefined) {
      response.status(404)
        .json({
          success: false,
          message: 'No registered office yet.'
        });
    } else {
      return response.status(200)
        .json({
          success: true,
          message: 'All offices',
          officeObj
        });
    }
  }

  static handleGetAnOffice(request, response) {
    const details = request.body;
    return response.status(200)
      .json({
        success: true,
        message: 'office found',
        details
      });
  }
}


export default mainController;
