import parties from '../dummyData/parties';
import sortItems from '../utilities.js/sortItems';

export default class PartyController {
  static createParty(request, response) {
    const { email, name, acronym } = request.body;
    const duplicate = {};
    const dupEmail = parties.find(party => party.email === email);
    const dupName = parties.find(party => party.name === name);
    const dupAcronym = parties.find(party => party.acronym === acronym);

    if (dupEmail !== undefined) {
      duplicate.dupEmail = 'Email already exist';
    }
    if (dupName !== undefined) {
      duplicate.dupName = 'Name already exist';
    }
    if (dupAcronym !== undefined) {
      duplicate.dupAcronym = 'Acronym; already exist';
    }
    if (JSON.stringify(duplicate) !== '{}') {
      response.status(409)
        .json({
          status: 409,
          error: duplicate,
        });
      return false;
    }
    const newParty = {
      id: parties.length,
      name: request.body.name,
      acronym: request.body.acronym,
      hqAddress: request.body.hqAddress,
      logoUrl: request.body,
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
          error: 'No registered party yet',
        });
    } else {
      const party = parties.sort(sortItems('name'));
      return response
        .json({
          status: 200,
          data: party,
        });
    }
  }

  static getOneParty(request, response) {
    const { partyId } = request.params;
    if (!/[0-9]+$/.test(partyId)) {
      return response
        .json({
          status: 400,
          error: 'Invalid partyId',
        });
    }
    const party = parties.find(obj => obj.id === Number(partyId));
    if (party === undefined) {
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
        data: party,
      });
  }

  static editParty(request, response) {
    const { partyId } = request.params;
    const { name } = request.body;
    if (!Number(partyId) || !/^[0-9]+$/.test(partyId)) {
      response.status(400)
        .json({
          status: 400,
          error: 'Invalid partyId',
        });
      return false;
    }
    const party = parties.find(obj => obj.id === Number(partyId));
    const dupName = parties.find(obj => obj.name === name);

    if (party === undefined) {
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
    party.name = name;
    return response.status(200)
      .json({
        status: 200,
        data: party,
      });
  }

  static deleteParty(request, response) {
    const { partyId } = request.params;
    if (!/[0-9]+$/.test(partyId)) {
      return response
        .json({
          status: 400,
          error: 'Invalid partyId',
        });
    }
    const index = parties.findIndex(obj => obj.id === Number(partyId));
    if (index === -1) {
      parties.splice(index, 1);
      response.status(404)
        .json({
          status: 404,
          error: 'party does not exist',
        });
    } else {
      response.status(200)
        .json({
          status: 200,
          data: parties,
        });
    }
  }
}
