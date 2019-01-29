import parties from '../dummyData/parties';
import sortItems from '../utilities/sortItems';

export class partyController {
  static handleCreateParty(request, response) {
    const newParty = {
      id: parties.length,
      name: request.body.name,
      acronym: request.body.acronym,
      hqAddress: request.body.hqAddress,
      logoUrl: request.file,
      email: request.body.email,
      phone: request.body.phone,
    };

    parties.push(newParty);
    return response.status(201)
      .json({
        status: 201,
        data: newParty,

      });
  }

  static getAllParties(request, response) {
    if (parties.length < 1 || parties === undefined) {
      response
        .json({
          status: 404,
          error: 'No registered party yet'
        });
    } else {
      const parties = parties.sort(sortItems('name'));
      return response
        .json({
          status: 200,
          data: parties,
        });
    }
  }

  static getOneParty(request, response) {
    const { partyId } = request.params;
    if (!Number(partyId) || !/^[0-9]+$/.test(partyId)) {
      return response
      .json({
        status: 400,
        error: 'Invalid partyId'
      })
    }
    const party = parties.find(party => party.id === Number(partyId));
    if (partyExist === undefined) {
      response.status(404)
        .json({
          status: 404,
          error: 'party does not exist',
        });
      return false;
    }

    return response.status(200)
      .json({
        status: 200,
        data: party
      });
  }

  static editParty(request, response) {
    const { partyId } = request.params;
    if (!Number(partyId) || !/^[0-9]+$/.test(partyId)) {
      return response
      .json({
        status: 400,
        error: 'Invalid partyId'
      })
    }
    const partyExist = parties.find(party => party.id === Number(partyId));
    const dupName = parties.find(party => party.name === name);

    if (partyExist === undefined) {
      response.status(404)
        .json({
          status: 404,
          error: 'Party does not exist',
        });
      return false;
    }
    if (dupName !== undefined) {
      response.status(409)
        .json({
          status: 409,
          error: 'Name already exist',
        });
      return false;
    }

    response.status(200)
      .json({
        status: 200,
        data: party
      });
  }

  static deleteParty(request, response) {
    const { partyId } = request.params;
    if (!Number(partyId) || !/^[0-9]+$/.test(partyId)) {
      return response
      .json({
        status: 400,
        error: 'Invalid partyId'
      })
    }
    const index = parties.findIndex(parties => parties.id === Number(partyId));
    if (index === -1) {
      parties.splice(index, 1);
      response.status(404)
        .json({
          success: false,
          message: 'party does not exist'
        });
    } else {
      response.status(200)
        .json({
          status: 200,
          data: index,
        });
    }
  }
}
